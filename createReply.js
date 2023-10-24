import { config } from 'dotenv'
config()

import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Pinecone } from '@pinecone-database/pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'

const pinecone = new Pinecone()

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX)

function formatChatText(text) {
  // Split the text into lines
  const lines = text.split('\n')

  // Regular expression to match different date and time formats
  const dateTimeRegex =
    /([0-9]+(\/[0-9]+)+), (0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]) [A-Za-z]+ - /i

  console.log(text.match(dateTimeRegex))
  // Remove date and time from each line
  const formattedLines = lines.map(line => line.replace(dateTimeRegex, ''))

  // Join the lines back together
  const formattedText = formattedLines.join('\n')

  return formattedText
}

const replyMessage = async function (message, context) {
  if (
    !process.env.PINECONE_API_KEY ||
    !process.env.PINECONE_ENVIRONMENT ||
    !process.env.PINECONE_INDEX
  ) {
    throw new Error(
      'PINECONE_ENVIRONMENT and PINECONE_API_KEY and PINECONE_INDEX must be set'
    )
  }

  const embeddings = new OpenAIEmbeddings()
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  })
  const similaritySearch = await vectorStore.similaritySearch(context, 1)

  const model = new OpenAI({ temperature: 0 })
  const template =
    'Create an ideal reply to "{message}" contextually relevant to this "{context}" while taking into account that a similar discussion has occurred as follows: "{chat_context}". Your response should not include any private information. If the provided chat_context doesn"t contain enough information to reply the message, generate a natural and contextually relevant response to the initial context.'

  const promptTemplate = PromptTemplate.fromTemplate(template)
  const chain = promptTemplate.pipe(model)
  const result = await chain.invoke({
    message,
    context,
    chat_context: formatChatText(similaritySearch[0]?.pageContent),
  })

  console.log(result)
  return result.trim()
}

export { replyMessage }
