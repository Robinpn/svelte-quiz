export interface categories {
  name: string;
  index: number;
}

export interface quizResponse {
  responseCode: number;
  results: Array<quizResult>;
}

export interface quizResult {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
