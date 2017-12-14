import { SCRAMBLE_DIRECTIONS, SCRAMBLE_LENGTH, SCRAMBLE_OBFUSCATION_CHAR } from './constants';

export function formatTime(ms) {
  return (ms / 1000).toFixed(2)
}

export function generateScramble() {
  let moves = [];

  for (let i = 0; i < SCRAMBLE_LENGTH; i++) {
    const previousDirection = (moves[moves.length - 1] || '').slice(0, 1);
    const direction = pickRandom(SCRAMBLE_DIRECTIONS.filter(d => d !== previousDirection));
    const twice = randomBoolean();
    const reversed = randomBoolean();
    const move = direction + (twice ? '2' : '') + (reversed ? '\'' : '');

    moves = [...moves, move];
  }

  return moves;
}

export function obfuscateScramble(scramble) {
  return scramble.map(move => generateString(2, SCRAMBLE_OBFUSCATION_CHAR));
}

function generateString(amount, char) {
  let string = '';

  for (let i = 0; i < amount; i++) {
    string += char;
  }

  return string;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomBoolean() {
  return Boolean(Math.round(Math.random()));
}
