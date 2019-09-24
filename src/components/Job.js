import React from "react";
import queryString from "query-string";
import fetchJob from "../api/FetchJobInfo";

export default class Job extends React.Component {
  state = {
    job: null
  };

  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    fetchJob(id).then(job => {
      this.setState({ job });
    });
  }

  render() {
    return (
      <pre>{this.state.job && JSON.stringify(this.state.job, null, 2)}</pre>
    );
  }
}
