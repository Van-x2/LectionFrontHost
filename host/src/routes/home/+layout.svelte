<script lang="ts">
    import { page } from '$app/stores'
    import { signOut } from '@auth/sveltekit/client'
</script>
<div class="w-screen h-screen">
    <div class="absolute w-full h-[90px] z-30 flex justify-center items-center px-[15px] pt-[15px]">
        <div class="w-full h-full bg-primary rounded-[15px] shadow-lg p-[5px]">
            <div class="w-full h-full flex justify-between">
                <div class="h-full w-fit flex justify-center items-center px-[17px]">
                    <a href="/home">
                        <p class="text-white font-title text-[35px]">
                            Lection
                        </p>
                    </a>
                </div>
                <div class="h-full w-[700px] flex justify-end">

                    <div class="h-full w-fit mx-[20px] -md:hidden flex justify-center items-center">
                        <a href="/home/pastlobbies">
                            <p class="w-fit text-nowrap text-white text-[14px] font-poppins">
                                Past Lectionaries
                            </p>
                        </a>
                    </div>

                    <div class="h-[100%] w-[2px] flex justify-center flex-col -md:hidden">
                        <div class="h-[85%] w-[2px] bg-gray-100 rounded-full">
    
                        </div>
                    </div>

                    <div class="h-full w-fit mx-[20px] -md:hidden flex justify-center items-center">
                        <a href="/home/lobby">
                            <p class="w-fit text-nowrap text-white text-[14px] font-poppins">
                                Start New Lectionary
                            </p>
                        </a>
                    </div>

                    <div class="h-full w-fit ml-[19px] mr-[15px] flex justify-center flex-col">
                        <a href="/home/upgrade" class="w-[130px] h-[65%] ">
                            <button class="w-full h-full justify-center border-[2px] rounded-[10px] border-white text-white text-[14px] font-poppins">
                                <p class="translate-y-[1px]">Upgrade</p>
                            </button>
                        </a>
                    </div>

                    <div class=" h-full aspect-square flex justify-center items-center">
                        <a href="/home/profile" class="flex justify-center items-center">
                            <img 
                            src={$page.data.session?.user?.image} 
                            alt="Youre profile icon" 
                            class="w-[75%] aspect-square bg-gray1 border-2 rounded-[10px] text-[7px] text-wrap"
                            >
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="absolute w-full h-full z-20">
    <slot />
    </div>
</div>