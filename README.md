# WhatsappMe

## Description
WhatsappMe is a chatbot for WhatsApp that leverages your previous chat history to generate contextually accurate replies to messages.

## Installation
To get started with WhatsappMe, follow these steps:

1. [Fork](https://github.com/Keith-Web3/WhatsappMe/fork) the repository.
2. Clone the forked repository:
```bash
git clone https://github.com/<YOUR-USERNAME>/WhatsappMe.git
```
3. Install the required dependencies by running:
```bash
npm install
```

## Usage Guidelines

### Configuration

1. Create a `.env` file in the project directory using the provided `.env.example` file as a reference. This file is used to store your configuration.

2. Go to [OpenAI](https://openai.com/), create an account, and navigate to [API Keys](https://platform.openai.com/account/api-keys) to generate an API key. Copy the API key and paste it into the `.env` file.

3. Visit [Pinecone](https://app.pinecone.io/), sign up for an account, create a new project, and create an index with a dimension of **1536**. Copy the index name, environment name, and API key from your Pinecone project and add them to the `.env` file.

### Preparing Chat Data

4. Navigate to your whatsapp app, enter a chat and export the chat excluding media files. 

5. Create an `allchats.txt` file using the provided `allchats.txt.example` file as a guide.

6. Paste the exported chat data into the `allchats.txt` file. You can include data from multiple chats, but note that having more chat data will result in more OpenAI tokens being deducted per message.

### Running the Chatbot
8. Store your embedded data in your pinecone index by running:
```bash
node ingest.js
```
`Note: You only have to run the ingest command once`

9. Execute the chatbot by running:
```bash
node index.cjs
```

10. Scan the displayed QR code from your WhatsApp account to link WhatsappMe to your WhatsApp account.

That's it! You're ready to use WhatsappMe to generate contextually relevant replies in your WhatsApp chats.
