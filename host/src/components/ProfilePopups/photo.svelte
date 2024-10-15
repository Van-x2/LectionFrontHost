<script>
    import { page } from '$app/stores'
    import { createEventDispatcher } from 'svelte';
    let imageURL = ''

    const dispatch = createEventDispatcher()

    async function submitSetting() {
        const response = await fetch('/api/updateinfo',
            {
            method: 'POST',
            body: JSON.stringify({ prop: 'image', value: imageURL, id: $page.data.session?.user?._id  }),
            headers: {
                'Content-Type': 'application/json'
            }
            }
        )
        const responseBody = await response.json()

        setTimeout(() => {location.reload()}, 200)
        
    }

</script>
<div class="w-full h-full absolute z-20 flex justify-center items-center">
    <div class="w-[500px] h-[260px] bg-white border-[3px] border-accent rounded-[20px] p-3">
        <div class="w-full h-[25%] relative">

            <div class="w-full h-full z-20 absolute flex justify-end items-start">
                <div class="w-8 h-8">
                    <button on:click={() => {dispatch('closePopup')}} class="w-full h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-full h-full">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>   
                    </button>                   
                </div>
            </div>

            <h1 class="text-[23px] font-medium font-poppins translate-y-[1px]">
                Photo
            </h1>
            <p class="text-[16px] font-poppins font-medium text-accent">
                Edit your preference then click save to update.
            </p>
        </div>
        <div class="w-full h-[75%] flex justify-end items-end relative">

            <div class="w-full h-full absolute justify-center items-center translate-y-3">
                <div class=" w-[100px] aspect-square rounded-[10px] border-[3px] border-gray2 flex justify-center items-center overflow-hidden">
                    <!-- svelte-ignore a11y-img-redundant-alt -->
                    <img alt="Add an image URL" src={imageURL} class="w-full h-full flex text-center text-[13px] items-center text-gray-400 translate-y-[2px]"/>

                </div>
            </div>

            <div class="w-full h-full flex absolute justify-start items-end">
                <input bind:value={imageURL} type="text" class=" w-[83%] h-12 bg-gray1 pl-4 rounded-[10px] text-[15px] appearance-none border-non focus:outline-none" placeholder="New image URL"/>
            </div>

            <button on:click={submitSetting} class=" font-poppins w-[65px] h-[45px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100 absolute">
                <p class="text-[15px] font-medium translate-y-[1px]">Save</p>
            </button>

        </div>

    </div>
</div>