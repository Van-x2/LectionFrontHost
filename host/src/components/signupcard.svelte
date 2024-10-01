<script lang="ts">
    import { page } from "$app/stores";
    import { signIn, signOut } from "@auth/sveltekit/client";
    import { redirect } from "@sveltejs/kit";
    import { onMount } from "svelte";
    let type = 'signup'
    let passwordShown = false
    let passwordInputField:any
    let email: string = ''
    let password: string = ''
    let verificationCode: string = ''
    let name: string = ''

    //HTML elements
    let emailIcon: any
    let passwordIcon: any
    let emailWarning: any
    let passwordWarning: any
    let nameWarning: any
    let nameIcon: any
    let continueButton: any
    let verificationWarning: any

    let isVerifying = false
    let isDuplicateEmail = false


    onMount(() => {
    passwordInputField = document.getElementById('passwordInputField')
    emailIcon = document.getElementById('emailIcon')
    passwordIcon = document.getElementById('passwordIcon')
    emailWarning = document.getElementById('emailWarning')
    passwordWarning = document.getElementById('passwordWarning')
    nameWarning = document.getElementById('nameWarning')
    nameIcon = document.getElementById('nameIcon')
    continueButton = document.getElementById('continueButton')


    


    //Simulates clicking the continue btn when enter is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') { continueButton.click() }
    })

    })

    function passwordShownToggle() {
        if(passwordShown == false) {
            passwordInputField.type = 'text'
            passwordShown = true
        }
        else {
            passwordInputField.type = 'password'
            passwordShown = false
        }
    }

    async function handleSignupFirst() {

        const pwCheck = (password.length > 0)
        const nameCheck = (name.length > 0)
        const emailCheck = validateEmail(email)

       if(pwCheck == false) {
        passwordWarning.classList.add('opacity-100')
        passwordIcon.classList.add('fill-red-700')
        setTimeout(() => {
            passwordWarning.classList.remove('opacity-100')
            passwordIcon.classList.remove('fill-red-700') 
        }, 2000)
       }
       if (emailCheck == false) {
        emailWarning.classList.add('opacity-100')
        emailIcon.classList.add('fill-red-700')
        setTimeout(() => {
            emailWarning.classList.remove('opacity-100')
            emailIcon.classList.remove('fill-red-700') 
        }, 2000)
       }
       if (nameCheck == false) {
        nameWarning.classList.add('opacity-100')
        nameIcon.classList.add('fill-red-700')
        setTimeout(() => {
            nameWarning.classList.remove('opacity-100')
            nameIcon.classList.remove('fill-red-700') 
        }, 2000)
       }
       if ((emailCheck == true) && (pwCheck == true) && (nameCheck == true)) {

        const response1 = await fetch('/api/verify-email',
            {
            method: 'PATCH',
            body: JSON.stringify({ email: email}),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const responseBody = await response1.json()

        if (responseBody.match == true) {
        isDuplicateEmail = true
       }
       else {
                //switch the signup page to verification page
        isVerifying = true

        console.log('calling endpoint')
        const response = await fetch('/api/verify-email',
            {
            method: 'POST',
            body: JSON.stringify({ email: email }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
       }



       }

    }

    async function handleSignupSecond() {
        const response = await fetch('/api/verify-email',
            {
            method: 'PUT',
            body: JSON.stringify({ email: email, code: verificationCode }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const responseBody = await response.json()
        console.log(responseBody)

        if (responseBody.verified === true) {
            handleSignupFinal()
        }
        else{
            //The code entered is incorrect
            console.log('verification failed')
            verificationWarning.classList.add('opacity-100')
            setTimeout(() => {
                verificationWarning.classList.remove('opacity-100')
            },2000)
        }
    }

    async function handleSignupFinal() {
        //formats name
        name = name.split(' ')[0].replace(/\s/g, '').toLowerCase()

        const res:any = await signIn(
            "credentials", 
            {
                email,
                password,
                name,
                type,
                redirect: true
            }
        )
    }

    function validateEmail(email: string): boolean {
    const emailRegex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/

    const isValid = emailRegex.test(email)
    
    return isValid
    }


</script>
<div class=" w-[480px] h-fit bg-white">

    {#if (isVerifying == true)}

    <div class="w-full h-[90px] flex items-center">
        <h1 class="text-[58px] font-normal font-semibold text-primary">Verification</h1>
    </div>
    <div class="w-full flex justify-center items-center px-2 my-[20px]">
        <div class="w-full h-[2px] bg-gray2 rounded-full">

        </div>
    </div>

    <div class="w-full h-[25px] flex items-center pb-2 my-8">
        <p class=" font-poppins text-[15px] text-darkgray leading-[30px]">A verification code has been sent to: <span class="text-accent font-bold text-[12px]">{email}</span>, <br> enter the code below to continue signing up </p>
    </div>

    <div class="w-full h-fit px-2">

        <div class="w-full h-[59px] py-[6px] flex relative items-center group">

            <div class="h-[75%] aspect-square absolute translate-x-1 flex justify-center items-center">

                <svg id="emailIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[55%] aspect-square fill-darkgray group-focus-within:fill-primary">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                
            </div>
            <input spellcheck="false" type="text" bind:value={verificationCode} class="font-normal text-[17px] text-darkgray flex-grow h-full rounded-[12px] bg-gray1 focus:bg-gray2 focus:text-primary border-2 border-transparent  p-2 appearance-none outline-none focus:ring-0 duration-200 pl-[50px]">
        </div>


        <div class="w-full h-[59px] py-[6px]">
                <button class="w-full h-full rounded-full bg-secondary active:scale-[97%] duration-100" on:click={handleSignupSecond}>
                    <p class="text-[16px] font-poppins font-semibold text-white translate-y-1">Continue</p>
                </button>
        </div>


        <div class="w-full h-[25px] flex items-center pb-2 my-8">
            <p class=" font-poppins text-[15px] text-darkgray">Didn't get a code? check your junk folder, or <button class=" font-bold" on:click={handleSignupFirst}>get another code</button></p>
        </div>


        <div bind:this={verificationWarning} class="w-full h-[59px] py-[6px] flex items-center justify-center opacity-0 duration-100">
            <p class="font-poppins font-semibold text-[17px] text-red-700">
                Code is not recognized
            </p>
        </div>

    </div>
    {:else}

    <div class="w-full h-[90px] flex items-center">
        <h1 class="text-[58px] font-normal font-semibold text-primary">Sign-up</h1>
    </div>
    <div class="w-full h-[45px] flex items-center">
        <p class=" font-poppins text-[15px] text-darkgray">Sign up with Open account</p>
    </div>
    <div class="w-full h-[50px] flex">
        <div class="w-1/2 h-full px-[7px] py-[2px]">
            <button on:click={() => {signIn('google')}} class="w-full h-full border-[2px] border-gray2 rounded-[10px] active:scale-[103%] transition duration-100 active:border-secondary flex justify-center items-center relative">
                <div class="w-full h-[90%] flex items-center px-2 absolute">
                    <img class=" w-[25px] mr-2" alt="Google logo" src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png" />
                </div>
                <div class="w-fit h-[90%] flex items-center px-2">
                    <p class="text-[18px] text-neutral-500 font-poppins font-medium translate-y-[1px]">Google</p>
                </div>
            </button>
        </div>

        <div class="w-1/2 h-full px-[7px] py-[2px]">
            <button on:click={() => {signIn('microsoft-entra-id')}} class="w-full h-full border-[2px] border-gray2 rounded-[10px] active:scale-[103%] transition duration-100 active:border-secondary flex justify-center items-center relative">
                <div class="w-full h-[90%] flex items-center px-2 absolute">
                    <img class=" w-[23px] mr-2" alt="Microsoft logo" src="https://miro.medium.com/v2/resize:fit:1400/1*MxZpRFN3hnZrCC05s1q73A.png" />
                </div>
                <div class="w-fit h-[90%] flex items-center px-2">
                    <p class="text-[18px] text-neutral-500 font-poppins font-medium translate-y-[1px]">Microsoft</p>
                </div>
            </button>
        </div>

    </div>
    <div class="w-full h-[50px] flex justify-center items-center px-2">
        <div class="w-full h-[2px] bg-gray2 rounded-full">

        </div>
    </div>

    <div class="w-full h-[25px] flex items-center pb-2">
        <p class=" font-poppins text-[15px] text-darkgray">Or continue with an email address</p>
    </div>

    <div class="w-full h-fit px-2">

            <div class="w-full h-[59px] py-[6px] flex relative items-center group">

                <p id="nameWarning" class="w-32 h-6 absolute -translate-x-[140px] font-poppins text-[15px] text-center translate-y-1 text-red-700 font-medium duration-200 opacity-0">
                    Enter first name
                </p>

                <div class="h-[75%] aspect-square absolute translate-x-1 flex justify-center items-center">

                    <svg id="nameIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[55%] aspect-square fill-darkgray group-focus-within:fill-primary">
                        <path fill-rule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clip-rule="evenodd" />
                    </svg>
                      
                    
                </div>
                <input spellcheck="false" bind:value={name} placeholder="First Name" type="text" class="font-normal text-[15px] text-darkgray flex-grow h-full rounded-[12px] bg-gray1 focus:bg-gray2 focus:text-primary border-2 border-transparent  p-2 appearance-none outline-none focus:ring-0 duration-200 pl-[50px]">
            </div>

            <div class="w-full h-[59px] py-[6px] flex relative items-center group">

                <p id="emailWarning" class="w-32 h-6 absolute -translate-x-[140px] font-poppins text-[15px] text-center translate-y-1 text-red-700 font-medium duration-200 opacity-0">
                    Enter valid email
                </p>

                <div class="h-[75%] aspect-square absolute translate-x-1 flex justify-center items-center">

                    <svg id="emailIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[55%] aspect-square fill-darkgray group-focus-within:fill-primary">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                    
                </div>
                <input spellcheck="false" placeholder="Email" bind:value={email} type="email" class="font-normal text-[15px] text-darkgray flex-grow h-full rounded-[12px] bg-gray1 focus:bg-gray2 focus:text-primary border-2 border-transparent  p-2 appearance-none outline-none focus:ring-0 duration-200 pl-[50px]">
            </div>

            <div class="w-full h-[59px] py-[6px] flex relative items-center group">

                <p id="passwordWarning" class="w-32 h-6 absolute -translate-x-[135px] font-poppins text-[15px] text-center translate-y-1 text-red-700 font-medium duration-200 opacity-0">
                    Enter password
                </p>

                <div class="w-full h-full absolute pointer-events-none flex justify-end">
                    <div class="h-full aspect-square absolute translate-x-1 flex justify-center items-center">

                        <button class="pointer-events-none group-focus-within:pointer-events-auto translate-x-4" on:mouseenter={passwordShownToggle} on:mouseleave={passwordShownToggle} tabindex="-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[45%] aspect-square fill-accent group-focus-within:opacity-100 opacity-0 transition duration-150">
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        
                    </div>
                </div>

                <div class="h-[75%] aspect-square absolute translate-x-1 flex justify-center items-center">
                    <svg id="passwordIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-[60%] aspect-square fill-darkgray group-focus-within:fill-primary">
                        <path fill-rule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clip-rule="evenodd" />
                    </svg>
                </div>

                <input spellcheck="false" placeholder="Password" bind:value={password} id="passwordInputField" type="password" class="font-normal text-[15px] text-darkgray flex-grow h-full rounded-[12px] bg-gray1 focus:bg-gray2 focus:text-primary border-2 border-transparent  p-2 appearance-none outline-none focus:ring-0 duration-200 pl-[50px]">
            </div>

            <div class="w-full h-[59px] py-[6px]">
                    <button id="continueButton" class="w-full h-full rounded-full bg-secondary active:scale-[97%] duration-100" on:click={handleSignupFirst}>
                        <p class="text-[16px] font-poppins font-semibold text-white translate-y-1">Continue</p>
                    </button>
            </div>

            <div class="w-full h-[59px] py-[6px] flex items-center justify-center">
                {#if ($page.url.searchParams.size > 0) || (isDuplicateEmail == true)}
                <p class="font-poppins font-semibold text-[17px] text-red-700">
                    Email address is already being used
                </p>
                {/if}
            </div>

    </div>

    {/if}

</div>