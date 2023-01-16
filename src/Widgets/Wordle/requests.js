import { fetchWrapper } from "../../helpers";

export const setRandomWord = async ({ wordLength = 5 }) => {
  return await fetchWrapper({
    url: `wordle/set-word?wordLength=${wordLength}`,
  });
};

export const checkWord = async ({ word }) => {
  return await fetchWrapper({
    url: `wordle/check-word?word=${word}`,
  });
};
