import './style.css';

const addScoreBtn = document.querySelector('#add_score');
const userInput = document.querySelector('#user_input');
const scoreInput = document.querySelector('#score_input');
const userList = document.querySelector('.user_list');

const baseUrl =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const game = {
  name: 'tower books',
  gameId: 'CLwRs3Mgq5HE7kyDdKH0',
};

const postNewScore = async (obj) => {
  const endpoint = `${baseUrl}/games/${game.gameId}/scores`;
  const requestInit = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  };

  const response = await fetch(endpoint, requestInit);
  const { result: newScore } = await response.json();

  return newScore;
};

const getAllScores = async () => {
  const endpoint = `${baseUrl}/games/${game.gameId}/scores`;

  const response = await fetch(endpoint);
  const { result: scores } = await response.json();

  return scores;
};

const createScoreElement = (user, score) => {
  const li = document.createElement('li');
  li.classList.add('user');

  li.innerHTML = `
              <span class="user__name">${user}</span>
              <span class="user__score">${score}<span>
  `;

  return li;
};

addScoreBtn.addEventListener('click', () => {
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
});
