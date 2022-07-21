import { baseUrl, game } from './variables';

export const postNewScore = async (obj) => {
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

export const getAllScores = async () => {
  const endpoint = `${baseUrl}/games/${game.gameId}/scores`;

  const response = await fetch(endpoint);
  const { result: scores } = await response.json();

  return scores;
};
