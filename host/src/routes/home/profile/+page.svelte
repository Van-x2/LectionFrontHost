<script lang="ts">
    import { fade } from 'svelte/transition';
    import { page } from '$app/stores';
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

<div class="w-full flex-grow p-4">
{#key currentPage}
  <div transition:fade={{ duration: 300 }} class="relative w-full h-full">
    {#if currentPage === 'general'}
        <div class="w-full h-full flex flex-col absolute">

        <h1 class="text-[40px] font-medium mb-2 pl-3">General</h1>

        <p class="text-[17px] text-accent font-medium mb-6 pl-3">Manage basic details & preferences here</p>

        <div class="w-full flex-grow">
            <div class="w-full h-full">

                <div class="w-full h-full relative">

                    <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                    <div class="w-full h-[80px] flex relative">
        
                            <div class="w-[20%] h-full flex items-center pl-3">
                                <p class=" font-medium text-[19px]">First Name</p>
                            </div>
        
                            <div class="w-[71%] h-full pl-24 flex items-center">
                                <p class=" font-medium text-[19px]">{$page.data.session?.user?.name}</p>
                            </div>
        
                            <div class="w-[9%] h-full flex items-center justify-center">
                                <button class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                                    <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                                </button>
                            </div>
        
                    </div>
        
                    <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                    <div class="w-full h-[80px] flex relative">
        
                        <div class="w-[20%] h-full flex items-center pl-3">
                            <p class=" font-medium text-[19px]">Last Name</p>
                        </div>
    
                        <div class="w-[71%] h-full pl-24 flex items-center">
                            <p class=" font-medium text-[19px]">{$page.data.session?.user?.name}</p>
                        </div>
    
                        <div class="w-[9%] h-full flex items-center justify-center">
                            <button class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                                <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                            </button>
                        </div>
    
                    </div>

                    <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                    <div class="w-full h-[160px] flex relative">
        
                        <div class="w-[20%] h-full flex items-center pl-3">
                            <p class=" font-medium text-[19px]">Photo</p>
                        </div>
    
                        <div class="w-[71%] h-full pl-24 flex items-center">
                            <div class="w-[120px] aspect-square bg-neutral-400 rounded-[10px] border-[1px] border-gray1 flex justify-center items-center overflow-hidden">
                                <img alt="current profile" src={$page.data.session?.user?.image} />

                            </div>
                        </div>
    
                        <div class="w-[9%] h-full flex items-center justify-center">
                            <button class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                                <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                            </button>
                        </div>
    
                    </div>

                    


                </div>

            </div>
        </div>

        </div>
    {:else if currentPage === 'account'}
        <div class="w-full h-full flex flex-col absolute">

        <h1 class="text-[40px] font-medium mb-2 pl-3">Account</h1>

        <p class="text-[17px] text-accent font-medium mb-6 pl-3">Manage account details & preference here</p>

        <div class="w-full flex-grow">
            <div class="w-full h-full">
                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                <div class="w-full h-[80px] flex relative">

                    <div class="w-[20%] h-full flex items-center pl-3">
                        <p class=" font-medium text-[19px]">Email</p>
                    </div>

                    <div class="w-[71%] h-full pl-24 flex items-center">
                        <p class=" font-medium text-[19px]">{$page.data.session?.user?.email}</p>
                    </div>

                    <div class="w-[9%] h-full flex items-center justify-center">
                        <button class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                            <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                        </button>
                    </div>

                </div>

                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>
            </div>
        </div>
        </div>
    {:else if currentPage === 'billing'}
        <div class="w-full h-full flex flex-col absolute">

        <h1 class="text-[40px] font-medium mb-2 pl-3">Billing</h1>

        <p class="text-[17px] text-accent font-medium mb-6 pl-3">Manage billings details & preferences here</p>

        <div class="w-full flex-grow">
            <div class="w-full h-full">
                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                <div class="w-full h-[80px] flex relative">

                    <div class="w-[20%] h-full flex items-center pl-3">
                        <p class=" font-medium text-[19px]">First Name</p>
                    </div>

                    <div class="w-[71%] h-full pl-24 flex items-center">
                        <p class=" font-medium text-[19px]">{$page.data.session?.user?.name}</p>
                    </div>

                    <div class="w-[9%] h-full flex items-center justify-center">
                        <button class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                            <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                        </button>
                    </div>

                </div>

                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>
            </div>
        </div>
        </div>
    {/if}
  </div>
{/key}
</div>


</div>