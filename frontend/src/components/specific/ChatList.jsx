import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{
        chatId: "",
        count: 0,
    }],
    handleDeleteChat,
}) => {
   
    return (
        <Stack width={w} direction={"column"} overflow={"auto"} height={"100%"}>
            {
                chats.map((data, index) => {
                    const { avatar, name, _id, groupChat, members } = data;
                    const newMessageAlerts = newMessagesAlert.find(({ chatId }) => chatId === _id);
                    let isOnline = false;

                    if (Array.isArray(members)) {
                        isOnline = members.some(member => onlineUsers.includes(member._id || member));
                    } else if (typeof members === 'object' && members !== null) {
                        isOnline = onlineUsers.includes(members._id || members);
                    }



                    return (
                        <ChatItem 
                            key={_id}
                            index={index}
                            newMessageAlert={newMessageAlerts}
                            isOnline={isOnline}
                            avatar={avatar}
                            name={name}
                            _id={_id}
                            groupChat={groupChat}
                            sameSender={chatId === _id}
                            handleDeleteChat={handleDeleteChat}
                        />
                    );
                })
            }
        </Stack>
    );
}

export default ChatList;
