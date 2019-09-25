export default async function fetchJobInfo(id) {
  const LAMBDA_API = `/.netlify/functions/job?id=${id}`;
  const res = await fetch(LAMBDA_API);
  let data;
  try {
    data = await res.json();
  } catch ({ message }) {
    throw new Error(message);
  }

  return data;
}
