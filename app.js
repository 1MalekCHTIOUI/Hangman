const arm_left = document.querySelector('.arm_left');
const arm_right = document.querySelector('.arm_right');
const leg_left = document.querySelector('.leg_left');
const leg_right = document.querySelector('.leg_right');
const body = document.querySelector('.body');
const head = document.querySelector('.head');
const hangerStand = document.querySelector('.hangerStand');
const hangerHook = document.querySelector('.hangerHook');
const btn = document.querySelector('.btn');
const hangerContainer = document.querySelector('.hangerContainer');
const wordContainer = document.querySelector('.wordContainer');
const inc = document.querySelector('#incorrect');
let counter = 1;
let isPlaying = true;

const words = [
  'apple',
  'banana',
  'orange',
  'pineapple',
  'mango',
  'strawberry',
  'grapes',
  'watermelon',
  'cherry',
  'pear',
  'peach',
  'plum',
  'blueberry',
  'raspberry',
  'blackberry',
];

const init = () => {
  addInput();
};
let randomWord;
let randomWordArray = [];
let remainingWords = [];

// function that adds each letter as a div
const addInput = () => {
  randomWord = words[Math.floor(Math.random() * words.length)];
  randomWordArray = randomWord.split('');
  remainingWords = remainingWords.concat(randomWordArray);
  console.log(randomWord);
  let inputLength = randomWord.length;
  // we loop on the number of letters in the random word and create a div for each letter
  for (let i = 0; i < inputLength; i++) {
    const item = document.createElement('div');
    item.classList.add(`word`);
    wordContainer.appendChild(item);
  }
};
let correctlyGuessedLetters = [];
// a set because there is no need to add the same letter twice
let incorrectlyGuessedLetters = new Set();
// Écouteur d'événements pour détecter les touches du clavier
document.addEventListener('keydown', function (event) {
  // we check if the key length is 1 and if it's a letter
  if (isPlaying && event.key.length === 1 && event.key.match(/[a-z]/i)) {
    // we check if the remaining words array contains the key pressed
    if (remainingWords.includes(event.key)) {
      // if it does, we get all the indexes of the letter pressed in the random word because it can be repeated
      let indexes = [];
      // we get the index of the pressed letter in the array
      let index = randomWordArray.indexOf(event.key);
      // if the letter exists it array we add it to indexes, and then we change the index to the next index of the same pressed letter
      while (index !== -1) {
        indexes.push(index);
        index = randomWordArray.indexOf(event.key, index + 1);
      }
      // we loop on the indexes and put each letter(if more than one) in the corresponding index in the wordContainer
      indexes.forEach((index) => {
        wordContainer.children[
          index
        ].innerHTML = `<div>${randomWordArray[index]}</div>`;
        // we add it to the correctly guessed letters array
        correctlyGuessedLetters.push(randomWordArray[index]);
        // we remove it from the remaining words array
        remainingWords.splice(remainingWords.indexOf(event.key), 1);
      });
    } else {
      //if the letter pressed is not in the random word, we call the function that adds the corresponding hangman elements
      incorrectlyGuessedLetters.add(event.key);
      onFailAddElement();
      console.log(counter);
      addIncorrectWords();
    }
    verifyGame();
  }
});
// to avoid spam we just added only 1 word to the incorrect words(if pressed more than once it will be not added twice)
const addIncorrectWords = () => {
  incorrectlyGuessedLetters.forEach((word) => {
    if (inc.innerHTML.includes(word)) return;
    inc.innerHTML += `${word} `;
  });
};
// if the counter is below 9(tries), user still have chances, so we simply remove the hangman element
const onFailAddElement = () => {
  if (counter < 9) {
    isPlaying = true;
    const item = document.querySelector(`#ite-${counter}`);

    item.classList.remove('hidden');
    counter++;
  } else {
    isPlaying = false;
  }
};
//replay button click
btn.addEventListener('click', () => {
  if (isPlaying) return;
  init();
  btn.classList.add('hidden');
  resetGame();
});

const verifyGame = () => {
  if (remainingWords.length === 0) {
    alert('you win!');
    isPlaying = false;
    btn.classList.remove('hidden');
  }

  if (counter > 8 && remainingWords.length - 1 !== 0) {
    alert('You lose!');
    isPlaying = false;
    btn.classList.remove('hidden');
  }
};

//we reset the game and different components
const resetGame = () => {
  // we remove the "inputs" divs that we added based on letter length
  while (wordContainer.firstChild) {
    wordContainer.removeChild(wordContainer.firstChild);
  }

  arm_left.classList.add('hidden');
  arm_right.classList.add('hidden');
  leg_left.classList.add('hidden');
  leg_right.classList.add('hidden');
  body.classList.add('hidden');
  hangerHook.classList.add('hidden');
  hangerStand.classList.add('hidden');
  head.classList.add('hidden');
  btn.classList.add('hidden');
  isPlaying = true;
  counter = 1;
  remainingWords = [];
  correctlyGuessedLetters = [];
  incorrectlyGuessedLetters = new Set();

  inc.innerHTML = '';
  init();
};
init();
