<script lang="ts">
  import type { quizResponse, quizResult, categories } from "./utils/type";
  import { fetchQuiz } from "./utils/fetch";
  // Quiz api site: https://opentdb.com/api_config.php

  
let topic = '';

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

const findCategoryIndex = (array: Array<categories>, name: String) => {
  const found = array.find((item) => item.name === name);
  return found ? found.index : null;
};

let difficulty = '';
let questions: quizResult[] = [];

const handleClick = async () => {
  console.log("ran");
 let category = findCategoryIndex(topics, topic); // update category based on current topic
  if (category !== null) {
    questions = await fetchQuiz(category, difficulty);
  } else {
    questions = [];
    alert("Please select a valid topic.");
  }
}
</script>

<main>
<h1>Quiz app!</h1>
 
<div>
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
  <button onclick={handleClick}>Start Quiz</button>
</div>

<section>
  <h2>Questions</h2>
  <div>
    {#if questions}
      {#each questions as question}
      <div class="question-contrainer">
        <h2>{@html question.question}</h2>
        <p>{question.difficulty}</p>
      
       <div class="answers">

         {#each question.incorrect_answers as answer}
         <button class="answer" onclick={() => {console.log("clicked: ", answer )}}>{answer}</button>
         {/each}
        </div>
        <p class="correct">{question.correct_answer}</p>
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

  .correct {
    background-color: green;
  }
 
</style>
