import React from 'react';
import PropTypes from 'prop-types';
import JobPreview from './JobPreview';
import SearchBar from './SearchBar';
import fetchJobs from '../api/FetchJobs';

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
      moreJobs: true,
    });

    if (!jobs[id]) {
      fetchJobs(params)
        .then(jobList => {
          this.setState(() => {
            return {
              jobs: {
                ...jobs,
                [id]: jobList,
              },
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
    } = this.state;
    const key = `${searchTerm}-${location}`;

    return (
      <>
        <SearchBar onSubmit={this.updateJobs} />

        {jobs[key] ? <JobList jobs={jobs[key]} /> : <div>Loading...</div>}

        <button onClick={this.loadMoreJobs} type="button">
          MORE
        </button>
      </>
    );
  }
}

function JobList({ jobs }) {
  return (
    <div className="jobs-container">
      {jobs && jobs.map(job => <JobPreview key={job.id} job={job} />)}
    </div>
  );
}

JobList.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object),
};

JobList.defaultProps = {
  jobs: [],
};
