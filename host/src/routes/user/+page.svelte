<script>
    import { onMount } from "svelte"
    import Signincard from "../../components/signincard.svelte"
    import Signupcard from "../../components/signupcard.svelte"
    import { page } from "$app/stores"
    import { fade } from "svelte/transition"
    import { browser } from "$app/environment"

    let signInCard
    let signUpCard
    let signInText
    let signUpText

    let pageState = 'signIn'

    if (browser) {
    const cookieState = document.cookie.replace(/(?:(?:^|.*;\s*)pageState\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieState) {
    pageState = cookieState;
    }
    }



    function switchPageState() {
    pageState = (pageState === 'signIn') ? 'signUp' : 'signIn';
    
    // Update cookie
    if (browser) {
        document.cookie = `pageState=${pageState};path=/;max-age=2592000`; // 30 days
    }
    }

    

    onMount(() => {
        signInCard = document.getElementById('signInCard')
        signUpCard = document.getElementById('signUpCard')
        signInText = document.getElementById('signInText')
        signUpText = document.getElementById('signUpText')
    })

    


</script>

<div class="w-screen h-screen p-[20px]">
    <div class="w-full h-full bg-white flex">

        <div class="w-[50%] h-full relative">
            <div class="w-full h-full absolute">
                <div class="w-full h-full relative">

                    <div class="w-[94%] h-[95%] absolute z-0 bg-gray1 bottom-0 right-0 rounded-[15px]">
                    </div>

                    <div class="w-[80px] h-[80px] rounded-br-[15px] bg-white absolute z-10">
                        <a href="/landing">
                            <div class="w-[85%] h-[85%] border-[3px] border-primary rounded-[15px] flex justify-center items-center">
                                <p class=" font-title text-[45px] text-primary">L</p>
                            </div>
                        </a>
                    </div>

                    <div class="w-full h-full absolute flex">
                        <div class="h-full w-[80px]"></div>
                        <div class="h-full flex-grow rounded-[15px] bg-gray1"></div>
                    </div>

                    <div class="w-full h-full relative">
                        <div class="w-full h-full absolute flex flex-col">
                            <div class="w-full h-[80px]"></div>
                            <div class="w-full flex-grow bg-gray1 rounded-[15px]"></div>
                        </div>
                    </div>
                    

                </div>

            </div>
            <div class="w-full h-full "></div>
        </div>

        <div class="w-[50%] h-full relative">
            <div class="w-full h-8 bottom-0 absolute pr-4">
                <div>

                    {#if pageState === 'signIn'}
                    <div id="signUpText" transition:fade="{{ duration: 100 }}"  class="w-full h-full absolute bg-white z-10">
                        <p class=" text-right text-darkgray font-poppins font-normal text-[15px]">
                            Don't have an account? 
                            <button on:click={switchPageState}>
                                <span class=" ml-2 text-black font-medium text-[16px] translate-x-2">
                                    Sign-up
                                </span>
                            </button>
                        </p>
                    </div>
                    {/if}

                    {#if pageState === 'signUp'}
                    <div id="signInText" transition:fade="{{ duration: 100 }}" class="w-full h-full absolute bg-white z-10">
                        <p class=" text-right text-darkgray font-poppins font-normal text-[15px]">
                            Already have an account? 
                            <button on:click={switchPageState}>
                                <span class=" ml-2 text-black font-medium text-[16px] translate-x-2">
                                    Sign-in
                                </span>
                            </button>
                        </p>
                    </div>
                    {/if}

                </div>
            </div>
            <div class="w-full h-full flex justify-center items-center relative">
                {#if pageState === 'signIn'}
                <div id="signInCard" transition:fade="{{ duration: 100 }}" class="absolute">
                    <Signincard/>
                </div>
                {/if}

                {#if pageState === 'signUp'}
                <div id="signUpCard" transition:fade="{{ duration: 100 }}" class="absolute">
                    <Signupcard/>
                </div>
                {/if}
            </div>
        </div>

    </div>
</div>