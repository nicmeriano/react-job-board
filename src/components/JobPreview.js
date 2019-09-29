import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { H2 } from '../styles/Text';
import getInitials from '../utils/getInitials';

const ParentWrapper = styled.li`
  display: flex;
  ${props =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}
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

export default function JobPreview({ job }) {
  const { title, location, company, created_at: createdAt, company_logo: companyLogo, id } = job;
  return (
    <ParentWrapper>
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
    </ParentWrapper>
  );
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
