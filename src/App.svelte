<script lang="ts">
  import type {GameState} from "./utils/type"
  import Play from "./components/Play.svelte";
  import Start from "./components/Start.svelte";
  import EndScreen from "./components/End-screen.svelte";
  import type { fromStore } from "svelte/store";

   let gameState = $state<GameState>("start")
    let score = $state(0)

    const handleScore = (newScore: number) => {
      score = newScore
    }

  const handleGameState = (newState: GameState) => {
    gameState = newState
  }

</script>

<main>
  {#if gameState === "start"}
        <Start handleGameState={handleGameState}/>
    {:else if gameState === "play"}
        <Play handleGameState={handleGameState} handleScore={handleScore}/>
    {:else if gameState === "end-screen"}
        <EndScreen handleGameState={handleGameState} score={score}/>
    {/if}
</main>


<style>
</style>
