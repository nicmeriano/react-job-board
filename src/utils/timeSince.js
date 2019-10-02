export default function timeSince(date) {
  const [, month, number, time, , year] = date.split(' ');
  const createdAt = new Date(`${month} ${number}, ${year} ${time}`);
  const now = new Date();

  const timeElapsed = now - createdAt;

  const seconds = Math.floor(timeElapsed / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return `${interval} ${interval > 1 ? 'years' : 'year'} ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} ${interval > 1 ? 'months' : 'month'} ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} ${interval > 1 ? 'days' : 'day'} ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} ${interval > 1 ? 'hours' : 'hour'} ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} ${interval > 1 ? 'minutes' : 'minute'} ago`;
  }
  return `${interval} ${interval > 1 ? 'seconds' : 'second'} ago`;
}
