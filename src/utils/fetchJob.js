import fetch from 'node-fetch';

export default async function fetchJob(id) {
  const API_URL = `https://jobs.github.com/positions/${id}.json`;

  const res = await fetch(API_URL);
  const data = await res.json();

  return data;
}
