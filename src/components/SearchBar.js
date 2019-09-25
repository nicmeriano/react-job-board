import React from 'react';
import PropTypes from 'prop-types';

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
      <div className="form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchTerm">
            what
            <input
              id="searchTerm"
              value={searchTerm}
              onChange={event => this.handleChange(event, 'searchTerm')}
              type="text"
              placeholder="Job title, keywords, or company"
            />
          </label>
          <label htmlFor="searchTerm">
            where
            <input
              id="location"
              value={location}
              onChange={event => this.handleChange(event, 'location')}
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
