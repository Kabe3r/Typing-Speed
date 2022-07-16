const paragraphs = [
      "She tried to explain that love wasn't like pie There was not a set number of slices to be given out There was not less to be given to one person if you wanted to give more to another That after a set amount was given out it would all disappear She tried to explain this but it fell on deaf ears",
      "My visit to a slum area after the rainy season was a sad affair The pits were still full of rain water There was mud all around The polluted water had caused various diseases There was no home without a sick person Small children suffered from stomach troubles The government should immediately rush to the help of the sufferers in the slum area",
      "In ancient times the legs could be said to resemble stroppy vegetables We can assume that any instance of a centimeter can be construed as an enate paste One cannot separate pairs from astute managers Those americas are nothing more than fish If this was somewhat unclear authors often misinterpret the gosling as an unfelt banjo when in actuality it feels more like a professed galley A bow of the squirrel is assumed",
      "What we do not know for sure is whether or not a pig of the coast is assumed to be a hardback pilot The literature would have us believe that a dusky clave is not but an objective Few can name a limbate leo that is not a sunlit silver The bow is a mitten However the drawer is a bay If this was somewhat unclear few can name a paunchy blue that isn't a conoid bow The undrunk railway reveals itself as a downstage bamboo to those who look",
      "Their politician was in this moment a notour paperback The first armless grouse is in its own way a gear The coat is a wash However a cake is the llama of a caravan Snakelike armies show us how playgrounds can be viscoses Framed in a different way they were lost without the fatal dogsled that composed their waitress Far from the truth the cockney freezer reveals itself as a wiggly tornado to those who look The first hawklike sack",
      "An aunt is a bassoon from the right perspective As far as we can estimate some posit the melic myanmar to be less than kutcha One cannot separate foods from blowzy bows The scampish closet reveals itself as a sclerous llama to those who look A hip is the skirt of a peak. Some hempy laundries are thought of simply as orchids A gum is a trumpet from the right perspective A freebie flight is a wrench of the mind. Some posit the croupy",
      "A baby is a shingle from the right perspective Before defenses collars were only operations Bails are gleesome relatives An alloy is a streetcars debt A fighter of the scarecrow is assumed to be a leisured laundry A stamp can hardly be considered a peddling payment without also being a crocodile A skill is a meteorology fan Their scent was in this moment a hidden feeling The competitor of a bacon becomes a boxlike cougar",
      "A broadband jam is a network of the mind One cannot separate chickens from glowing periods A production is a faucet from the right perspective The lines could be said to resemble zincoid females A deborah is a tractor whale Cod are elite japans Some posit the wiglike norwegian to be less than plashy A pennoned windchime burst comes with it the thought that the printed trombone is a supply Relations are restless tests"];

const timer = document.querySelector(".timer");
const accuracy = document.querySelector("#accuracy .value strong");
const keyTyped = document.querySelector("#keyStrokes .value .type");
const keysCorrect = document.querySelector("#keyStrokes .value .correct");
const keysWrong = document.querySelector("#keyStrokes .value .wrong");
const correct = document.querySelector("#correct-words .value strong");
const wrong = document.querySelector("#wrong-words .value strong");
const wpm = document.querySelector("#wpm strong");
const textEl = document.getElementById("text-el");
const inputEl = document.querySelector(".input-el");
const restart = document.querySelector("button");
const table = document.querySelector(".table-items");
let startTime = 60;
let timeSpent = 0;
let totalErrors = 0;
let type = 0;
let input = inputEl.value;
let currentLetter = "";
let error = 0;
let timeEl = null;

const randomText = Math.floor(Math.random() * paragraphs.length);

restart.addEventListener('click', function() {
      reset();
});

function countDown() {
      if (startTime > 0) {
            startTime--;
            timeSpent++;
            timer.textContent = startTime;
      } else {
            endGame();
      }
}

function inputText() {
      input = inputEl.value;
      inputArr = input.split('');
      type++;
      error = 0;
      textArray = textEl.querySelectorAll('span');
      textArray.forEach((word, index) => {
            let type = inputArr[index];
            if (type == null) {
                  word.classList.remove('valid');
                  word.classList.remove('invalid');
            } 
            else if (type === word.innerText) {
                  word.classList.add('valid');
            }
            else {
                  word.classList.add('invalid');
                  error++;
            }     
      });
      
      keyTyped.textContent = type;
      keysWrong.textContent = totalErrors + error;
      let correctChars = (type - (totalErrors + error));
      keysCorrect.textContent = correctChars;
      let accurate = ((correctChars / type) * 100);
      accuracy.textContent = Math.round(accurate)+"%";
      
      if (input.length === currentLetter.length) {
            checkLetters();
            totalErrors += error;
            inputEl.value = "";
      }
}

function checkLetters() {
      textEl.textContent = null;
      currentLetter = paragraphs[randomText];
      currentLetter.split('').forEach(letter => {
            console.log(letter)
            const letters = document.createElement('span');
            letters.innerText = letter;
            textEl.appendChild(letters);
      });
}

function endGame() {
      clearInterval(timeEl);
      textEl.style.display = "none";
      inputEl.disabled = true;
      let wordPerMinute = Math.round((((type / 5) / timeSpent) * 60));
      wpm.innerHTML = wordPerMinute + ' WPM';
      table.style.display = "block";
      correct.textContent = correctWords(textEl.innerText, input);
      let totalWords = input.split(" ");
      wrong.textContent = totalWords.length - correct.innerText;
}

function correctWords(strOne, strTwo) {
      let wordsOne = strOne.split(" ");
      let wordsTwo = strTwo.split(" ");
      let count = 0;
      wordsOne.forEach((item, index) => {
            if(item == wordsTwo[index]) {
                  count++;
            }
      });
      return count;
}

function startGame() {
      clearInterval(timeEl);
      checkLetters();
      textEl.style.display = "block";
      timeEl = setInterval(countDown, 1000);
}

function reset() {
      startTime = 60;
      timeSpent = 0;
      error = 0;
      totalErrors = 0;
      type = 0;
      inputEl.disabled = false;
      inputEl.value = "";
      textEl.textContent = paragraphs[randomText];
      textEl.style.display = "block";
      table.style.display = "none";
      timer.textContent = startTime;
}