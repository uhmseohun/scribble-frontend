import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Player from '../components/Player';
import Button from '../components/Button';
import TextField from '../components/TextField';
import ws from '../ws';

const JoinGame = () => {
  const [userName, setUserName] = useState(null);
  const history = useHistory();

  const handleUserJoin = () => {
    if (!userName.length) return alert('사용자 이름을 입력해 주세요.');
    ws._send({
      type: 'event',
      event: 'userJoin',
      payload: { userName },
    });
    history.push('/game');
  };

  return (
    <PageContainer>
      <SideBox>
        <SideBoxHeader>참가 중인 플레이어</SideBoxHeader>
        <PlayerListWrapper>
          <Player player={{ name: 'asdf' }} />
        </PlayerListWrapper>
      </SideBox>

      <SideBox>
        <SideBoxHeader>참가하기</SideBoxHeader>
        <InputFormContainer>
          <RightMarginTextField
            placeholder='사용자 이름을 입력하세요.'
            style={{ flex: 1, marginRight: '7px' }}
            onInput={(e) => setUserName(e.target.value)}
          />
          <Button onClick={handleUserJoin}>참가하기</Button>
        </InputFormContainer>
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
  padding: 20px;
  width: 400px;
  height: 400px;
  margin: 30px;
`;

const PlayerListWrapper = styled.span`
  margin-top: 5px;
  display: flex;
`;

const SideBoxHeader = styled.span`
  font-size: 1.2rem;
  display: block;
`;

const InputFormContainer = styled.div`
  margin-top: auto;
  display: flex;
`;

const RightMarginTextField = styled(TextField)`
  flex: 1;
  margin-right: 7px;
`;
