export default async function fetchJobs({ searchTerm, location, page }) {
  const LAMBDA_API = `/.netlify/functions/async-jobs?searchTerm=${searchTerm}&location=${location}&page=${page}`;
  const res = await fetch(LAMBDA_API);
  let data;
  try {
    data = await res.json();
    // data = await res.json();
  } catch (e) {
    console.log(e.message);
  }

  return data;
}
