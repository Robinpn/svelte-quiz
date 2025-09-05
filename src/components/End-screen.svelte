<script lang="ts">
  import Play from "./Play.svelte";
  import {Trophy} from '@lucide/svelte' 

          let {handleGameState, score} = $props()

</script>

<main>
    <h1> Game over</h1>
    <div class="score-container">
        <h2>You got {score}/10</h2>
        <Trophy color="gold" size={50} strokeWidth={2}/>
    </div>
    <button onclick={() => handleGameState("play")}>Play again</button>
    
</main>

<style>
    .score-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
    }
</style>