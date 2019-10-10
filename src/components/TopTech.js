import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaReact,
  FaJava,
  FaJsSquare,
  FaDatabase,
  FaHtml5,
  FaCss3,
  FaPython,
  FaAngular,
  FaChevronDown,
} from 'react-icons/fa';
import mockTech from '../data/mockTech';
import { H3, P } from '../styles/Text';

const List = styled.ul`
  display: ${props => (props.isOpen ? 'grid' : 'none')};
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  transition: 0.8s ease-in-out all;
  overflow: hidden;
`;

const Item = styled.li`
  display: flex;
  border-radius: 3px;
  border: 1px solid hsla(0, 0%, 90%, 1);
  padding: 1rem;
  align-items: center;
  box-shadow: ${props => props.theme.shadow.light};
  cursor: pointer;
  opacity: 0.8;
  transition: 0.3s ease all;

  svg {
    color: gray;
    font-size: 2.5rem;
    margin-right: 1rem;
    transition: 0.3s ease all;
  }

  &:hover {
    opacity: 1;
    box-shadow: ${props => props.theme.shadow.medium};
  }
`;

const Details = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled(H3)`
  font-weight: 600;
  font-size: 1.2rem;
`;

const Jobs = styled(P)`
  font-weight: 300;
`;

const Heading = styled.div`
  margin: 2rem 0;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;
    color: ${props => props.theme.text.default.regular};
  }
`;

const DrawerBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: ${props => props.theme.text.default.regular};
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.8;

  &:hover {
    opacity: 1;
  }

  svg {
    transform: ${props => (props.up ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: 0.3s ease all;
    margin-left: 5px;
    margin-top: 1px;
  }
`;

const logos = {
  Java: <FaJava />,
  JavaScript: <FaJsSquare />,
  SQL: <FaDatabase />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3 />,
  Python: <FaPython />,
  Angular: <FaAngular />,
  React: <FaReact />,
};

export default function TopTech({ handleClick }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Heading>
        <DrawerBtn up={isOpen} onClick={() => setOpen(!isOpen)}>
          Top Technologies
          <FaChevronDown />
        </DrawerBtn>
      </Heading>
      <List isOpen={isOpen}>
        {mockTech.map(tech => {
          const { name, jobs } = tech;

          return (
            <Item key={name} onClick={() => handleClick({ searchTerm: name, location: '' })}>
              {logos[name]}
              <Details>
                <Name>{name}</Name>
                <Jobs>{`${jobs} jobs`}</Jobs>
              </Details>
            </Item>
          );
        })}
      </List>
    </>
  );
}
