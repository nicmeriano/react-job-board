import React from "react";
import { Link } from "react-router-dom";

export default function JobPreview({ job }) {
  const { title, location, company, type, created_at, id } = job;
  return (
    <Link
      className="job"
      to={{
        pathname: "/search/results",
        search: `?id=${id}`
      }}
    >
      <div>
        <ul>
          <li>{title}</li>
          <li>{company}</li>
          <li>{location}</li>
          <li>{created_at}</li>
          <li>{type}</li>
          <li>{id}</li>
        </ul>
      </div>
    </Link>
  );
}
