

class Chatroom {
    constructor(channel, username) {
        this.channel = channel;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message) {
        // Format Chat Object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            channel: this.channel,
            createdAt: firebase.firestore.Timestamp.fromDate(now)
        }

        // Save chat
        const res = await this.chats.add(chat);
        return res;
    }

    getChats(callback) {
    this.unsub = this.chats
                    .where(`channel`, `==` , this.channel)
                        .orderBy(`createdAt`)
                            .onSnapshot(snapshot => {
                            snapshot.docChanges().forEach(change => {
                                if(change.type === 'added') {
                                    // Update UI
                                    callback(change.doc.data());
                                }
                            })
                            });
    }

    updateName(newName) {
        this.username = newName
    }

    updateChannel(channel) {
        this.channel = channel;
        if(this.unsub) {
            this.unsub();
        }
    }
}


