<script lang="ts">
    let backgroundSpacer: Element
    let currentPage: string = 'general'

    /**
   * @param {number} pageNumber
   */
    function changePage (pageNumber: number) {
        if (pageNumber == 1) {
            backgroundSpacer.className = ""
            backgroundSpacer.classList.add("h-full", "w-0", "transition-all", "ease-in-out", "duration-200")
            currentPage = 'general'
        }

        if (pageNumber == 2) {
            backgroundSpacer.className = ""
            backgroundSpacer.classList.add("h-full", "w-1/3", "p-2", "transition-all", "ease-in-out", "duration-200")
            currentPage = 'account'
        }

        if (pageNumber == 3) {
            backgroundSpacer.className = ""
            backgroundSpacer.classList.add("h-full", "w-2/3", "p-2", "transition-all", "ease-in-out", "duration-200")
            currentPage = 'billing'
        }

    }
</script>

<div id="parentPage" class="w-full h-full  overflow-hidden font-poppins flex flex-col">
<div>
    <div class="w-full h-[107px]">
    </div>
    
    <div class="w-full h-[65px] pl-4">
        <div class="w-[380px] h-full rounded-[15px] border-2 border-accent flex relative">
    
            <div class="w-full h-full flex absolute z-10">
    
                <div class="w-1/3 h-full p-2">
                    <div class="w-full h-full rounded-[15px]">
                        <div class="w-full h-full flex items-center justify-center">
                            <button on:click={() => {changePage(1)}}>
                                <p class=" translate-y-[1px] font-medium text-darkgray">
                                    General
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
        
                <div class="w-1/3 h-full p-2">
                    <div class="w-full h-full rounded-[15px]">
                        <div class="w-full h-full flex items-center justify-center">
                            <button on:click={() => {changePage(2)}}>
                                <p class=" translate-y-[1px] font-medium text-darkgray">
                                    Account
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
        
                <div class="w-1/3 h-full p-2">
                    <div class="w-full h-full rounded-[15px]">
                        <div class="w-full h-full flex items-center justify-center">
                            <button on:click={() => {changePage(3)}}>
                                <p class=" translate-y-[1px] font-medium text-darkgray">
                                    Billing
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
    
            </div>
    
            <div class="w-full h-full flex absolute z-0">
    
                <div class="h-full w-0 transition-all ease-in-out duration-200" bind:this={backgroundSpacer}>
                </div>
    
                <div class="w-1/3 h-full p-2 transition-all ease-in-out duration-150">
                    <div class="w-full h-full rounded-[15px] bg-gray2">
                    </div>
                </div>
    
            </div>
    
    
    
        </div>
    </div>
</div>
<div class="w-full flex-grow p-6">
    {#if currentPage == 'general'}
    General Settings Page
    {/if}

    {#if currentPage == 'account'}
    Account Settings Page
    {/if}

    {#if currentPage == 'billing'}
    Billing Settings Page
    {/if}

</div>


</div>