// DOM Queries
const chatList = document.querySelector('.chat-list');

// Class Instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'eihab');


// Get Chats & Render
chatroom.getChats(data => chatUI.render(data));