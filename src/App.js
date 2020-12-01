import Root from './routes';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import GlobalStyle from './components/GlobalStyle';

const App = () => (
  <RootContainer>
    <GlobalStyle />
    <NavBar />
    <Root />
  </RootContainer>
);

export default App;

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
