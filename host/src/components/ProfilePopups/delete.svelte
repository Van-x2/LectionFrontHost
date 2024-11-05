<script lang="ts">
    import { signOut } from '@auth/sveltekit/client';
    import { page } from '$app/stores'
    import { createEventDispatcher } from 'svelte';
    let phrase: string = ''
    let code: string

    const dispatch = createEventDispatcher()

    async function deleteAccount() {
        console.log('this will delete the account')
        const response = await fetch('/api/deleteaccount',
            {
            method: 'POST',
            body: JSON.stringify({ id: $page.data.session?.user?._id }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        signOut()
    }

</script>
<div class="w-full h-full absolute z-20 flex justify-center items-center">
    <div class="w-[700px] h-[350px] bg-white border-[3px] border-accent rounded-[20px] p-3">
        <div class="w-full h-full relative flex flex-col">

            <div class="w-full h-fit z-20 absolute flex justify-end items-start">
                <div class="w-8 h-8">
                    <button on:click={() => {dispatch('closePopup')}} class="w-full h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="w-full h-full z-20 absolute flex items-end justify-end pointer-events-none">
                {#if phrase === `I consent to deleting the account accosiated with ${$page.data.session?.user?.email}`}

                <button on:click={deleteAccount} class="w-fit h-fit px-3 py-2 active:scale-95 transition-all duration-100 bg-white rounded-[10px] border-[2px] border-secondary pointer-events-auto">
                    <p class="text-[15px] font-medium text-nowrap">Delete Account</p>
                </button>

                {:else}

                <button disabled class="w-fit h-fit px-3 py-2 disabled:opacity-35 disabled:cursor-not-allowed bg-white rounded-[10px] border-[2px] border-secondary enabled:active:scale-95 transition-all duration-100">
                    <p class="text-[15px] font-medium text-nowrap">Delete Account</p>
                </button>

                {/if}
            </div>

            <div class="w-full h-fit mb-6">
                <h1 class="text-[23px] font-medium font-poppins translate-y-[1px]">
                    Delete your Lection account
                </h1>
                <p class="text-[16px] w-[90%] font-poppins font-medium text-accent mt-2">
                    Deleting your account will cancle all active subscriptions, delete all of your past lectionaries, and clear all account data from our system. This is an irreversable action.
                </p>
            </div>

            <div class="w-full flex-1">

                <div>
                    <p class=" text-secondary text-[15px] font-poppins font-medium">
                        Please enter the phrase: 
                        <br>
                        "I consent to deleting the account accosiated with {$page.data.session?.user?.email}"
                    </p>
    
                    <div class="w-full py-2 px-2 mb-4">
                        <div class="w-full h-full flex items-center">
                            <input bind:value={phrase} type="text" class="mb-1 w-[60%] h-[43px] bg-gray1 pl-4 pr-2 rounded-[10px] text-[15px] appearance-none border-non focus:outline-none" placeholder="Enter new email here"/>
                            <div class="h-[43px] w-[43px] ml-2 rounded-[10px] bg-primary -translate-y-[2px] flex justify-center items-center">

                                {#if phrase === `I consent to deleting the account accosiated with ${$page.data.session?.user?.email}`}

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" stroke-white scale-[70%]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                {:else}

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" stroke-white scale-[70%]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>

                                {/if}
                                  
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>

    </div>
</div>