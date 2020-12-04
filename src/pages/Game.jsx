import styled from 'styled-components';
import Canvas from '../components/Canvas';
import Player from '../components/Player';
import TextField from '../components/TextField';
import Button from '../components/Button';
import MessageBox from '../components/MessageBox';
import { useState, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { websocketContext } from '../websocket';

const Game = () => {
  const users = useSelector(state => (
    state.context.users.sort((a, b) => a.rank - b.rank)
  ));
  const messages = useSelector(state => state.messages);
  const [userMessage, setUserMessage] = useState(null);
  const messageField = useRef();
  const ws = useContext(websocketContext);

  const sendUserMessage = () => {
    ws.sendMessage(userMessage);
    messageField.current.value = null;
  };

  return (
    <PageContainer>
      <SideBar>
        <SideBarItem>
          <SideBarItemHeader>랭킹</SideBarItemHeader>
          <PlayerList>
            {
              users
                .sort((a, b) => a.rank - b.rank)
                .map((user, index) => (
                  <Player
                    user={user}
                    rank={index + 1}
                  />
                ))
            }
          </PlayerList>
        </SideBarItem>
        <SideBarItem>
          <SideBarItemHeader>채팅</SideBarItemHeader>
          <MessageList>
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
              onInput={(e) => setUserMessage(e.target.value)}
              ref={messageField}
            />
            <Button onClick={sendUserMessage}>보내기</Button>
          </InputForm>
        </SideBarItem>
      </SideBar>
      <CanvasWrapper>
        <Canvas width={700} height={700} />
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
`;

const InputForm = styled.div`
  margin-top: auto;
  display: flex;
`;

const RightMarginTextField = styled(TextField)`
  flex: 1;
  margin-right: 7px;
`;
