<script lang="ts">
    import { page } from "$app/stores"
    let BulletinItems: any = $page.data.session?.BulletinBoardEntries

</script>
<div class="w-full h-full flex-col flex">
    <div class="w-full h-[120px] ">
        
    </div>
    <div class="w-full flex-grow flex">

        <div class="h-full w-[35%] px-6 pb-6">
            <div class="w-full h-full flex flex-col">

                <div class="w-full h-[120px] mb-8 rounded-[20px] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] shadow-accent flex justify-center items-center">
                    <p class=" font-normal italic text-accent text-[35px]">Welcome back {(($page.data.session?.user?.firstname)?.split(' ')[0] || '').replace(/\s/g, '').replace(/^(.)(.*)$/, (_, first, rest) => first.toUpperCase() + rest.toLowerCase())}!</p>
                </div>

                <div class="w-full flex-grow bg-gray1 rounded-[20px] flex flex-col px-5 pb-5">
                    <div class="w-full h-[80px] flex justify-center items-center">
                        <p class=" text-[25px] font-poppins font-medium text-darkgray">Bulletin Board</p>
                    </div>
                    <div class="w-full flex-grow">
                        <div class="relative w-full h-full">
                            <div class="absolute inset-0">
                                <div class="w-full h-full overflow-y-scroll hide-scrollbar rounded-[20px]"
                                        style="-ms-overflow-style: none; scrollbar-width: none; ::-webkit-scrollbar"
                                >
                                    {#each BulletinItems as item}
                                        <div class="w-full h-fit bg-white rounded-[20px] p-3 mb-4">
                                            <h1 class="text-darkgray font-poppins font-semibold my-1">
                                                {item.Date}
                                            </h1>
                                            <p class="text-accent font-poppins font-medium">
                                                {item.TextContent}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                


            </div>
        </div>

        <div class="h-full w-[65%] pb-6 pr-6 flex flex-col">
            <div class="w-full flex-grow bg-gray1 rounded-[20px]">

            </div>
            <div class="w-full h-[42%] mt-6 flex">
                <div class="h-full w-[500px] bg-gray1 rounded-[20px] mr-6"></div>
                <div class="h-full flex-grow">
                    <div class="w-full h-1/3  pb-2">
                        <div class="w-full h-full rounded-[20px] bg-secondary flex justify-between px-5 py-2 items-center">

                            <p class=" text-white font-normal font-semibold text-[30px] w-4">
                                Lectionaries Started
                            </p>

                            <div class="h-full w-[50%] flex justify-end items-end">
                                <p class=" text-white font-normal font-semibold text-[35px]">
                                    {$page.data.session?.user?.stats.lectionariesStarted.toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div class="w-full h-1/3  pt-2 pb-2">
                        <div class="w-full h-full rounded-[20px] bg-accent flex justify-between px-5 py-2 items-center">

                            <p class=" text-white font-normal font-semibold text-[30px] w-4">
                                Students Taught
                            </p>

                            <div class="h-full w-[50%] flex justify-end items-end">
                                <p class=" text-white font-normal font-semibold text-[35px]">
                                    {$page.data.session?.user?.stats.studentsTaught.toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div class="w-full h-1/3 pt-2">
                        <div class="w-full h-full rounded-[20px] bg-primary flex justify-between px-5 py-2 items-center">

                            <p class=" text-white font-normal font-semibold text-[30px] w-4">
                                Prompts Submitted
                            </p>

                            <div class="h-full w-[50%] flex justify-end items-end">
                                <p class=" text-white font-normal font-semibold text-[35px]">
                                    {$page.data.session?.user?.stats.promptsSubmitted.toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>