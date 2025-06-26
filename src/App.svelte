<script lang="ts">

  // Quiz api site: https://opentdb.com/api_config.php

  interface topics {
    name: string,
    index: number
  }

  let topic = "";

  const topics = [
    {
      name: "Sports",
      index: 21
    },
    {
      name: "History",
      index: 23
    },
    {
      name: "Animals",
      index: 27
    },
    {
      name: "Celebrities",
      index: 26
    }
  ]

  const findCategoryIndex = (array: Array<topics>, name: String) => {
    const found = array.find(item => item.name === name)
    return found ? found.index : null
  }

  
  
  
  let difficulty = "";
  
  const fetchQuiz = () => {
    // https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple
    
    const category = findCategoryIndex(topics, topic)
  
    
  console.log(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
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
  <button onclick={fetchQuiz}>Start Quiz</button>
</div>

</main>

<style>
 
</style>
