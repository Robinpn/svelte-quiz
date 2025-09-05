<script lang="ts">
    import {Play} from '@lucide/svelte'
    let {handleGameState} = $props()

</script>

<main>
    <h1>Quiz</h1>
    <button class="play" onclick={() => handleGameState("play")}>Play! <Play /></button>
</main>


<style>
    .play {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        font-size: 1.1rem;
    }
</style>
