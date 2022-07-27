import React, {ReactElement} from 'react';

import styled from "styled-components";

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
`
const Container = styled.div`
    width: 200px;
    height: 70px;
    background: white;
    padding: 14px 24px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const MessageContent = styled.p`
  color: black;
`
const MessageFooter = styled.p`
    color: black;
`
const MessageHeader = styled.p`
    color: black;
`

type messageProps = {
    sendUser: {
        userName: string
    },
    currentUser: {
        userName: string
    },
    content: string,
    time: string,
}

export function Message(props:messageProps): ReactElement {

   let position =  props.currentUser.userName === props.sendUser.userName ? "end" : "start";

    return(
        <MessageWrapper style={{justifyContent: position}}>
            <Container>
                <MessageHeader>
                    {props.sendUser.userName}
                </MessageHeader>
                <MessageContent>
                    {props.content}
                </MessageContent>
                <MessageFooter>
                    {props.time}
                </MessageFooter>
            </Container>
        </MessageWrapper>
    )
}

