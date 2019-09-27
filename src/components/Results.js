import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import JobPreview from './JobPreview';
import SearchBar from './SearchBar';
import Loading from './Loading';
import fetchJobs from '../api/FetchJobs';
import { H1, P } from '../styles/Text';

const JobListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  border: ${props => `1px solid ${props.theme.text.opaque}`};
  border-radius: 3px;
  box-shadow: ${props => (props.shadow ? props.theme.shadow.light : 'none')};

  li {
    border-bottom: ${props => `1px solid ${props.theme.text.opaque}`};

    &:last-child {
      border-bottom: none;
    }
  }
`;

const Heading = styled(H1)`
  margin: 2rem 0;
`;

const StyledP = styled(P)`
  text-align: center;
  font-weight: 600;
  opacity: 0.8;
  margin-top: 3rem;
`;

const ResultsContainer = styled.div`
  margin: 2rem 0;
`;

function JobList({ jobs }) {
  return (
    <JobListWrapper shadow>
      {jobs && jobs.map(job => <JobPreview key={job.id} job={job} />)}
    </JobListWrapper>
  );
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
};

JobList.defaultProps = {
  jobs: [],
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParams: {
        searchTerm: '',
        location: '',
        page: 1,
      },
      jobs: {},
      loading: false,
      moreJobs: true,
    };
  }

  componentDidMount() {
    const { searchParams } = this.state;
    window.addEventListener('scroll', this.handleOnScroll);
    this.updateJobs(searchParams);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll = () => {
    const { loading, moreJobs } = this.state;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading && moreJobs) {
      this.loadMoreJobs();
    }
  };

  updateJobs = params => {
    const { searchTerm, location } = params;
    const { jobs } = this.state;
    const id = `${searchTerm}-${location}`;

    this.setState({
      searchParams: { ...params },
      loading: true,
      moreJobs: true,
    });

    if (!jobs[id]) {
      fetchJobs(params)
        .then(jobList => {
          this.setState(() => {
            const moreJobs = jobList.length > 0;
            return {
              jobs: {
                ...jobs,
                [id]: jobList,
              },
              loading: false,
              moreJobs,
            };
          });
        })
        .catch(({ message }) => {
          console.warn(`There was an error fetching the jobs: ${message}`);
        });
    }
  };

  loadMoreJobs = () => {
    this.setState(() => ({
      loading: true,
    }));

    const {
      searchParams: { searchTerm, location, page },
      jobs,
    } = this.state;
    const key = `${searchTerm}-${location}`;
    const nextPage = page + 1;
    const newJobs = { ...jobs };

    fetchJobs({ searchTerm, location, page: nextPage }).then(jobList => {
      const moreJobs = jobList.length > 0;
      newJobs[key].push(...jobList);

      this.setState(({ searchParams }) => ({
        searchParams: { ...searchParams, page: nextPage },
        jobs: { ...jobs, ...newJobs },
        loading: false,
        moreJobs,
      }));
    });
  };

  render() {
    const {
      searchParams: { searchTerm, location },
      jobs,
      loading,
      moreJobs,
    } = this.state;
    const key = `${searchTerm}-${location}`;
    return (
      <ResultsContainer>
        <SearchBar onSubmit={this.updateJobs} />
        <Heading>Latest Jobs</Heading>
        {jobs[key] && <JobList jobs={jobs[key]} />}
        {loading && <Loading />}
        {!moreJobs && <StyledP>{`Found ${jobs[key] ? jobs[key].length : 0} jobs`}</StyledP>}
      </ResultsContainer>
    );
  }
}
