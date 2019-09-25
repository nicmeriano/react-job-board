import fetchGithub from '../utils/fetchGithub';

exports.handler = async function(event) {
  try {
    const searchParams = event.queryStringParameters || {};
    const allJobs = await fetchGithub(searchParams);

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(allJobs),
    };
  } catch ({ message }) {
    console.log(message);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: message }),
    };
  }
};
