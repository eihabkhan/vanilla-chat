// DOM Queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-message');
const rooms = document.querySelector('.chat-rooms');

// Add New Chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
            .catch(err => console.log(err));
});

// Update Username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    
    newNameForm.reset();

    // Notify user of name update
    updateMessage.innerText = `Your name was updated to "${newName}"`;
    setTimeout(() => updateMessage.innerText = '', 2000);
});

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear(); 
        chatroom.updateChannel(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }        
});

// Check localStorage for username
const username = localStorage.username ? localStorage.username : "Guest"

// Class Instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);


// Get Chats & Render
chatroom.getChats(data => chatUI.render(data));
