<script lang="ts">
    import { page } from '$app/stores'
    import { createEventDispatcher } from 'svelte';
    let password: any = ''
    let passwordCheck: any = ''
    let warning: any

    const dispatch = createEventDispatcher()

    async function submitSetting() {
        const response = await fetch('/api/updateinfo',
            {
            method: 'POST',
            body: JSON.stringify({ prop: 'password', value: password, id: $page.data.session?.user?._id, migrating: false  }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const responseBody = await response.json()

        setTimeout(() => {location.reload()}, 200)
        
    }
    async function checkPasswords() {

        if(password.length < 1) {
            warning.textContent = 'Password field is empty'
            warning.classList.remove('opacity-0')
            setTimeout(() => {
                warning.classList.add('opacity-0')
                setTimeout(() => {warning.textContent = 'Passwords do not match'},100)
            },2000)
        }
        else {
            const response = await fetch('/api/pwcheck',
            {
            method: 'POST',
            body: JSON.stringify({ password: passwordCheck, id: $page.data.session?.user?._id }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const responseBody = await response.json()
        console.log(responseBody.pwMatch)

        if(responseBody.pwMatch) {
            submitSetting()
        } else {
            warning.textContent = 'Last password is not correct'
            warning.classList.remove('opacity-0')
            setTimeout(() => {
                warning.classList.add('opacity-0')
                setTimeout(() => {warning.textContent = 'Passwords do not match'},100)
            },2000)
        }

        }
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
                <p bind:this={warning} class="pl-1 text-red-800 font-poppins translate-y-1 text-[18px] font-medium my-2 mr-3 duration-100 opacity-0">Passwords do not match</p>
                <button on:click={checkPasswords} class="w-fit h-fit px-3 py-2 active:scale-95 transition-all duration-100 bg-white rounded-[10px] border-[2px] border-secondary pointer-events-auto">
                    <p class="text-[15px] font-medium text-nowrap">Change Password</p>
                </button>
            </div>

            <div class="w-full h-fit mb-6">
                <h1 class="text-[23px] font-medium font-poppins translate-y-[1px]">
                    Change your Password
                </h1>
                <p class="text-[16px] w-[90%] font-poppins font-medium text-accent mt-2">
                    To change your password, please use your last password, then type in your new desired password.
                </p>
            </div>

            <div class="w-full flex-1">

                <p class=" text-secondary text-[17px] font-poppins font-medium">
                    Please enter last password.
                </p>

                <div class="w-full py-2 px-2 mb-4">
                    <div class="w-full h-full">
                        <input bind:value={passwordCheck} type="password" class="mb-1 w-[60%] h-[43px] bg-gray1 pl-4 rounded-[10px] text-[18px] appearance-none border-non focus:outline-none" placeholder="Enter last password here"/>
                    </div>
                </div>

                <p class=" text-secondary text-[17px] font-poppins font-medium">
                    Create a new password.
                </p>

                <div class="w-full py-2 px-2">
                    <div class="w-full h-full">
                        <input bind:value={password} type="password" class="mb-1 w-[60%] h-[43px] bg-gray1 pl-4 rounded-[10px] text-[18px] appearance-none border-non focus:outline-none" placeholder="Enter new password here"/>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>