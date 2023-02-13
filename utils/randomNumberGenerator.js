// Créer une fonction qui va renvoyer un entier compris entre le minimum et le maximum inclus.
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
};

module.exports = getRandomNumber;