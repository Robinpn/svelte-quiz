<script lang="ts">

    let {onStart} = $props()

</script>

<main>
    <h1>Quiz</h1>
    <button class="play" onclick={onStart}>Play!</button>
</main>


<style>
   .play {
    background-color: yellow;
    color: black;
    padding: 20px 100px;
    border-radius: 20px;
   }
</style>
