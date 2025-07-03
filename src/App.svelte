<script lang="ts">
  import type {GameState} from "./utils/type"
  import Play from "./components/Play.svelte";
  import Start from "./components/Start.svelte";
  import EndScreen from "./components/End-screen.svelte";

   let gameState = $state<GameState>("start")


  const startGame = () => {
    gameState = "play"
    console.log(gameState)
  }

</script>

<main>
  {#if gameState === "start"}
      <Start onStart={startGame}/>
    {/if
  }
  {#if gameState === "play"}
    <Play />
  {/if}

  {#if gameState === "end-screen"}
    <EndScreen />
  {/if}
</main>


<style>
</style>
