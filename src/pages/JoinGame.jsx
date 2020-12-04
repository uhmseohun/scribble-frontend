import styled from 'styled-components';
import Player from '../components/Player';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName as setReduxUserName } from '../store/actions';
import { websocketContext } from '../websocket';

const JoinGame = () => {
  const [userName, setUserName] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector(state => (
    state.context.users.sort((a, b) => a.rank - b.rank)
  ));
  const ws = useContext(websocketContext);

  const handleUserJoin = () => {
    if (!userName.length) return alert('사용자 이름을 입력해 주세요.');
    ws.emitEvent('userJoin', { userName });
    dispatch(setReduxUserName(userName));
    history.push('/game');
  };

  return (
    <PageContainer>
      <SideBox>
        <SideBoxHeader>접속 중인 플레이어</SideBoxHeader>
        <PlayerList>
          {
            users.map((user, index) => (
              <Player
                user={user}
                rank={index + 1}
              />
            ))
          }
        </PlayerList>
      </SideBox>

      <SideBox>
        <SideBoxHeader>참가하기</SideBoxHeader>
        <InputForm>
          <RightMarginTextField
            placeholder='사용자 이름을 입력하세요.'
            onInput={(e) => setUserName(e.target.value)}
          />
          <Button onClick={handleUserJoin}>참가하기</Button>
        </InputForm>
      </SideBox>
    </PageContainer>
  );
};

export default JoinGame;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SideBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #EBEEF4;
  border-radius: 10px;
  background-color: #F8FAFC;
  padding: 20px;
  width: 400px;
  height: 400px;
  margin: 30px;
`;

const PlayerList = styled.div`
  margin-top: 15px;
  overflow: scroll;
`;

const SideBoxHeader = styled.span`
  font-size: 1.2rem;
  display: block;
`;

const InputForm = styled.div`
  margin-top: auto;
  display: flex;
`;

const RightMarginTextField = styled(TextField)`
  flex: 1;
  margin-right: 7px;
`;
