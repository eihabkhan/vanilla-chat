

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }

    async addChat(message) {
        // Format Chat Object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            createdAt: firebase.firestore.Timestamp.fromDate(now)
        }

        // Save chat
        const res = await this.chats.add(chat);
        return res;
    }

    getChats(callback) {
        this.chats
            .onSnapshot(snapshot => {
               snapshot.docChanges().forEach(change => {
                   if(change.type === 'added') {
                    // Update UI
                    callback(change.doc.data());
                   }
               })
            });
    }
}

const chatroom = new Chatroom('gaming', 'eihab');
console.log(chatroom);
chatroom.addChat("wqeweqwewq!!")
    .then(() => console.log("Chat Added"))
        .catch(err => console.log(err));

chatroom.getChats((data) => {
    console.log(data)
});