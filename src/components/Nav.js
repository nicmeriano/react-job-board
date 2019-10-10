import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCode, FaBars, FaHome, FaBriefcase, FaBuilding, FaChartLine } from 'react-icons/fa';
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
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  flex: 1;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
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

/*
  Must filter out non-standard props (mobile in this case)
  when passing props down to Link component to avoid:
  'Warning: Received `true` for non-boolean attribute `gray`'
*/
const StyledLink = styled(({ mobile, ...props }) => <Link {...props} />)`
  font-weight: ${props => (props.mobile ? 900 : 400)};
  padding: 1rem 0.5rem;
  font-size: ${props => props.mobile && '1.1rem'};
  margin: ${props => props.mobile && '.5rem 0'};
  color: ${props => props.mobile && '#b8b7ae'};

  svg {
    margin-right: 1rem;
    font-size: 1rem;
  }

  &:focus {
    outline: none;
  }
  &:hover {
    color: ${props => (props.mobile ? props.theme.primary : props.theme.text.default)};
  }
`;

const MenuWrapper = styled(Header)`
  padding: 0;
  height: 0;
  position: relative;

  .bm-menu {
    background: ${props => props.theme.bg.white};
    background: #373a46;
  }

  .bm-burger-button {
    display: none;
  }

  .bm-cross {
    background: #b8b7ae;
  }

  nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 5rem;
    width: 70%;
    margin: 0 auto;
  }
`;

const BurgerButton = styled.div`
  cursor: pointer;
  padding: 1rem;

  svg {
    transition: 0.1s all ease-out;
    color: ${props => props.theme.text.default.regular};
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
      <BrandLogo as={Link} to="/">
        <FaCode />
      </BrandLogo>
      <NavList justify="flex-end">
        <NavLink>
          <StyledLink to="/">Jobs</StyledLink>
        </NavLink>
        <NavLink>
          <StyledLink to="/companies">Companies</StyledLink>
        </NavLink>
        <NavLink>
          <StyledLink to="/trends">Trends</StyledLink>
        </NavLink>
      </NavList>
      <Button inverted>
        <StyledLink to="/post-a-job">Post a job</StyledLink>
      </Button>
    </Header>
  );
}

function MobileNav({ toggled, toggleNav }) {
  return (
    <MenuWrapper>
      <MobileHeader>
        <BrandLogo as={Link} to="/">
          <FaCode />
        </BrandLogo>
        <BurgerButton onClick={() => toggleNav(true)}>
          <FaBars size={25} />
        </BurgerButton>
      </MobileHeader>
      <Menu
        right
        width={250}
        isOpen={toggled}
        onStateChange={({ isOpen }) => {
          toggleNav(isOpen);
        }}
      >
        <StyledLink mobile onClick={() => toggleNav(false)} to="/">
          <FaHome />
          Jobs
        </StyledLink>
        <StyledLink mobile onClick={() => toggleNav(false)} to="/companies">
          <FaBuilding />
          Companies
        </StyledLink>
        <StyledLink mobile onClick={() => toggleNav(false)} to="/trends">
          <FaChartLine />
          Trends
        </StyledLink>
        <StyledLink mobile onClick={() => toggleNav(false)} to="/post-a-job">
          <FaBriefcase />
          Post a job
        </StyledLink>
      </Menu>
    </MenuWrapper>
  );
}

MobileNav.propTypes = {
  toggled: PropTypes.bool.isRequired,
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

  handleOnClick = state => {
    this.setState({ isOpen: state });
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
        {isMobile ? <MobileNav toggled={isOpen} toggleNav={this.handleOnClick} /> : <DesktopNav />}
      </>
    );
  }
}
