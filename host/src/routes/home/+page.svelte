<script lang="ts">
    import { page } from "$app/stores"
    let BulletinItems: any = $page.data.session?.BulletinBoardEntries
</script>
<div class="w-full h-full overflow-hidden flex-col">
    <div class="w-full h-[120px]">
    </div>
    <div class="w-full h-[88%] flex-grow flex-col">
        <div class="w-full h-[50%] lg:h-[35%] flex justify-center items-center">
            <div class="w-full h-full px-6 pb-[2px] flex-col">
                <div class="w-full h-[20%] flex items-center pl-8 text-[35px] text-accent font-normal italic ">
                    <span class="text-secondary font-black -translate-y-[3px] -translate-x-2 text-[40px]">//</span>
                    <h1>  Welcome back {$page.data.session?.user?.name}!</h1>
                </div>
                <div class="w-full h-[80%] flex">

                    <div class="h-full w-1/3 p-[18px]">
                        <div class="w-full h-full bg-gray1 rounded-[20px] border-[2px] border-secondary">
                            <div class="h-1/2 w-full p-[17px] font-normal text-[30px] text-primary">
                                <h1>Lectionaries Started</h1>
                            </div>
                            <div class="h-1/2 w-full pb-[px] pr-[25px] flex items-end justify-end text-[45px] text-secondary font-poppins font-medium">
                                <p>
                                5
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="h-full w-1/3 p-[18px]">
                        <div class="w-full h-full bg-gray1 rounded-[20px] border-[2px] border-secondary">
                            <div class="h-1/2 w-full p-[17px] font-normal text-[30px] text-primary">
                                <h1>Students Taught</h1>
                            </div>
                            <div class="h-1/2 w-full pb-[px] pr-[25px] flex items-end justify-end text-[45px] text-secondary font-poppins font-medium">
                                <p>
                                20
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="h-full w-1/3 p-[18px]">
                        <div class="w-full h-full bg-gray1 rounded-[20px] border-[2px] border-secondary">
                            <div class="h-1/2 w-full p-[17px] font-normal text-[30px] text-primary">
                                <h1>Prompts Submitted</h1>
                            </div>
                            <div class="h-1/2 w-full pb-[px] pr-[25px] flex items-end justify-end text-[45px] text-secondary font-poppins font-medium">
                                <p>
                                15
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="w-full h-[50%] lg:h-[65%] p-4 px-8 pb-[35px]">
            <div class="w-full h-full bg-gray1 rounded-[20px] border-[2px] border-secondary max-h-[100%]">
                <div class=" w-full -md:h-[-30%] h-[20%] text-[30px] flex items-center p-8 font-normal font-me text-primary">
                    <h1>Bulletin Board</h1>
                </div>
                <div class="w-full h-[1px] mb-[1%] -translate-y-2">
                    <div class=" ml-8 w-[90%] h-[1px] bg-primary">

                    </div>
                </div>
                <div class=" w-full h-[74%]">
                    <div class=" text-[13px] w-full h-full pl-8 text-darkgray font-poppins font-medium overflow-auto leading-[15px] max-h-[95%] scroll overflow-y-scroll">
                        <ol>    
                            {#if (BulletinItems.length >= 1)}
                                {#each BulletinItems as item, i}
                                <li> - {item.TextContent}</li>
                                <br>
                                {/each}        
                            {/if}

                          </ol> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>