import fetchJob from '../utils/fetchJob';

exports.handler = async function(event) {
  try {
    const { id } = event.queryStringParameters || {};
    const job = await fetchJob(id);
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(job),
    };
  } catch ({ message }) {
    console.log(message);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: message }),
    };
  }
};
