import { config } from 'dotenv'
config()

import { TextLoader } from 'langchain/document_loaders/fs/text'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
// import { HuggingFaceTransformersEmbeddings } from 'langchain/embeddings/hf_transformers'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { Pinecone } from '@pinecone-database/pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

// const model = new HuggingFaceTransformersEmbeddings({
//   modelName: 'Xenova/all-MiniLM-L6-v2',
// })
const model = new OpenAIEmbeddings()

const pinecone = new Pinecone()

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX)

const loader = new TextLoader('allchats.txt')

const docs = await loader.load()

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 350,
})

const splittedDocs = await splitter.splitDocuments(docs)

await PineconeStore.fromDocuments(splittedDocs, model, {
  pineconeIndex,
  maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
})
