export default async function fetchJobInfo(id) {
  const LAMBDA_API = `/.netlify/functions/job?id=${id}`;
  const res = await fetch(LAMBDA_API);
  let data;
  try {
    data = await res.json();
  } catch (e) {
    console.log(e.message);
    console.log("FETCHJOBINFO.JS");
  }

  return data;
}
