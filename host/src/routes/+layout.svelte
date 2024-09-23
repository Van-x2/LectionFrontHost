<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { navigating } from '$app/stores';
    import "../app.css";
  
    let currentComponent: any;
    let transitioningComponent;
    let isTransitioning = false;
  
    onMount(() => {
      // Set initial component
      currentComponent = document.querySelector('slot')?.assignedNodes()[0];
  
      return navigating.subscribe(async ($navigating) => {
        if ($navigating) {
          isTransitioning = true;
          transitioningComponent = currentComponent;
          
          // Wait for the transition duration
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // Update to the new component
          currentComponent = document.querySelector('slot')?.assignedNodes()[0];
          transitioningComponent = null;
          
          await tick();
          isTransitioning = false;
        }
      });
    });
  </script>
  
  <div class="relative">
    {#if isTransitioning}
      <div class="fixed inset-0 bg-white z-50 transition-opacity duration-700 ease-in-out opacity-100" />
    {/if}
    
    <div class="transition-opacity duration-300 ease-in-out" class:opacity-0={isTransitioning}>
      <slot />
    </div>
  </div>