<script lang="ts">
    import { signOut } from '@auth/sveltekit/client';
    import { page } from '$app/stores'
    import { createEventDispatcher } from 'svelte';
    let email = ''
    let warning: any
    let verified: boolean = false
    let codeInput: any
    let codeSent = false
    let code: string

    const dispatch = createEventDispatcher()

    async function submitSetting() {
        const response = await fetch('/api/updateinfo',
            {
            method: 'POST',
            body: JSON.stringify({ prop: 'email', value: email.toLowerCase(), id: $page.data.session?.user?._id }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const responseBody = await response.json()

        setTimeout(() => {signOut()}, 200)
        
    }

    function sendCode() {
        if (validateEmail(email)) {
            emailDuplicateCheck(email)
        }
        else{
        warning.classList.remove('opacity-0')
        setTimeout(() => {warning.classList.add('opacity-0')},2000)
        }
    }

    async function emailDuplicateCheck(email: string) {
        const duplicateResponse = await fetch('/api/verify-email',
            {
            method: 'PATCH',
            body: JSON.stringify({ email: email}),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const duplicateCheck = await duplicateResponse.json()
        

        if (duplicateCheck.match == true) {
        console.log('email is already being used!')
        warning.textContent = 'Email already has an account'
            warning.classList.remove('opacity-0')
            setTimeout(() => {
                warning.classList.add('opacity-0')
                warning.textContent = 'Email address is invalid'
            },2000)
        }
        else {
        //switch the signup page to verification page
        codeInput.classList.remove('opacity-0')

        console.log('calling endpoint')
        const response = await fetch('/api/verify-email',
            {
            method: 'POST',
            body: JSON.stringify({ email: email, type: 'change' }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        codeSent = true
        }
    }


    async function checkCode(verificationCode: any) {

        const response = await fetch('/api/verify-email',
            {
            method: 'PUT',
            body: JSON.stringify({ email: email, code: code }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const responseBody = await response.json()

        if(responseBody.verified === true) {
            verified = true



        }
        else {
            console.log('code is invalid')
            warning.textContent = 'Code not recognized'
            warning.classList.remove('opacity-0')
            setTimeout(() => {
                warning.classList.add('opacity-0')
                warning.textContent = 'Email address is invalid'
            },2000)
        }

    }

    function validateEmail(email: string): boolean {
    const emailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/

    const isValid = emailRegex.test(email)
    
    return isValid
    }

</script>
<div class="w-full h-full absolute z-20 flex justify-center items-center">
    <div class="w-[700px] h-[400px] bg-white border-[3px] border-accent rounded-[20px] p-3">
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
                <p bind:this={warning} class="pl-1 text-red-800 font-poppins translate-y-1 text-[18px] font-medium my-2 mr-3 duration-100 opacity-0">Email address is invalid</p>
                {#if verified === false}
                <button disabled class="w-fit h-fit px-3 py-2 disabled:opacity-35 disabled:cursor-not-allowed bg-white rounded-[10px] border-[2px] border-secondary enabled:active:scale-95 transition-all duration-100">
                    <p class="text-[15px] font-medium text-nowrap">Change Email</p>
                </button>

                {:else}

                <button on:click={submitSetting} class="w-fit h-fit px-3 py-2 active:scale-95 transition-all duration-100 bg-white rounded-[10px] border-[2px] border-secondary pointer-events-auto">
                    <p class="text-[15px] font-medium text-nowrap">Change Email</p>
                </button>

                {/if}
            </div>

            <div class="w-full h-fit mb-6">
                <h1 class="text-[23px] font-medium font-poppins translate-y-[1px]">
                    Change your Email
                </h1>
                <p class="text-[16px] w-[90%] font-poppins font-medium text-accent mt-2">
                    To change your email, please use the code we send to your new email to verify that you have access to that email.
                </p>
            </div>

            <div class="w-full flex-1">

                <div>
                    <p class=" text-secondary text-[17px] font-poppins font-medium">
                        Please enter new email.
                    </p>
    
                    <div class="w-full py-2 px-2 mb-4">
                        <div class="w-full h-full flex items-center">
                            <input bind:value={email} type="text" class="mb-1 w-[60%] h-[43px] bg-gray1 pl-4 rounded-[10px] text-[18px] appearance-none border-non focus:outline-none" placeholder="Enter new email here"/>
                            <div class="h-[43px] w-[140px] ml-2">
                                {#if codeSent === false}
                                <button on:click={sendCode} class="w-full h-full rounded-[10px] bg-primary text-white font-poppins -translate-y-[2px] active:scale-95 transition duration-100">
                                    <p class="font-poppins translate-y-[2px]"> Send Code </p>
                                </button>
                                {:else}
                                <button disabled on:click={sendCode} class="w-full h-full rounded-[10px] bg-primary text-white font-poppins -translate-y-[2px] transition duration-100">
                                    <p class="font-poppins translate-y-[2px]"> Code Sent </p>
                                </button>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>

                <div bind:this={codeInput} class=" opacity-0 duration-300">
                    <p class=" text-secondary text-[17px] font-poppins font-medium">
                        Enter the code you received below.
                    </p>
    
                    <div class="w-full py-2 px-2">
                        <div class="w-full h-full flex items-center">
                            <input bind:value={code} type="text" class="mb-1 w-[60%] h-[43px] bg-gray1 pl-4 rounded-[10px] text-[18px] appearance-none border-non focus:outline-none" placeholder="Enter code here"/>
                            <button on:click={checkCode} class="h-[43px] w-[140px] ml-2 rounded-[10px] bg-primary text-white font-poppins -translate-y-[2px] active:scale-95 transition duration-100">
                                <p class="font-poppins translate-y-[2px]"> Check Code </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>