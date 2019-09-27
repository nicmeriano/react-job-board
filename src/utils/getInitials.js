export default function getInitials(str) {
  const words = str.trim().split(' ');

  const firstLetter = words[0] ? words[0][0].toUpperCase() : null;
  const secondLetter = words[1] ? words[1][0].toUpperCase() : null;

  if (secondLetter) {
    return `${firstLetter}${secondLetter}`;
  }
  if (firstLetter) {
    return firstLetter;
  }
  return 'N/A';
}
