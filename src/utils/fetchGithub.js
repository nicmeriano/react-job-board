import fetch from 'node-fetch';
import formatQueryString from './formatQueryString';
import sortJobs from './sortJobs';
import removeDuplicatesBy from './removeDuplicatesBy';

export default async function fetchGithub({ searchTerm, location, page }) {
  console.log('\nFetching Github...');

  try {
    const query = formatQueryString(searchTerm);
    const loc = formatQueryString(location);
    const API_URL = `https://jobs.github.com/positions.json?description=${query}&location=${loc}&page=${page}`;

    const res = await fetch(API_URL);
    const jobs = await res.json();

    // sort by date
    const sortedJobs = sortJobs(jobs);
    const sortedUniqueJobs = removeDuplicatesBy(job => job.id, sortedJobs);

    console.log(`
      SearchTerm: ${searchTerm}
      Location: ${location}
      Page: ${page}
      Got a total of ${jobs.length} jobs (UNFILTERED)\n`);

    return sortedUniqueJobs;
  } catch (error) {
    console.warn(error);
    return new Error(error);
  }
}
