const monthMap = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};
export default function sortJobs(jobs) {
  const sortedJobs = jobs.sort((a, b) => {
    const splitDateA = a.created_at.split(' ').splice(1);
    const splitDateB = b.created_at.split(' ').splice(1);
    const [monthA, dayA, , , yearA] = splitDateA;
    const [monthB, dayB, , , yearB] = splitDateB;
    const dateA = new Date(`${yearA}-${monthMap[monthA]}-${dayA}Z`);
    const dateB = new Date(`${yearB}-${monthMap[monthB]}-${dayB}Z`);

    if (dateA < dateB) {
      return 1;
    }
    return -1;
  });

  return sortedJobs;
}
