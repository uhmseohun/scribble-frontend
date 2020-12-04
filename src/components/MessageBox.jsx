import styled from 'styled-components';

const MessageBox = ({ message: { message, sender } }) => (
  <MessageBoxWrapper>
    <Text>{sender}: {message}</Text>
  </MessageBoxWrapper>
);

export default MessageBox;

const MessageBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 7px;
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 10px;
`;

const Text = styled.span`
  font-size: 1rem;
`;
