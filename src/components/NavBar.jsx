import styled from 'styled-components';

const Navbar = () => (
  <NavBarContainer>
    <Brand>🎨 크리블</Brand>
  </NavBarContainer>
);

export default Navbar;

const NavBarContainer = styled.header`
  width: 100%;
  padding: 10px 50px;
  border-top: 5px solid #5EB0AB;
  border-bottom: 2.5px solid #F6F6F6;
`;

const Brand = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;
