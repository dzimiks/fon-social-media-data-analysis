const db = require('./data/db.json');
const users = require('./data/users.json');

const { writeFile } = require('./utils');
const franc = require('franc');
const { balkanLanguages, balkanKeywords } = require('./consts');

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
    isBalkanLanguage: isBalkanLanguage || hasBalkanLanguage,
  };
});

writeFile('data/users.json', JSON.stringify(user, null, 2));

const balkanProfiles = [];

Object.entries(users).forEach(([key, value]) => {
  if (value.isBalkanLanguage) {
    balkanProfiles.push({ ...value });
  }
});

writeFile('data/balkanProfiles.json', JSON.stringify(balkanProfiles, null, 2));
