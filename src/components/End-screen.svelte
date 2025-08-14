<script lang="ts">
  import Play from "./Play.svelte";

          let {handleGameState, score} = $props()

</script>

<main>
    <h1>End-screen</h1>
    <h2>You got {score}/10</h2>
    <button onclick={() => handleGameState("play")}>Play again</button>
</main>

<style></style>