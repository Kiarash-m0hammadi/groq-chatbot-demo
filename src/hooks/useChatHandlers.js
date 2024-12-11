import { groqClient } from "../config/groq-config";

export const useChatHandlers = (state, setState) => {
  const handleInputChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      inputValue: event.target.value,
    }));
  };

  const handleSend = async () => {
    if (state.inputValue.trim() === "") return;

    const chatPrompt = `You: ${state.inputValue}`;

    try {
      const chatCompletion = await groqClient.chat.completions.create({
        messages: [
          {
            role: "user",
            content: state.inputValue,
          },
        ],
        model: "llama3-8b-8192",
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || "No response";

      const newChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
      };

      setState((prevState) => ({
        ...prevState,
        chatMessages: [...prevState.chatMessages, newChatMessage],
        inputValue: "",
      }));
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      const errorMessage = "Error fetching chat completion";
      const newChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };
      setState((prevState) => ({
        ...prevState,
        chatMessages: [...prevState.chatMessages, newChatMessage],
        inputValue: "",
      }));
    }
  };

  return { handleInputChange, handleSend };
};
