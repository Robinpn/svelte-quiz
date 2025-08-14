<script lang="ts">

    let {handleGameState} = $props()

</script>

<main>
    <h1>Quiz</h1>
    <button class="play" onclick={() => handleGameState("play")}>Play!</button>
</main>


<style>
   .play {
    background-color: yellow;
    color: black;
    padding: 20px 100px;
    border-radius: 20px;
   }
</style>
