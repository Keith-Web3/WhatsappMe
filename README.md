# WhatsappMe

## Description
WhatsappMe is a chatbot for WhatsApp that leverages your previous chat history to generate contextually accurate replies to messages.

## Installation
To get started with WhatsappMe, follow these steps:

1. Clone this repository:
```bash
git clone https://github.com/Keith-Web3/WhatsappMe.git
```

2. Install the required dependencies by running:
```bash
npm install
```

## Usage Guidelines

### Configuration

1. Create a `.env` file in the project directory using the provided `.env.example` file as a reference. This file is used to store your configuration.

2. Go to [OpenAI](https://openai.com/), create an account, and navigate to [API Keys](https://platform.openai.com/account/api-keys) to generate an API key. Copy the API key and paste it into the `.env` file.

3. Visit [Pinecone](https://app.pinecone.io/), sign up for an account, create a new project, and create an index with a dimension of **1536**. Copy the index name, environment name, and API key from your Pinecone project and add them to the `.env` file.

### Preparing Chat Data

4. Export your WhatsApp chat data. 

5. Create an `allchats.txt` file using the provided `allchats.txt.example` file as a guide.

6. Paste the exported chat data into the `allchats.txt` file. You can include data from multiple chats, but note that having more chat data will result in more OpenAI tokens being deducted per message.

### Running the Chatbot

8. Execute the chatbot by running:
```bash
node index.cjs
```

9. Scan the QR code from your WhatsApp account using the displayed QR code scanner to link WhatsappMe to your WhatsApp account.

That's it! You're ready to use WhatsappMe to generate contextually relevant replies in your WhatsApp chats.
