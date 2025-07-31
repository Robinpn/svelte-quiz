<script lang="ts">
  import type { quizResult, categories } from "../utils/type";
  import { fetchQuiz } from "../utils/fetch";
  // Quiz api site: https://opentdb.com/api_config.php

  
let topic = $state("");


const topics = [
  {
    name: 'Sports',
    index: 21,
  },
  {
    name: 'History',
    index: 23,
  },
  {
    name: 'Animals',
    index: 27,
  },
  {
    name: 'Celebrities',
    index: 26,
  },
];

let difficulty = $state("");
let questions = $state<quizResult[]>([]);
let correctChoice = $state<string[]>([])
let shuffledAnswers = $state<string[][]>([]);
let gameTick = $state(0);
let highScore = $state(0)
let score = $state(0);
let showScore = $state(false);
let selectedAnswers = $state<string[]>([])

const findCategoryIndex = (array: Array<categories>, name: String) => {
  const found = array.find((item) => item.name === name);
  return found ? found.index : null;
};

// Fisher-Yates shuffle algorithm
 function shuffle(array: string[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


const handleClick = async () => {
 let category = findCategoryIndex(topics, topic); // update category based on current topic
  if (category !== null) {
    questions = await fetchQuiz(category, difficulty);
     // For each question, combine and shuffle answers
      shuffledAnswers = questions.map(q =>
        shuffle([q.correct_answer, ...q.incorrect_answers])
      );
      highScore = questions.length
  } else {
    questions = [];
    shuffledAnswers = [];
    alert("Please select a valid topic.");
  }
}



const compareAnswer = (questionIndex: number, answer: string) => {
  selectedAnswers[questionIndex] = answer

  if (questions[questionIndex].correct_answer === answer) {
      correctChoice.push(answer);
    } 
    gameTick++;

}


$effect(() => {
  $inspect("correct_answer: ", correctChoice)
    $inspect("gameTick: ", gameTick)
    if(gameTick === 10) {
      score = correctChoice.length;
      showScore = true
    }
})


</script>

<main>
 {#if showScore == true}
  <div>
    <h2>
      You got {score} / {highScore}
    </h2>
  </div>
 {/if}
<div>
  <h2>Get started by choosing a topic for the quiz</h2>
    <select name="topics" id="topics" bind:value={topic}>
      <option value="Sports">Sports</option>
      <option value="History">History</option>
      <option value="Animals">Animals</option>
      <option value="Celebrities">Celebrities</option>
    </select>

    <div>
      <p>Now chose the difficulty</p>
          <select name="topics" id="topics" bind:value={difficulty}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
    </select>
    </div>
</div>

<div>
  <button onclick={handleClick}>Start Quiz</button>
</div>

<section>
  <h2>Questions</h2>
  <div>
    {#if questions}
      {#each questions as question, i}
      <div class="question-contrainer">
        <h2>{@html question.question}</h2>
        <p>{question.difficulty}</p>
      
       <div class="answers">
         {#each shuffledAnswers[i] as answer}
         <button class="answer {selectedAnswers[i] === answer ? 'selected' : ''}  {selectedAnswers[i] && answer === questions[i].correct_answer ? 'correct' : ''}" onclick={() => compareAnswer(i, answer)}>{answer}</button>
         {/each}
        </div>
      </div>
      
      {/each}
    {/if}
  </div>
</section>
</main>

<style>
  .question-contrainer {
    border: 1px solid red;
  }

  .answers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .answer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 50px;
    color: black;
    background-color: bisque;
    border: 1px solid black;
    border-radius: 20px;
    margin: 1rem;
  }

  .answer:hover {
    cursor: pointer;
  }

  .selected {
    background-color: blue;
  }

  .correct {
    background-color: green;
    color: black;
  }
 
</style>
