import type { quizResponse, quizResult, categories } from '../utils/type';

// let topic = '';

// const topics = [
//   {
//     name: 'Sports',
//     index: 21,
//   },
//   {
//     name: 'History',
//     index: 23,
//   },
//   {
//     name: 'Animals',
//     index: 27,
//   },
//   {
//     name: 'Celebrities',
//     index: 26,
//   },
// ];

// const findCategoryIndex = (array: Array<categories>, name: String) => {
//   const found = array.find((item) => item.name === name);
//   return found ? found.index : null;
// };

// let difficulty = '';
// let questions: quizResult[] = [];

export const fetchQuiz = async (categoryIndex: number, difficulty: string) => {
  // https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple

  //   const category = findCategoryIndex(topics, topic);
  const category = categoryIndex;

  // console.log(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)

  const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json)
    // questions = json.results;

    return json.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
