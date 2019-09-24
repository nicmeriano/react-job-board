import fetch from "node-fetch";

export async function handler(event) {
  // try {
  //   const { id } = event.queryStringParameters || {};
  //   console.log("fetching job info: ", { id });
  //   const res = await fetchJob(id);

  //   console.log("JOB!", res);

  // return {
  //   statusCode: 200,
  //   headers: { "content-type": "application/json" },

  //   body: JSON.stringify({ job: "hello" })
  // };
  // } catch (err) {
  // console.log(err); // output to netlify function log
  // return {
  //   statusCode: 500,
  //   body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
  // };
  // }

  try {
    const { id } = event.queryStringParameters || {};
    const job = await fetchJob(id);
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(job)
    };
  } catch (error) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}

async function fetchJob(id) {
  const API_URL = `https://jobs.github.com/positions/${id}.json`;

  const res = await fetch(API_URL);
  const data = await res.json();

  return data;
}
