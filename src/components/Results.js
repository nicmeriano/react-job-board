import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import JobPreview from './JobPreview';
import SearchBar from './SearchBar';
import Loading from './Loading';
import TopTech from './TopTech';
import fetchJobs from '../api/FetchJobs';
import { H1, P } from '../styles/Text';
import timeSince from '../utils/timeSince';

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

const TitleHeading = styled(Heading)`
  font-size: 2.5rem;
  padding: 2rem 0;
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
      {jobs &&
        jobs.map(job => {
          const { created_at: created } = job;
          const timePosted = timeSince(created);
          return <JobPreview key={job.id} job={{ ...job, created_at: timePosted }} />;
        })}
    </JobListWrapper>
  );
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
};

JobList.defaultProps = {
  jobs: [],
};

let CACHED_STATE = {
  searchParams: {
    searchTerm: '',
    location: '',
    page: 1,
  },
  jobs: {},
  loading: false,
  moreJobs: true,
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = CACHED_STATE;
  }

  componentDidMount() {
    const { searchParams } = this.state;
    window.addEventListener('scroll', this.handleOnScroll);
    this.updateJobs(searchParams);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
    CACHED_STATE = this.state;
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

    if (!jobs[id]) {
      this.setState({
        searchParams: { ...params, page: 1 },
        loading: true,
        moreJobs: true,
      });

      fetchJobs(params)
        .then(jobList => {
          this.setState(() => {
            const moreJobs = jobList.length > 0;
            return {
              jobs: {
                ...jobs,
                [id]: [jobList],
              },
              loading: false,
              moreJobs,
            };
          });
        })
        .catch(({ message }) => {
          console.warn(`There was an error fetching the jobs: ${message}`);
        });
    } else {
      this.setState({
        searchParams: {
          ...params,
          page: jobs[id].length,
        },
        moreJobs: true,
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
      newJobs[key].push(jobList);

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
    const allJobs = jobs[key] ? [].concat(...jobs[key]) : [];
    let searchHeading;
    if (searchTerm && location) {
      searchHeading = `${searchTerm} jobs in ${location}`;
    } else if (searchTerm) {
      searchHeading = `${searchTerm} jobs`;
    } else if (location) {
      searchHeading = `Jobs in ${location}`;
    } else {
      searchHeading = `Latest Jobs`;
    }

    return (
      <ResultsContainer>
        <TitleHeading>Find your dream developer job today </TitleHeading>
        <SearchBar onSubmit={this.updateJobs} />
        <TopTech handleClick={this.updateJobs} />
        <Heading>{searchHeading}</Heading>
        {jobs[key] && <JobList jobs={allJobs} />}
        {loading && <Loading size={10} time={0.5} />}
        {!moreJobs && <StyledP>{`Found ${jobs[key] ? allJobs.length : 0} jobs`}</StyledP>}
      </ResultsContainer>
    );
  }
}
