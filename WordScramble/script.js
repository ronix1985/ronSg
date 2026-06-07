let words = [

  {
    word: "dream",
    hint: "succession of images, ideas, emotions, and sensations"
  },
  
  {
    word: "menthor",
    hint: "experienced, trusted individual who provides guidance"
  },
  {
    word: "sacrifice",
    hint: "surrendering or giving up something"
  },
  
    {
    word: "philippines",
    hint: "a country that says 'pinamumugaran ng mga buwaya'"
  },
  {
    word: "addition",
    hint: "The process of adding numbers"
  },
  {
    word: "meeting",
    hint: "Event in which people come together"
  },
  {
    word: "number",
    hint: "Math symbol used for counting"
  },
  {
    word: "exchange",
    hint: "The act of trading"
  },
  {
    word: "canvas",
    hint: "Piece of fabric for oil painting"
  },
  {
    word: "garden",
    hint: "Space for planting flower and plant"
  },
  {
    word: "position",
    hint: "Location of someone or something"
  },
  {
    word: "feather",
    hint: "Hair like outer covering of bird"
  },
  {
    word: "comfort",
    hint: "A pleasant feeling of relaxation"
  },
  {
    word: "tongue",
    hint: "The muscular organ of mouth"
  },
  {
    word: "expansion",
    hint: "The process of increase or grow"
  },
  {
    word: "country",
    hint: "A politically identified region"
  },
  {
    word: "group",
    hint: "A number of objects or persons"
  },
  {
    word: "taste",
    hint: "Ability of tongue to detect flavour"
  },
  {
    word: "store",
    hint: "Large shop where goods are traded"
  },
  {
    word: "field",
    hint: "Area of land for farming activities"
  },
  {
    word: "friend",
    hint: "Person other than a family member"
  },
  {
    word: "pocket",
    hint: "A bag for carrying small items"
  },
  {
    word: "needle",
    hint: "A thin and sharp metal pin"
  },
  {
    word: "expert",
    hint: "Person with extensive knowledge"
  },
  {
    word: "statement",
    hint: "A declaration of something"
  },
  {
    word: "second",
    hint: "One-sixtieth of a minute"
  },
  {
    word: "library",
    hint: "Place containing collection of books"
  },
  {
    word: "ron",
    hint: "Your handsome editor of this game"
  },
   {
    word: "hazel",
    hint: "Ron's gorgeous woman"
  },
  {
    word: "blue",
    hint: "Hazel's favourite color"
  },
  {
    word: "computer",
    hint: "Electronic device that receives input(data)"
  }
];
const popup = document.getElementById('imagePopup');
const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    popup.style.display = 'flex';
  setTimeout(function() {
    popup.style.display = 'none';
}, 3000);
    alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};
initGame();

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return alert("Please enter the word to check!");
  if (userWord !== correctWord)
    return alert(`Oops! ${userWord} is not a correct word`);
  popup.style.display = 'flex';
  setTimeout(function() {
    popup.style.display = 'none';
}, 3000);
  alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
