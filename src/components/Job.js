import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FaLessThan, FaClock, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import fetchJob from '../api/FetchJobInfo';
import { StyledButton } from '../styles/Buttons';
import { H2, H3, P, FlexCol } from '../styles/Text';
import Loading from './Loading';
import getInitials from '../utils/getInitials';
import Size from '../styles/device';

const InfoWrapper = styled(FlexCol)`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 2rem;
  border-bottom: ${props => `1px solid ${props.theme.text.opaque}`};

  @media screen and (min-width: ${Size.md}) {
    flex-direction: row;
  }
`;

const CompanyLogo = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;

  @media screen and (min-width: ${Size.sm}) {
    align-items: center;
    margin: 0 10px;
  }

  img {
    width: 100px;
  }
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  justify-content: center;
  padding: 15px 0;

  & > * {
    margin: 5px 0;
  }
`;

const Title = styled(H2)`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled(P)`
  font-weight: 300;
  font-size: 1rem;
  opacity: 0.8;
  margin-left: 5px;
`;

const Icon = styled.div`
  svg {
    font-size: 0.7rem;
  }
`;

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

const Heading = styled(H3)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  font-family: ${props => props.theme.font.stack};
  padding-bottom: 3rem;

  strong {
    font-size: 1.1rem;
    margin: 2rem 0;
    display: inline-block;
  }

  ul {
    margin: 1rem 0;
    padding-left: 2rem;
  }

  p {
    line-height: 1.6;
  }

  @media screen and (min-width: ${Size.lg}) {
    padding-bottom: 0;
  }
`;

const Wrapper = styled(FlexCol)`
  @media screen and (min-width: ${Size.lg}) {
    flex-direction: row;
  }
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex: 1;
  padding: 0 2rem;

  ${props =>
    props.special &&
    css`
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      min-height: auto;
      border-top: ${`1px solid ${props.theme.text.opaque}`};
      background: ${props.theme.bg.white};

      @media screen and (min-width: ${Size.lg}) {
        max-width: 380px;
        position: initial;
        border: none;
      }
    `}
`;

const StickyContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;

  @media screen and (min-width: ${Size.lg}) {
    padding: 2rem;
    flex-direction: column;
    border: ${props => `1px solid ${props.theme.text.opaque}`};
    border-radius: 3px;
    position: sticky;
    top: 100px;
  }
`;

const StyledP = styled(P)`
  display: none;

  @media screen and (min-width: ${Size.lg}) {
    display: block;
    color: ${props => props.theme.text.default.light};
    padding: 0.5rem 0.3rem;
    text-align: center;
    font-size: 0.8rem;
  }
`;

const BackButton = styled.div`
  display: flex;
  margin: 2rem 1rem;
  align-items: center;
  padding: 0;
  transition: 0.1s ease all;

  svg {
    transition: 0.1s ease all;
    margin-right: 0.5rem;
    font-size: 0.5rem;
    opacity: 0.5;
    transform: translateX(0);
  }
  a {
    font-weight: 500;
    font-size: 1.1rem;
  }

  &:hover {
    color: ${props => props.theme.primary};

    svg {
      opacity: 1;
      transform: translateX(-5px);
    }
  }
`;

const ApplyButton = styled(StyledButton)`
  text-align: center;
`;

export default class Job extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      job: null,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { id } = queryString.parse(location.search);
    fetchJob(id).then(job => {
      this.setState({ job });
    });
  }

  render() {
    const { job } = this.state;

    if (!job) {
      return <Loading />;
    }

    const {
      title,
      location,
      company,
      created_at: createdAt,
      company_logo: companyLogo,
      description,
      url,
    } = job;

    return (
      <>
        <BackButton>
          <FaLessThan />
          <Link to="/">Go Back</Link>
        </BackButton>
        <Wrapper>
          <StyledColumn>
            <InfoWrapper>
              <JobInfo>
                <Title>{title}</Title>
                <FlexWrapper>
                  <Icon>
                    <FaBuilding color="gray" />
                  </Icon>
                  <Text>{company}</Text>
                </FlexWrapper>
                <FlexWrapper>
                  <Icon>
                    <FaClock color="gray" />
                  </Icon>
                  <Text>{createdAt}</Text>
                </FlexWrapper>
                <FlexWrapper>
                  <Icon>
                    <FaMapMarkerAlt color="gray" />
                  </Icon>
                  <Text>{location}</Text>
                </FlexWrapper>
              </JobInfo>
              <CompanyLogo>
                {companyLogo ? (
                  <img src={companyLogo} alt={`${company} logo`} />
                ) : (
                  <AltImg>{getInitials(company)}</AltImg>
                )}
              </CompanyLogo>
            </InfoWrapper>
            <Heading>Description</Heading>

            <Description
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </StyledColumn>
          <StyledColumn special>
            <StickyContainer>
              <ApplyButton as="a" href={url} rel="noopener noreferrer" target="_blank">
                Apply
              </ApplyButton>
              <StyledP>
                By clicking apply you will leave devjob. Please be careful. You should never have to
                pay to apply.
              </StyledP>
            </StickyContainer>
          </StyledColumn>
        </Wrapper>
      </>
    );
  }
}

Job.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};
