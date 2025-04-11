<script lang="ts">
//Media Imports
import leftLandingPhoto from '../../media/images/leftLandingPhoto.png'
import rightLandingPhoto from '../../media/images/rightLandingPhoto.png'
import { onMount } from 'svelte';
import { signIn } from '@auth/sveltekit/client';
import { signOut } from '@auth/sveltekit/client';
let leftLandingPhotoAwait: any

onMount(() => {
    leftLandingPhotoAwait = leftLandingPhoto
})

</script>

    <div class="w-full h-full flex justify-center">
        <div class="h-full w-[30%] flex flex-col pointer-events-none">
            <div class="w-full h-[16%]"></div>
            <img class="w-[400px] -translate-x-8" src={leftLandingPhotoAwait} alt="phones displaying Lection student app">
        </div>
        <div class="h-full w-[40%] ">
            <div class="w-full h-[60%] flex-col items-start">
                <div class="w-full h-[100px]">
                </div>
                <div class="w-full h-[200px]">
                    <p class=" p-2 text-center font-normal text-[40px] text-primary -lg:text-[35px] -md:text-[25px] -sm:text-[20px]">
                        Empower your teaching with real-time insights into student learning.
                    </p>
                </div>
                <div class="w-full h-[40px]">
                </div>
                <div class="w-full h-[70px] bg-white flex justify-center items-center">
                    <button class="w-[210px] h-[45px] bg-white rounded-full border-[2px] border-secondary text-secondary">
                        <p class="translate-y-[2px]">
                        Start for free
                        </p>
                    </button>
                </div>
            </div>
        </div>
        <div class="h-full w-[30%] flex flex-col pointer-events-none items-end justify-end ">
            <img class="absolute w-[720px]  translate-x-[280px] -translate-y-[80px]" src={rightLandingPhoto} alt="Laptop and Ipad displaying Lection Educator app">
        </div>
    </div>
    <div class="w-full h-fit bg-slate-300">
        Explain how it works here!
        <br>
        Explain how it works here!
        <br>
        Explain how it works here!
        <br>
        Explain how it works here!
        <br>
        Explain how it works here!
        <br>
        Explain how it works here!
        <br>
        Explain how it works here!
        <br>
        Explain how it works here!
        <br>
    </div>