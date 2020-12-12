const db = require('./data/db.json');
const { writeFile } = require('./utils');
const franc = require('franc');

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

  // Top 10 languages from text
  const textLanguages = franc.all(text, {}).slice(0, 10);
  // Top 10 languages from signature
  const signatureLanguages = franc.all(authorMeta.signature, {}).slice(0, 10);
  // Unique languages with probabilities
  const topLanguages = new Set([...textLanguages, ...signatureLanguages]);
  const languages = {};

  topLanguages.forEach(([id, probability]) => {
    languages[id] = probability;
  });

  console.log('TEXT:', text);
  console.log('SIGNATURE:', authorMeta.signature);
  console.log('LANGUAGES:', languages);

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

// writeFile('data/user.json', JSON.stringify(user, null, 2));
