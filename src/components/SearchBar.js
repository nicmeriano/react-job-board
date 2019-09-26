import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FaSearch, FaLocationArrow } from 'react-icons/fa';
import { StyledButton } from '../styles/Buttons';

const ParentForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* padding: 1rem; */
  /* box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.1); */
  justify-content: center;

  label {
    color: rgba(0, 0, 0, 0.3);
  }

  @media screen and (min-width: 1000px) {
    flex-direction: row;
    align-items: center;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex: 1;
  margin: 10px 0;
  height: 60px;

  @media screen and (min-width: 1000px) {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const InputWrapper = styled.div`
  flex: 1;
  padding-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: ${props => (props.border ? '1px solid rgba(0, 0, 0, 0.1)' : 'none')};
  border-radius: 3px;

  &:focus-within,
  &:hover {
    label {
      color: ${props => props.theme.primary};
    }
  }

  ${props =>
    props.hover &&
    css`
      &:focus-within,
      &:hover {
        box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.1);
        label {
          color: ${props.theme.primary};
        }
      }
    `}
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  margin-left: 10px;
  height: 100%;
  font-size: 1rem;
  transition: 0.3s all ease-out;
  color: inherit;

  &:focus {
    outline: none;
  }
`;

const Button = styled(StyledButton)`
  flex: 1;
  min-width: 64px;
  height: 100%;
  margin-left: 10px;
  text-transform: uppercase;
`;

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      location: '',
      page: 1,
    };
  }

  handleChange = (event, id) => {
    this.setState({
      [id]: event.target.value,
    });
  };

  handleSubmit = event => {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit({ ...this.state });
  };

  render() {
    const { searchTerm, location } = this.state;

    return (
      <ParentForm onSubmit={this.handleSubmit}>
        <FlexWrapper>
          <InputWrapper hover border>
            <label htmlFor="searchTerm">
              <FaSearch size={15} />
            </label>
            <InputField
              id="searchTerm"
              name="searchTerm"
              value={searchTerm}
              onChange={event => this.handleChange(event, 'searchTerm')}
              type="text"
              placeholder="Job title, keywords, or company"
              autoComplete="off"
            />
          </InputWrapper>
        </FlexWrapper>
        <FlexWrapper>
          <InputWrapper border>
            <label htmlFor="location">
              <FaLocationArrow size={15} />
            </label>
            <InputField
              id="location"
              name="location"
              value={location}
              onChange={event => this.handleChange(event, 'location')}
              type="text"
              placeholder="City, state, or zip code"
              autoComplete="off"
            />
          </InputWrapper>
          <Button type="submit">Search</Button>
        </FlexWrapper>
      </ParentForm>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
