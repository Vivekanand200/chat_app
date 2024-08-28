import { useInfiniteScrollTop } from '6pp';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../Socket';
import FileMenu from '../components/dialogs/FileMenu';
import AppLaout from '../components/layout/AppLaout';
import { TypingLoader } from '../components/layout/Loaders.jsx';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponent';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constant/events.js';
import { useErrors, useSocketEvents } from '../hooks/hook.jsx';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { removeNewMessagesAlert } from '../redux/reducers/chat.js';
import { setIsFileMenu } from '../redux/reducers/misc.js';


const Chat = ({ chatId, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = getSocket();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const oldMessageChunk = useGetMessagesQuery({ chatId, page })

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessageChunk.data?.totalPages,
    page,
    setPage,
    oldMessageChunk.data?.message
  )

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessageChunk.isError, error: oldMessageChunk.error }

  ];

  const members = chatDetails?.data?.chat?.members;

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000])
  }

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);

  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    //Emitting event to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");

  };
  useEffect(() => {

    socket.emit(CHAT_JOINED,{userId:user._id,members} )
    dispatch(removeNewMessagesAlert(chatId))

    return () => {
      setMessage("");
      setMessages([]);
      setOldMessages([]);
      setPage(1)
      socket.emit(CHAT_LEAVED,{userId:user._id,members})

    }
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!chatDetails.data?.chat) return navigate("/");
  }, [chatDetails.data])

  //Listen from the server
  const newMessageListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    }, [chatId]);

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("Start typing", data);
      setUserTyping(true);
    }, [chatId]);

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("Stop typing", data);
      setUserTyping(false);
    }, [chatId]);

  const alertListener = useCallback(
    (data) => {
      if(data.chatId !== chatId) return;
      const messageForAlert = {
        conten: data.message,

        sender: {
          _id: "qskjdhvsjdhvalwyrvsdjfq3uy",
          name: "Admin",
        },
        chat: chatId,

        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, messageForAlert]);
    }, [chatId]);

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessageListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
  useSocketEvents(socket, eventHandler)

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (<Skeleton />) : (<>
    <Stack
      ref={containerRef}
      boxSizing={"border-box"}
      padding={"1rem"}
      spacing={"1rem"}

      height={"90%"}
      sx={{
        bgcolor: "rgba(247,247,247,1)",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >

      {
        allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))
      }

      {userTyping && <TypingLoader />}

      <div ref={bottomRef} />

    </Stack>
    <form style={{
      height: "10%",
    }} onSubmit={submitHandler}>
      <Stack
        direction={"row"}
        height={"100%"}
        padding={"1rem"}
        alignItems={"center"}
        position={"relative"}
      >

        <IconButton
          sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "30deg"
          }}
          onClick={handleFileOpen}
        >
          <AttachFileIcon />
        </IconButton>
        <InputBox sx={{
          bgcolor: "bisque",
          
        }} placeholder='Type Message Here...' value={message} onChange={messageChangeHandler} />
        <IconButton
          type='submit'
          sx={{
            bgcolor: "orange",
            color: "white",
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover": {
              bgcolor: "error.dark",
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </Stack>
    </form>
    <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
  </>)
}

export default AppLaout()(Chat);