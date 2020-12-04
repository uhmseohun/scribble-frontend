import styled from 'styled-components';

const Player = ({ user, rank }) => (
  <PlayerContainer>
    <Avatar />
    <InfoWrapper>
      <Name>{user.name}</Name>
      <Score>{user.score}점, {rank}등</Score>
    </InfoWrapper>
  </PlayerContainer>
);

export default Player;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  background-color: #FFFFFF;
  padding: 8px;
  border-radius: 10px;
`;

const InfoWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 1rem;
`;

const Score = styled.span`
  font-size: 0.9rem;
  color: #A1A8B3;
`;

const Avatar = styled.img.attrs({
  src: require('../assets/avatar.png').default
})`
  width: 40px;
  height: 40px;
  margin-bottom: 3px;
`;
