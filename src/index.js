import './style.css';

const addScoreBtn = document.querySelector('add_score');
const userInput = document.querySelector('user_input');
const scoreInput = document.querySelector('score_input');

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

