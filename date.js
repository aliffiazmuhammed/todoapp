
const getAmericanDate = () => {
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let year = today.getFullYear();

  // Add leading zeros to month and day if needed
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return `${month}/${day}/${year}`;
}


module.exports = getAmericanDate


