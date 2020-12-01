import styled from 'styled-components';

const Player = (props) => (
  <PlayerContainer>
    <Avatar />
    <Name>{props.player.name}</Name>
  </PlayerContainer>
);

export default Player;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const Name = styled.span``;

const Avatar = styled.img.attrs({
  src: require('../assets/avatar.png').default
})`
  width: 50px;
  height: 50px;
  margin-bottom: 3px;
`;
