document.getElementById('chat-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userInput = document.getElementById('user-input').value;
    appendMessage(userInput, 'user-message');

    console.log('User Input:', userInput);

    const botResponse = getBotResponse(userInput);
    if (botResponse) {
        appendMessage(botResponse, 'bot-message');
    } else {
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            });
            const data = await response.json();
            console.log('API Response:', data);
            appendMessage(data.response, 'bot-message');
        } catch (error) {
            console.error('Error:', error);
            appendMessage('Error communicating with server.', 'bot-message');
        }
    }

    document.getElementById('user-input').value = '';
});

function appendMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message ' + className;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userInput) {
    const responses = {
        'hi': 'Hello! How can I help you today?',
        'hello': 'Hi there! What can I do for you?',
        'how are you?': 'I am an AI chatbot, I am always fine!',
        'what is your name?': 'I am your friendly AI chatbot!',
        'bye': 'Goodbye! Have a great day!'
    };

    return responses[userInput.toLowerCase()] || null;
}
