
import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { faker, simpleFaker } from "@faker-js/faker"
export const createSingleChats = async () => {
    try {
        const users = await User.find().select("_id");
        const chatsPromise = [];
        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                chatsPromise.push(
                    Chat.create({
                        name: faker.lorem.words(2),
                        members: [users[i]._id, users[j]._id]
                    })
                );
            }
        }
        await Promise.all(chatsPromise);
        console.log("Chats created");
        process.exit(0);  // Use 0 to indicate success
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
export const createGroupChats = async (numChats) => {
    try {
        const users = await User.find().select("_id");
        const chatsPromise = [];
        for (let i = 0; i < numChats; i++) {
            const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
            const members = [];
            for (let i = 0; i < numMembers; i++) {
                const randomIndex = Math.floor(Math.random() * users.length);
                const randomUser = users[randomIndex];
                //Ensure the same user is not added twice
                if (!members.includes(randomUser)) {
                    members.push(randomUser);
                }
            }
            const chat = Chat.create({
                gropChat: true,
                name: faker.lorem.words(1),
                members,
                creator: members[0],
            });


            await Promise.all(chatsPromise);
        }
        console.log("Group Chats created")
        process.exit(1);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


export const createMessages = async (numMessages) => {
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");

        const messagesPromise = [];
        for (let i = 0; i < numMessages; i++) {

            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomChat = chats[Math.floor(Math.random() * chats.length)];
            //Ensure the same user is not added twice
            messagesPromise.push(
                Message.create({
                    chat: randomChat,
                    sender: randomUser,
                    content:faker.lorem.sentence(),

                })
            );
        }
       

        await Promise.all(messagesPromise);

        console.log("Messages created")
        process.exit(1);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};


export const createMessagesInAChat = async (chatId, numMessages) => {
    try {
        const users = await User.find().select("_id");

        const messagesPromise = [];
        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            messagesPromise.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser._id,
                    content: faker.lorem.sentence(),
                })
            );
        }

        await Promise.all(messagesPromise);

        console.log("Messages created");
        process.exit(0);  // Use 0 to indicate success
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}