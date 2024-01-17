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
  //resetGame();
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

// Écouteur d'événements pour détecter les touches du clavier
document.addEventListener('keydown', function (event) {

  // Vérifie si la touche pressée est une lettre de l'alphabet (a-z ou A-Z)
  if (event.key.length === 1 && event.key.match(/[a-z]/i)) {

    // Vérifie si la lettre pressée est présente dans le mot à deviner
    if (randomWordArray.includes(event.key)) {

      // Sélectionne tous les éléments avec la classe 'word' (représentant les lettres à deviner)
      const wordElements = document.querySelectorAll('.word');

      // Trouve l'index de la lettre correcte dans le mot à deviner
      const correctIndex = randomWordArray.indexOf(event.key);

      // Modifie le contenu de l'élément correspondant pour afficher la lettre correcte
      wordElements[correctIndex].textContent = event.key;

      // Vérifie si toutes les lettres ont été devinées
      const allLettersGuessed = wordElements.every(element => element.textContent !== '');
      
      // Si toutes les lettres ont été devinées, affiche un message de victoire
      if (allLettersGuessed) {
        isPlaying = false;
        alert('You Won!');
      }

    } else {
      // Si la lettre pressée n'est pas dans le mot à deviner, exécute une fonction pour gérer l'échec
      onFailAddElement();
    }
  }
});

// Initialise le jeu (non présent dans le code fourni, mais inclus dans le commentaire)
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
