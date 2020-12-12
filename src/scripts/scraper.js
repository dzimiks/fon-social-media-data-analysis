const { writeFile } = require('./utils');
const { getUserProfileInfo } = require('tiktok-scraper');

const getUserData = async (username) => {
  const userMeta = await getUserProfileInfo(username, {});
  console.log(userMeta);
  // writeFile('data/getUserData.json', JSON.stringify(userMeta));
  writeFile('data/getUserData.json', JSON.stringify(userMeta, null, 2));
};

// II nacin
// async function getUserData(username) {
//   const userMeta = await getUserProfileInfo(username, {});
//   console.log(userMeta);
//   writeFile('data/getUserData.json', JSON.stringify(userMeta, null, 2));
// }

getUserData('neuspehjokeru')
  .then(() => console.log('Fetched user data!'));
