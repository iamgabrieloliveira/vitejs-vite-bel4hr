import React, { ReactElement, useEffect } from 'react';
import { useState, useRef } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import { Header } from "../components/Header";
import { Message } from "../components/Message";
import { io } from 'socket.io-client';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const Main = styled.div`
    display: flex;
`

const LeftContainer = styled.div`
  left: 0;
  width: 20%;
  height: calc(100vh - 130px);
  background: #2f2d2d;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 25px 0;
`
const SendForm = styled.div`
  position: fixed;
  bottom: 9px;
  display: flex;
  align-items: center;
`
const SendInput = styled.input`
  background: gray;

  margin-left: 800px;
  width: 400px;
  height: 50px;
  background: white;
  border: none;
  border-radius: 10px 0px 0px 10px;
  color: black;
  font-size: 20px;
  padding-left: 8px;
  &:focus{
    outline: 0;
    border: 0;
  }
`
const SendButton = styled.button`
  width: 80px;
  height: 51px;
  background: blue;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 19px;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  &:focus{
    outline: 0;
    border: 0;
  }
`

const Chat = styled.div`
  background: #212020;
  width: 80%;
  padding: 60px;
`
const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
type message = {
    user: {
        userName: string,
        userId: string,
    },
    content: string,
    time: Date,
}

export function Home(): ReactElement {
    let sendMessageInput = useRef();

    const [socket, setSocket] = useState();
    const [Messages, setMessages] = useState([]);
    const [NewMessage, setNewMessage] = useState('');
    const [user, setUser] = useState({})

    function sendMessage(): void {
        if (!socket) return;

        let today = new Date();
        let minutes  = today.getMinutes().toString().length === 1 ? "0" + today.getMinutes().toString() : today.getMinutes().toString()
     
        let time = today.getHours() + ":" + minutes

        const message = {
            content: NewMessage,
            user,
            time,
        }
        socket.emit("message", message);
        setMessages(prevState => [...prevState, message])
        sendMessageInput.current.value = "";
    }

    useEffect(() => {
        setSocket(io("http://127.0.0.1:3000"))
    }, []);

    useEffect(() => {
        if (!socket) return;
        console.log(socket)
        socket.on("message", (message) => {
            setMessages(prevState => [...prevState, message])
        });
    }, [socket]);

    return (
        <>
            <GlobalStyle />
            <Header user={user} />
            <Main>
                <LeftContainer>
                </LeftContainer>
                <Chat>
                    <MessageWrapper>
                        {Messages.map((message: message) => {
                            return <Message content={message.content} sendUser={message.user} currentUser={user} time={message.time} />
                        })}
                    </MessageWrapper>
                    <SendForm>
                        <SendInput ref={sendMessageInput} placeholder="Write your message..." onChange={(event) => setNewMessage(event.target.value)} />
                        <SendButton onClick={sendMessage}>
                            Send
                        </SendButton>
                    </SendForm>
                </Chat>
            </Main>
        </>
    )
}