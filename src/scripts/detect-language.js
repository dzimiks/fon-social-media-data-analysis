const db = require('./data/db.json');
const users = require('./data/users.json');

const { writeFile } = require('./utils');
const franc = require('franc');
const { balkanLanguages, balkanKeywords } = require('./consts');

const allUsers = [];

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

  // Has language object some of the balkan languages?
  const isBalkanLanguage = Object.keys(languages)
    .some((lang) => Object.keys(balkanLanguages)
      .some((langName) => lang === langName));

  // Is keyword inside the text or signature?
  const hasBalkanLanguage = balkanKeywords.some((keyword) => {
    const hasTextKeyword = text.includes(keyword);
    const hasSignatureKeyword = authorMeta.signature.includes(keyword);
    return hasTextKeyword || hasSignatureKeyword;
  });

  console.log('TEXT:', text);
  console.log('SIGNATURE:', authorMeta.signature);
  console.log('LANGUAGES:', languages);
  console.log('IS BALKAN LANG:', isBalkanLanguage);
  console.log('HAS BALKAN LANG:', hasBalkanLanguage);

  allUsers.push({
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
    isBalkanLanguage: isBalkanLanguage || hasBalkanLanguage,
  });
});

writeFile('data/users.json', JSON.stringify(allUsers, null, 2));

const balkanUsers = [];

users.forEach((post) => {
  if (post.isBalkanLanguage) {
    balkanUsers.push({ ...post });
  }
});

writeFile('data/balkanUsers.json', JSON.stringify(balkanUsers, null, 2));
