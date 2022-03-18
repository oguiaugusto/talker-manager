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

const writeTalkers = async (talker) => {
  try {
    const talkers = await readTalkers();

    talkers.push(talker);
    await fs.writeFile('./talker.json', JSON.stringify(talkers, null, 2));

    return talker;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = { readTalkers, writeTalkers };
