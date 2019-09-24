import React from "react";
import fetchJobs from "../api/FetchJobs";
import JobPreview from "../components/JobPreview";

class SearchBar extends React.Component {
  state = {
    searchTerm: "",
    location: "",
    //test
    page: 1
  };

  handleChange = (event, id) => {
    this.setState({
      [id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit({ ...this.state });
  };

  render() {
    return (
      <div className="form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchTerm">
            what
            <input
              id="searchTerm"
              value={this.state.searchTerm}
              onChange={event => this.handleChange(event, "searchTerm")}
              type="text"
              placeholder="Job title, keywords, or company"
            />
          </label>
          <label htmlFor="searchTerm">
            where
            <input
              id="location"
              value={this.state.location}
              onChange={event => this.handleChange(event, "location")}
              type="text"
              placeholder="City, state, or zip code"
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

function JobList({ jobs }) {
  return (
    <div className="jobs-container">
      {jobs.map(job => (
        <JobPreview key={job.id} job={job} />
      ))}
    </div>
  );
}

export default class Results extends React.Component {
  state = {
    searchParams: {
      searchTerm: "",
      location: "",
      page: 1
    },
    jobs: {},
    error: null,
    loading: false,
    moreJobs: true
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
    this.updateJobs(this.state.searchParams);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.state.loading &&
      this.state.moreJobs
    ) {
      this.loadMoreJobs();
    }
  };

  updateJobs = params => {
    const { searchTerm, location } = params;
    const id = `${searchTerm}-${location}`;

    this.setState({
      searchParams: { ...params },
      moreJobs: true
    });

    if (!this.state.jobs[id]) {
      fetchJobs(params)
        .then(jobList => {
          this.setState(({ jobs }) => {
            return {
              jobs: {
                ...jobs,
                [id]: jobList
              }
            };
          });
        })
        .catch(error => {
          console.warn(`Error fetching repos: ${error}`);

          this.setState({
            error: `There was an error fetching the repositories.`
          });
        });
    }
  };

  loadMoreJobs = () => {
    this.setState(({ loading }) => ({
      loading: true
    }));
    const { searchTerm, location, page } = this.state.searchParams;
    const key = `${searchTerm}-${location}`;
    const nextPage = page + 1;
    const newJobs = { ...this.state.jobs };

    fetchJobs({ searchTerm, location, page: nextPage }).then(jobList => {
      const moreJobs = jobList.length > 0;
      newJobs[key].push(...jobList);

      this.setState(({ searchParams, jobs }) => ({
        searchParams: { ...searchParams, page: nextPage },
        jobs: { ...jobs, ...newJobs },
        loading: false,
        moreJobs
      }));
    });
  };

  render() {
    const { searchTerm, location } = this.state.searchParams;
    const key = `${searchTerm}-${location}`;
    const { jobs } = this.state;

    return (
      <React.Fragment>
        <SearchBar onSubmit={this.updateJobs} />
        {jobs[key] ? <JobList jobs={jobs[key]} /> : <div>Loading...</div>}
        <button onClick={this.loadMoreJobs}>MORE</button>
      </React.Fragment>
    );
  }
}
