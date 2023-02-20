const getRandomNumber = require('./randomNumberGenerator');

const getRandomUniqueId = (randomIdArray, max, min=1 ) => {
  const randomId = getRandomNumber(min, max);
  if (randomIdArray.includes(randomId)) {
    return getRandomUniqueId(randomIdArray, max, min =1);
  }
  randomIdArray.push(randomId);
  return randomId;
};

module.exports = getRandomUniqueId;

