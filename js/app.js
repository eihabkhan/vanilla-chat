// DOM Queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

// Add New Chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => {
            newChatForm.reset()
        })
            .catch(err => console.log(err));
})

// Class Instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'eihab');


// Get Chats & Render
chatroom.getChats(data => chatUI.render(data));
