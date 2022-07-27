import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #212020;
  height: 50px;
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #230505;
`
const Button = styled.button`
    background: white;
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 5px;
    color: black;
    cursor: pointer;
    transition: .6s;
    &:hover {
    background: black;
    color: white;
      transform: translateY(5px);
    }  
`
const Title = styled.h1`
    color: white;
`
const SearchInput = styled.input`
  background: white;
  width: 200px;
  margin-top: 10px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: black;
  cursor: pointer;
  transition: .6s;
  padding-left: 8px;
  &:hover {
    transform: translateY(5px);
  }
  &:focus{
    outline: 0;
    border: 0;
  }
`
type headerProps = {
  user: {
    userName: string
  }
}

export function Header(props: headerProps): ReactElement {
  return (
    <Container>
      <Title>Jet Chat</Title>
      <Title>Hello, {props.user.userName}</Title>
      <SearchInput placeholder="Search" />
      <Button>Create room</Button>
    </Container>
  )
}