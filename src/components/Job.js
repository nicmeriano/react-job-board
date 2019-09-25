import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import fetchJob from '../api/FetchJobInfo';

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
    return <pre>{job && JSON.stringify(job, null, 2)}</pre>;
  }
}

Job.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};
