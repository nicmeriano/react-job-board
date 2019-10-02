import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FaClock, FaMapMarkerAlt, FaChevronLeft } from 'react-icons/fa';
import { H2 } from '../styles/Text';
import getInitials from '../utils/getInitials';

const ParentWrapper = styled.li`
  display: flex;
  position: relative;
  border-bottom: ${props => `1px solid ${props.theme.text.opaque}`};
`;

const Front = styled.div`
  display: flex;
  flex: 1;

  background: ${props => props.theme.bg.white};
  transition: 0.3s ease-out all;
  cursor: pointer;
  z-index: 2;

  ${props =>
    props.toggled &&
    css`
      transform: translateX(-200px);
      background: #fbf9f8;
      box-shadow: 5px 1px 8px -3px rgba(0, 0, 0, 0.1);
    `}
`;

const Back = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: transparent;
  z-index: 1;
`;

const CompanyLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0 10px;

  img {
    width: 50px;
  }
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  justify-content: center;
  align-items: flex-start;
  margin: 0 10px;
  padding: 15px 0;

  & > * {
    margin: 5px 0;
  }
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Company = styled.h4`
  font-weight: 300;

  font-size: 1rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled(FlexWrapper)`
  margin-right: 3rem;
  flex: 1;
  justify-content: flex-end;

  svg {
    opacity: 0.3;
    transition: 0.3s ease all;
    font-size: 1rem;
  }

  ${props =>
    props.toggled &&
    css`
      svg {
        transform: rotate(180deg);
      }
    `}
`;

const Text = styled.p`
  font-weight: 300;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-left: 5px;
`;

const Icon = styled.div``;

const AltImg = styled(H2)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.text.opaque};
  border-radius: 50%;
  color: ${props => props.theme.text.default.light};
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  background: ${props => props.color || 'transparent'};
  font-size: 1rem;
  font-weight: 500;
  /* color: ${props => props.theme.bg.white}; */
  transition: 0.3s all ease;

&:nth-child(1) {
  border-right: 1px solid rgba(0, 0, 0, .1);

}
  &:hover {
    opacity: 1;
  }
`;

const ButtonWrapper = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
`;

export default class JobPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
    };
  }

  handleOnClick = () => {
    this.setState(({ toggled }) => ({
      toggled: !toggled,
    }));
  };

  render() {
    const { job } = this.props;
    const {
      title,
      location,
      company,
      created_at: createdAt,
      company_logo: companyLogo,
      id,
      url,
    } = job;
    const { toggled } = this.state;

    return (
      <ParentWrapper toggled={toggled}>
        <Front toggled={toggled} onClick={this.handleOnClick}>
          <CompanyLogo>
            {companyLogo ? (
              <img src={companyLogo} alt={`${company} logo`} />
            ) : (
              <AltImg>{getInitials(company)}</AltImg>
            )}
          </CompanyLogo>
          <JobInfo>
            <Link
              to={{
                pathname: '/search/results',
                search: `?id=${id}`,
              }}
            >
              <Title>{title}</Title>
            </Link>
            <Company>{company}</Company>
            <FlexWrapper>
              <Icon>
                <FaClock size={10} color="gray" />
              </Icon>
              <Text>{createdAt}</Text>
            </FlexWrapper>
            <FlexWrapper>
              <Icon>
                <FaMapMarkerAlt size={10} color="gray" />
              </Icon>
              <Text>{location}</Text>
            </FlexWrapper>
          </JobInfo>
          <IconWrapper toggled={toggled}>
            <FaChevronLeft />
          </IconWrapper>
        </Front>
        <Back>
          <ButtonWrapper>
            <Button as="a" href={url} target="_blank">
              Apply
            </Button>
            <Button
              as={Link}
              to={{
                pathname: '/search/results',
                search: `?id=${id}`,
              }}
            >
              More
            </Button>
          </ButtonWrapper>
        </Back>
      </ParentWrapper>
    );
  }
}

JobPreview.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    created_at: PropTypes.string,
    company: PropTypes.string,
    company_url: PropTypes.string,
    location: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    how_to_apply: PropTypes.string,
    company_logo: PropTypes.string,
  }).isRequired,
};
