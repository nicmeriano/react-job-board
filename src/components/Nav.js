import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCode, FaBars } from 'react-icons/fa';
import { slide as Menu } from 'react-burger-menu';
import PropTypes from 'prop-types';
import { StyledButton } from '../styles/Buttons';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 999;
  height: 70px;
  background: white;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.1);
`;

const BrandLogo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    color: ${props => props.theme.primary};
    font-size: 2rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const NavLink = styled.li`
  margin-left: 1.5rem;
  position: relative;
  display: flex;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.primary};
    transition: all 0.3s ease-out;
  }
  &:hover:after,
  &:focus-within:after {
    width: 100%;
  }
`;

const Button = styled(StyledButton)`
  padding: 1rem 0.5rem;
  margin-left: 1.5rem;
  border: ${props => `${props.theme.primary} 1px solid`};
`;

const StyledLink = styled(Link)`
  font-weight: 400;
  padding: 1rem 0.5rem;

  &:focus {
    outline: none;
  }
`;

const MenuWrapper = styled(Header)`
  padding: 0;
  height: 0;
  position: relative;

  .bm-menu {
    background: ${props => props.theme.bg.white};
  }

  .bm-burger-button {
    display: none;
  }
`;

const BurgerButton = styled.div`
  cursor: pointer;
  padding: 1rem;

  svg {
    transition: 0.1s all ease-out;
    color: ${props => props.theme.text.default};
  }

  &:hover svg {
    color: ${props => props.theme.primary};
  }
`;

const MobileHeader = styled(Header)`
  justify-content: space-between;
`;

function DesktopNav() {
  return (
    <Header>
      <BrandLogo>
        <FaCode />
      </BrandLogo>
      <NavList>
        <NavLink>
          <StyledLink to="/">Home</StyledLink>
        </NavLink>
        <NavLink>
          <StyledLink to="/">Jobs</StyledLink>
        </NavLink>
        <NavLink>
          <StyledLink to="/">Companies</StyledLink>
        </NavLink>
        <NavLink>
          <StyledLink to="/">Trends</StyledLink>
        </NavLink>
      </NavList>
      <Button inverted>
        <StyledLink to="/">Post a job</StyledLink>
      </Button>
    </Header>
  );
}

function MobileNav({ isOpen, toggleNav }) {
  return (
    <MenuWrapper>
      <MobileHeader>
        <BrandLogo>
          <FaCode />
        </BrandLogo>
        <BurgerButton onClick={toggleNav}>
          <FaBars size={25} />
        </BurgerButton>
      </MobileHeader>
      <Menu
        right
        isOpen={isOpen}
        onStateChange={state => {
          if (!state.isOpen) {
            toggleNav();
          }
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Test</Link>
      </Menu>
    </MenuWrapper>
  );
}

MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: false,
      isOpen: false,
    };
  }

  componentDidMount() {
    this.updateWindowDimentions();
    window.addEventListener('resize', this.updateWindowDimentions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleOnClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  updateWindowDimentions = () => {
    const { isMobile } = this.state;
    if (window.innerWidth < 768 && !isMobile) {
      this.setState({ isMobile: true });
    } else if (window.innerWidth >= 768 && isMobile) {
      this.setState({ isMobile: false });
    }
  };

  render() {
    const { isMobile, isOpen } = this.state;
    return (
      <>
        {isMobile ? <MobileNav isOpen={isOpen} toggleNav={this.handleOnClick} /> : <DesktopNav />}
      </>
    );
  }
}
