import axios from 'axios';

export const getApiData = async () => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const res = await axios.get(`https://rickandmortyapi.com/api/character/${randomNumber}`);
  return res;
}