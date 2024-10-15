<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { navigating } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import "../app.css";

  let currentComponent: any;
  let isTransitioning = false;
  let newPageMounted = false;
  
  const FADE_DURATION = 150; // Duration of fade transition in ms
  const MIN_TRANSITION_DURATION = 150; // Minimum duration of entire transition

  onMount(() => {
    currentComponent = document.querySelector('slot')?.assignedNodes()[0];

    return navigating.subscribe(async ($navigating) => {
      if ($navigating) {
        isTransitioning = true;
        newPageMounted = false;
        
        // Wait for the fade-to-white transition
        await new Promise(resolve => setTimeout(resolve, FADE_DURATION));
      }
    });
  });

  afterNavigate(() => {
    const transitionStartTime = Date.now();
    
    currentComponent = document.querySelector('slot')?.assignedNodes()[0];
    newPageMounted = true;
    
    tick().then(async () => {
      const elapsedTime = Date.now() - transitionStartTime;
      const remainingTime = Math.max(0, MIN_TRANSITION_DURATION - elapsedTime);
      
      // Ensure minimum transition duration
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      isTransitioning = false;
    });
  });
</script>

<div class="relative">
  {#if isTransitioning || !newPageMounted}
    <div class="fixed inset-0 bg-white z-50 transition-opacity ease-in-out"
         style="transition-duration: {FADE_DURATION}ms;"
         class:opacity-100={isTransitioning || !newPageMounted}
         class:opacity-0={!isTransitioning && newPageMounted} />
  {/if}
  
  <div class="transition-opacity ease-in-out"
       style="transition-duration: {FADE_DURATION}ms;"
       class:opacity-0={isTransitioning}
       class:opacity-100={!isTransitioning && newPageMounted}>
    <slot />
  </div>
</div>