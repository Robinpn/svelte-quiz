<script lang="ts">
  import type { quizResult, categories } from "../utils/type";
  import { fetchQuiz } from "../utils/fetch";
  // Quiz api site: https://opentdb.com/api_config.php

      let {handleGameState, handleScore} = $props()
  
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

const findCategoryIndex = (array: Array<categories>, name: string) => {
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
      handleScore(correctChoice.length)
      showScore = true
      setTimeout(() => {
        handleGameState('end-screen')
      },500)
    }
})


</script>

<main>
  {#if questions.length > 1}
  <div></div>
  {:else}
  <div class="select-container">
<p>Get started by choosing a topic for the quiz</p>
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
  <button class="start-button" onclick={handleClick}>Start Quiz</button>
</div>
  {/if}

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
.select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

}

.start-button {
  margin-top: 1rem;
}

  .question-contrainer {
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 10px 10px;
    margin: 1rem;
    width: 25rem;
    box-shadow: 0px 0px 5px black;
    padding: 0.5rem;
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
    min-width: 150px;
    min-height: 50px;
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

  @media only screen and (max-width: 600px) {
    .select-container select {
      width: 100px;
      height: 30px;
      font-size: 0.9rem;
    }
    .question-contrainer {
      max-width: 18rem;
      margin: 1rem, 0.5rem;
    }
  }
 
</style>
