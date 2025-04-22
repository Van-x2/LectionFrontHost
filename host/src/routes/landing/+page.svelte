<script lang="ts">
//Media Imports
import leftLandingPhoto from '../../media/images/leftLandingPhoto.png'
import rightLandingPhoto from '../../media/images/rightLandingPhoto.png'
import { onMount } from 'svelte';
import { signIn } from '@auth/sveltekit/client';
import { signOut } from '@auth/sveltekit/client';
  import { goto } from '$app/navigation';
let leftLandingPhotoCode: HTMLElement
let rightLandingPhotoCode: HTMLElement

onMount(() => {
setTimeout(() => {
    leftLandingPhotoCode.classList.remove('-translate-x-[100px]')
    rightLandingPhotoCode.classList.remove('translate-x-[100px]')
    leftLandingPhotoCode.classList.add('opacity-100')
    rightLandingPhotoCode.classList.add('opacity-100')
},200)
})

</script>
    <div class="w-full min-h-screen">
        <div class="w-full h-screen flex justify-center">
            <div class="h-full w-[30%] flex flex-col">
                <div class="w-full h-[16%]"></div>
                <div bind:this={leftLandingPhotoCode} class=" w-full h-[84%] flex justify-start items-start opacity-0 transition-all duration-[1500ms] -translate-x-[100px]">
                    <img class="w-[400px] -translate-x-8 pointer-events-none" src={leftLandingPhoto} alt="phones displaying Lection student app">
                </div>
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
                        <button on:click={() => {goto('/user')}} class="w-[210px] h-[45px] bg-white rounded-full border-[2px] border-secondary text-secondary">
                            <p class="translate-y-[2px]">
                            Start for free
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div class="h-full w-[30%] flex flex-col items-start">
                <div class="w-full h-[16%]"></div>
                <div bind:this={rightLandingPhotoCode} class="w-full h-[84%] flex justify-end items-start opacity-0 transition-all hover:opacity-100 duration-[1500ms] translate-x-[100px]">
                    <img class="w-[400px] pointer-events-none" src={rightLandingPhoto} alt="phones displaying Lection student app">
                </div>
              </div>          
        </div>
        <div class="w-full h-fit mt-[-150px]">

            <div class="w-full h-[500px]  flex bg-">
                <div class="w-1/2 h-full  px-12 pt-4 flex flex-col justify-center">
                    <div class="w-full h-[60px]  flex items-center mb-4">
                        <h1 class="text-primary font-title text-[60px] mr-8">#1</h1>
                        <p class="text-primary font-normal font-semibold italic text-[30px]">Start a Lectionary Lobby</p>
                    </div>

                    <div class="w-full h-fit p-3  text-left text-[20px]">
                        <span class=" font-semibold text-accent">
                            Host your lesson in seconds.
                        </span>

                        <br>

                        <p class=" font-medium text-darkgray">
                        Kick things off by creating a Lectionary 
                        lobby — your private space to guide a class, 
                        quiz, or discussion. No setup hassle, 
                        just one click and you're ready to teach.
                        </p>

                    </div>
                </div>
                <div class="w-1/2 h-full"></div>
            </div>

            <div class="w-full h-[500px]  flex bg-">

                <div class="w-1/2 h-full"></div>

                <div class="w-1/2 h-full  px-12 pt-4 flex flex-col justify-center">
                    <div class="w-full h-[60px]  flex items-center mb-4 justify-end">
                        <p class="text-primary font-normal font-semibold italic text-[30px]">Students Join with a Simple Link</p>
                        <h1 class="text-primary font-title text-[50px] ml-8">#2</h1>
                    </div>

                    <div class="w-full h-fit p-3  text-right text-[20px]">
                        <span class=" font-semibold text-accent">
                            Instant access through lection.ing.
                        </span>

                        <br>

                        <p class=" font-medium text-darkgray">
                            Your students join by entering a short code at lection.ing. 
                            No downloads, no accounts — just type, tap, and they’re in.
                        </p>

                    </div>
                </div>
            </div>

            <div class="w-full h-[500px]  flex bg-">
                <div class="w-1/2 h-full  px-12 pt-4 flex flex-col justify-center">
                    <div class="w-full h-[60px]  flex items-center mb-4">
                        <h1 class="text-primary font-title text-[50px] mr-8">#3</h1>
                        <p class="text-primary font-normal font-semibold italic text-[30px]">Prompt Your Class in Real Time</p>
                    </div>

                    <div class="w-full h-fit p-3  text-left text-[20px]">
                        <span class=" font-semibold text-accent">
                            Send thoughtful, text-based questions instantly.
                        </span>

                        <br>

                        <p class=" font-medium text-darkgray">
                            Pose a question, spark a discussion, or check for understanding
                             — all through simple text prompts. It’s quick, clear, 
                             and designed to keep attention on the learning.
                        </p>

                    </div>
                </div>
                <div class="w-1/2 h-full"></div>
            </div>

            <div class="w-full h-[500px]  flex bg-">

                <div class="w-1/2 h-full"></div>

                <div class="w-1/2 h-full  px-12 pt-4 flex flex-col justify-center">
                    <div class="w-full h-[60px]  flex items-center mb-4 justify-end">
                        <p class="text-primary font-normal font-semibold italic text-[30px] text-nowrap">Students Respond with Confidence</p>
                        <h1 class="text-primary font-title text-[50px] ml-8">#4</h1>
                    </div>

                    <div class="w-full h-fit p-3  text-right text-[20px]">
                        <span class=" font-semibold text-accent">
                            See what they think — and how sure they are.
                        </span>

                        <br>

                        <p class=" font-medium text-darkgray">
                            Each student answers live and rates their confidence. You get more than just a right or wrong — you get insight into how they’re thinking.
                        </p>

                    </div>
                </div>
            </div>

            <div class="w-full h-[500px]  flex bg-">
                <div class="w-1/2 h-full  px-12 pt-4 flex flex-col justify-center">
                    <div class="w-full h-[60px]  flex items-center mb-4">
                        <h1 class="text-primary font-title text-[50px] mr-8">#5</h1>
                        <p class="text-primary font-normal font-semibold italic text-[30px]">View Responses, Teach Your Way</p>
                    </div>

                    <div class="w-full h-fit p-3 text-left text-[20px]">
                        <span class=" font-semibold text-accent">
                            Real-time feedback, all in one place.
                        </span>

                        <br>

                        <p class=" font-medium text-darkgray">
                            Student answers appear in a clean, 
                            transparent dashboard, designed to help 
                            you adapt on the spot. Focus on the learning, 
                            not the tools.
                        </p>

                    </div>
                </div>
                <div class="w-1/2 h-full"></div>
            </div>

            <div class="w-full h-[300px]  flex bg- items-center justify-center">
                <button on:click={() => {goto('/user')}} class="w-[340px] h-[75px] bg-white rounded-full border-[2px] border-secondary text-secondary text-[22px]">
                    <p class="translate-y-[2px]">
                    Start for free now
                    </p>
                </button>
            </div>


        </div>
    </div>