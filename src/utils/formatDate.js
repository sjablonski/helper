const formatDate = (date, onlyDate) => {
  const newDate = new Date(date);
  const monthNames = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];

  let day = newDate.getDate();
  if (day < 10) day = `0${day}`;
  const monthIndex = newDate.getMonth();
  const year = newDate.getFullYear();
  let hours = newDate.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = newDate.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let seconds = newDate.getSeconds();
  if (seconds < 10) seconds = `0${seconds}`;

  if (onlyDate) {
    return `${day} ${monthNames[monthIndex]} ${year}`;
  }
  return `${day} ${monthNames[monthIndex]} ${year}, ${hours}:${minutes}:${seconds}`;
};

export default formatDate;
