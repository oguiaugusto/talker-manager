const fs = require('fs').promises;

const readTalkers = async () => {
  try {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    return talkers ? JSON.parse(talkers) : [];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const writeTalkers = async (content) => {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(content, null, 2));

    return content;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { readTalkers, writeTalkers };
