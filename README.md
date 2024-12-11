# Groq Chatbot Demo

## Setup Instructions

1. **Create a Groq Account and API Key:**

   - Head over to the [Groq Console](https://console.groq.com/)
   - Sign up for an account
   - Visit the [API Keys section](https://console.groq.com/keys) to create your key
   - Review the [Quick Start Guide](https://console.groq.com/docs/quickstart) if needed

2. **Clone the repository:**
   ```sh
   git clone <repository_url>
   ```
3. **Navigate to the project directory:**
   ```sh
   cd groq-chatbot-demo
   ```
4. **Install dependencies:**
   ```sh
   npm install
   ```
5. **Set up environment variables:**
   - Create a [`.env`](.env) file in the root directory.
   - Add your Groq API key:
     ```
     VITE_GROQ_API_KEY="your_groq_api_key_here"
     ```
6. **Run the development server:**
   ```sh
   npm run dev
   ```

## Using the Groq API Key

The Groq API key is required to authenticate requests to the Groq service. Follow these steps to configure the API key:

1. **Locate the [`.env`](.env) file:**

   - The `.env` file should be in the root directory of the project.

2. **Add your Groq API key:**

   - Open the `.env` file and add the following line:
     ```
     VITE_GROQ_API_KEY="your_groq_api_key_here"
     ```
   - Replace `"your_groq_api_key_here"` with your actual Groq API key.

3. **Accessing the API key in the application:**
   - The API key is accessed in the application via [`import.meta.env.VITE_GROQ_API_KEY`](src/config/groq-config.js).

**Note:** Ensure that the `.env` file is listed in [`.gitignore`](.gitignore) to prevent accidental commits of sensitive information.
