import styled from 'styled-components';
import DrawingCanvas from '../components/DrawingCanvas';
import SocketCanvas from '../components/SocketCanvas';
import Player from '../components/Player';
import TextField from '../components/TextField';
import Button from '../components/Button';
import MessageBox from '../components/MessageBox';
import { useState, useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { websocketContext } from '../websocket';

const Game = () => {
  const users = useSelector(state => (
    state.context.users.sort((a, b) => b.score - a.score)
  ));
  const messages = useSelector(state => state.messages);
  const [userMessage, setUserMessage] = useState(null);

  const drawer = useSelector(state => state.context.drawer)
  const user = useSelector(state => state.userInfo.key);
  const [drawable, setDrawable] = useState(false);

  const ws = useContext(websocketContext);

  const messageField = useRef();
  const messageList = useRef();

  useEffect(() => {
    messageField.current.value = userMessage;
  }, [userMessage]);

  useEffect(() => {
    setDrawable(!!(drawer && user && drawer === user));
  }, [drawer, user]);

  useEffect(() => {
    const elem = messageList.current;
    elem.scrollTo(0, elem.offsetHeight);
  }, [messages]);

  return (
    <PageContainer>
      <SideBar>
        <SideBarItem>
          <SideBarItemHeader>랭킹</SideBarItemHeader>
          <PlayerList>
            {
              users.map((user, index) =>(
                <Player user={user} rank={index + 1}/>
              ))
            }
          </PlayerList>
        </SideBarItem>
        <SideBarItem>
          <SideBarItemHeader>채팅</SideBarItemHeader>
          <MessageList ref={messageList}>
            {
              messages.map((message) => (
                <MessageBox message={message} />
              ))
            }
          </MessageList>
          <InputForm>
            <RightMarginTextField
              placeholder='메시지나 정답을 입력하세요.'
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              ref={messageField}
            />
            <Button
              onClick={() => {
                ws.sendMessage(userMessage);
                setUserMessage(null);
              }}
            >
              보내기
            </Button>
          </InputForm>
        </SideBarItem>
      </SideBar>
      <CanvasWrapper>
        {
          drawable ? (
            <DrawingCanvas />
          ) : (
            <SocketCanvas />
          )
        }
      </CanvasWrapper>
    </PageContainer>
  );
};

export default Game;

const PageContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 10px 50px;
`;

const CanvasWrapper = styled.div``;

const SideBarItemHeader = styled.span`
  font-size: 1.2rem;
  display: block;
  margin-bottom: 15px;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 700px;
  width: 350px;
`;

const SideBarItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #EBEEF4;
  border-radius: 10px;
  background-color: #F8FAFC;
  padding: 20px;
  height: 340px;
`;

const PlayerList = styled.div`
  overflow: scroll;
`;

const MessageList = styled.div`
  overflow: scroll;
  margin-bottom: 5px;
  scroll-behavior: smooth;
`;

const InputForm = styled.div`
  margin-top: auto;
  display: flex;
`;

const RightMarginTextField = styled(TextField)`
  flex: 1;
  margin-right: 7px;
`;
