import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function JobPreview({ job }) {
  const { title, location, company, type, created_at: createdAt, id } = job;
  return (
    <Link
      className="job"
      to={{
        pathname: '/search/results',
        search: `?id=${id}`,
      }}
    >
      <div>
        <ul>
          <li>{title}</li>
          <li>{company}</li>
          <li>{location}</li>
          <li>{createdAt}</li>
          <li>{type}</li>
          <li>{id}</li>
        </ul>
      </div>
    </Link>
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
