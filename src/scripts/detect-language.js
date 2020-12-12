const db = require('./data/db.json');
const { writeFile } = require('./utils');

const user = {};

db.forEach((post) => {
  const {
    id,
    text,
    authorMeta,
    webVideoUrl,
    videoUrl,
    diggCount,
    shareCount,
    playCount,
    commentCount,
    hashtags,
  } = post;

  // Template string
  user[`@${authorMeta.name}`] = {
    id,
    text,
    authorMeta,
    webVideoUrl,
    videoUrl,
    diggCount,
    shareCount,
    playCount,
    commentCount,
    hashtags,
  };
});

writeFile('data/user.json', JSON.stringify(user, null, 2));
