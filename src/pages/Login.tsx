import react, { ReactElement, useEffect, useState, useRef } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import io from 'socket.io-client';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

const Container = styled.form`
    background: black;
    width: 100%;
    height: 100vh;
`
const Title = styled.h1`
    text-align: center;
    color: black;
`

const FormContainer = styled.div`
    width: 400px;
    height: 300px;
    background: white;

    border-radius: 5px;

    padding: 14px 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const Input = styled.input`
    width: 80%;
    height: 40px;

    font-size: 17px;

    border: 1px solid black;
    border-radius: 5px;

    padding-left: 6px;
    &:focus {
        outline: 0;
    }
`
const Button = styled.button`
    width: 80%;
    height: 40px;

    font-size: 17px;
    background: white;

    border: 1px solid black;
    border-radius: 5px;

    transition: .6s;

    cursor: pointer;

    &:hover {
        opacity: .7;
        transform: translateY(5px);
    }
`

export default function Login() {
    let userNameInput = useRef();

    const [userName, setUserName] = useState('');
    const [socket, setSocket] = useState();

    function login()
    {
        const newUser = { 
            userName,
            userId: socket.id
        }
        socket.emit("login", newUser);
        userNameInput.current.value = "";
    }

    useEffect(() => {
        setSocket(io("http://127.0.0.1:3000"))
    }, []);

    return (
        <Container action='/home'>
            <GlobalStyle />
            <FormContainer>
            <Title>Enter in the JetChat</Title>
            <label>Chose your username</label>
            <Input ref={userNameInput} placeholder='Username' onChange={(event) => setUserName(event.target.value)}/>
            <Button onClick={login}>
                Enter
            </Button>
            </FormContainer>
        </Container>
    )
}