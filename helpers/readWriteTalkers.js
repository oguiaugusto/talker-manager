const fs = require('fs').promises;

const readTalkers = async () => {
  try {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(talkers);
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { readTalkers };
