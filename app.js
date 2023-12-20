const arm_left = document.querySelector('.arm_left');
const arm_right = document.querySelector('.arm_right');
const leg_left = document.querySelector('.leg_left');
const leg_right = document.querySelector('.leg_right');
const body = document.querySelector('.body');
const head = document.querySelector('.head');
const hangerStand = document.querySelector('.hangerStand');
const hangerHook = document.querySelector('.hangerHook');
const btn = document.querySelector('#btn');
const hangerContainer = document.querySelector('.hangerContainer');
let counter = 1;
let isPlaying = false;

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
  //   resetGame();
  addInput();
};
let randomWord;
let randomWordArray = [];
const addInput = () => {
  randomWord = words[Math.floor(Math.random() * words.length)];
  randomWordArray = randomWord.split('');

  console.log(randomWord);
  let inputLength = randomWord.length;
  for (let i = 0; i < inputLength; i++) {
    const item = document.createElement('div');
    item.classList.add(`word`);
    item.setAttribute('id', `ite-${i}`);
    document.querySelector('.wordContainer').appendChild(item);
  }
};

document.addEventListener('keydown', function (event) {
  if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
    if (randomWordArray.includes(event.key)) {
      //Hedhy(index) blasa  mtaa l'element, juste khdodh children mtaa wordContainer,  w hot letter fi l'index
      let index = randomWordArray.indexOf(event.key);
    } else {
      onFailAddElement();
    }
  }
});
init();

const onFailAddElement = () => {
  if (counter < 9) {
    isPlaying = true;
    const item = document.querySelector(`#ite-${counter}`);

    item.classList.remove('hidden');
    counter++;
    console.log(counter);
  } else {
    isPlaying = false;
    btn.disabled = true;
    alert('You Lost!');
  }
};

const resetGame = () => {
  arm_left.classList.add('hidden');
  arm_right.classList.add('hidden');
  leg_left.classList.add('hidden');
  leg_right.classList.add('hidden');
  body.classList.add('hidden');
  hangerHook.classList.add('hidden');
  hangerStand.classList.add('hidden');
  head.classList.add('hidden');
  counter = 1;
};
