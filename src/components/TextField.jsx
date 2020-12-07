import styled from 'styled-components';

const TextField = styled.input`
  outline: none;
  position: relative;
  font-size: 1rem;
  padding: 0 1rem;
  height: 2.5rem;
  border-radius: 10px;
  border: 1px solid #ECEEF3;
  color: #2F3747;

  &::placeholder {
    color: #C1C8D3;
  }
`;

export default TextField;
