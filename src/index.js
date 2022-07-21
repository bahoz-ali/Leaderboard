import { getAllScores, postNewScore } from './service';
import './style.css';

const addScoreBtn = document.querySelector('#add_score');
const userInput = document.querySelector('#user_input');
const scoreInput = document.querySelector('#score_input');
const userList = document.querySelector('.user_list');
const refreshBtn = document.querySelector('#refresh');

const createScoreElement = (user, score) => {
  const li = document.createElement('li');
  li.classList.add('user');

  li.innerHTML = `
              <span class="user__name">${user}</span>
              <span class="user__score">${score}<span>
  `;

  return li;
};


const saveScore =  () => {
  const user = userInput.value ? userInput.value.trim() : null;
  const score = scoreInput.value ? scoreInput.value.trim() : null;

  if (!user || !score) return;

  const data = {
    user,
    score,
  };

  const li = createScoreElement(user, score);
  if (li) userList.appendChild(li);

  postNewScore(data);

  userInput.value = '';
  scoreInput.value = '';
}


const displayAllScores = async () => {
  const scores = await getAllScores();
  if (!scores) return;

  userList.innerHTML = '';
  
  scores.forEach(({ user, score }) => {
    if (typeof user === 'string' || typeof score === 'number') {
      const li = createScoreElement(user, score);

      userList.appendChild(li);
    }
  });
};


document.addEventListener('DOMContentLoaded', () => {
  displayAllScores();
});

refreshBtn.addEventListener('click', displayAllScores);
addScoreBtn.addEventListener('click', saveScore);

scoreInput.addEventListener("keyup", (event) => {
  event.preventDefault();

    if (event.key === "Enter") {
     saveScore();
    }
})
