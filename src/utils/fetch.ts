export const fetchQuiz = async (categoryIndex: number, difficulty: string) => {
  // https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple

  const category = categoryIndex;

  const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
