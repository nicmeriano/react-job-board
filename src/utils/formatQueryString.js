export default function formatQueryString(string) {
  return string
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 1)
    .join('+');
}
