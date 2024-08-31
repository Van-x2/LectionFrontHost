<script lang="ts">
    import { page } from "$app/stores"
    let list = [
        {name: 'bill', response: 'This is a test', status: 0},
        {name: 'john', response: 'Cool this works!', status: 2},
        {name: 'ned', response: 'This is a test', status: 1},
        {name: 'fred', response: 'Look at this respones!', status: 1},
        {name: 'bill', response: 'This is a test', status: 0},
        {name: 'john', response: 'Cool this works!', status: 3},
        {name: 'ned', response: 'This is a test', status: 1},
        {name: 'fred', response: 'Look at this respones!', status: 2},
        {name: 'bill', response: 'This is a test', status: 1},
        {name: 'john', response: 'Cool this works!', status: 3},
        {name: 'ned', response: 'This is a test', status: 2},
        {name: 'fred', response: 'Look at this respones!', status: 3},
    ]
</script>

<div id="parentPage" class="w-full h-full flex  overflow-hidden">


    <div class="w-[380px] h-full bg-gray1 border-r-[3px] border-accent relative">


    <div id="createLobbyMenu" class="w-full h-full bg-gray1 absolute z-0">
        <div class="w-full h-[30%] flex-col flex justify-end p-4 px-6 pointer-events-none select-none">
        <div class="w-full flex justify-center items-center">
                <h1 class=" text-[22px] font-normal font-semibold text-darkgray">
                    Create New Lectionary
                </h1>
        </div>
        </div>
        <div class="w-full h-[70%] flex flex-col items-center justify-between p-4 px-6">
            <div class="w-full h-fit">
                <div class="w-full h-12 rounded-[15px] mt-4">
                    <button class="w-full h-full rounded-[15px] bg-gray1 transition duration-100 border-2 border-primary">
                        <input class="w-full h-full rounded-[15px] text-center bg-gray2 focus:bg-gray1 border-none outline-none transition duration-100 p-0 m-0 text-primary font-poppins" spellcheck="false" placeholder="Enter group name" type="text"/>
                    </button>
                </div>
                <div class="w-full h-[60px] mt-8 text-[18px]">
                    <button class="w-full h-full bg-darkgray rounded-[15px] font-poppins font-medium text-gray1 active:bg-[#252525] active:translate-y-[1px] transition duration-100">
                        Create
                    </button>
                </div>
            </div>
            <div class="w-full h-fit">
                <div class="w-full h-fit text-darkgray">
                    <p class=" w-full text-wrap text-center text-[20px] font-poppins py-2 px-4">
                        Lectionary PIN:
                        <br>
                        <span>
                            ______
                        </span>
                    </p>
                    <p class=" w-full text-wrap text-center text-[15px] font-poppins py-2 px-4">
                        Inform your students to join your Lectionary at  
                        <span class=" font-semibold">Lection.ing </span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div id="preLobbyMenu" class="w-full h-full bg-gray1 absolute z-10">


        <div class="w-full h-[30%] flex-col flex justify-between p-4 px-4 pointer-events-none select-none">


            <div class="w-full h-12 flex justify-between translate-y-[100px]">
                <div class="w-[32%] h-[100%] flex">
                    <div class="w-full h-full flex justify-center items-center font-normal font-bold text-secondary text-[33px] translate-y-[2px]">
                        <p>00:00</p>
                    </div>
                </div>
                <div class="w-[20%] h-[100%] flex">
                    <div class="w-[50%] h-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[90%] h-[90%] stroke-secondary">
                            <path stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>                                                 
                    </div>
                    <div class="w-[50%] h-full flex justify-center items-center font-normal font-bold text-secondary text-[34px] translate-y-[2px]">
                        <p>5</p>
                    </div>
                </div>
            </div>

            <div class="w-full h-12 flex justify-center items-center">
                    <h1 class=" text-[22px] font-normal font-semibold text-darkgray text-center">
                        Students join the Lectionary via the join PIN now.
                    </h1>
            </div>


        </div>

        <div class="w-full h-[70%] flex flex-col items-center justify-between p-4 px-6">
                <div class="w-full h-fit">
                    <div class="w-full h-[200px] rounded-[15px] mt-4">
                        <div class="w-full h-full rounded-[15px] bg-gray1 transition duration-100 border-2 border-primary">
                            <textarea class="w-full h-full rounded-[15px] bg-gray2 focus:bg-gray1 border-none outline-none transition duration-100 m-0 text-primary font-poppins resize-none p-[14px]" spellcheck="false" placeholder="Enter initial prompt" rows="4"></textarea>
                          </div>
                    </div>
                    <div class="w-full h-[50px] mt-4 text-[18px]">
                        <button class="w-full h-full bg-accent rounded-[15px] font-poppins font-medium text-gray1 active:bg-[#899fa9] active:translate-y-[1px] transition duration-100">
                            <p class="translate-y-[2px]">Begin the Lectionary</p>
                        </button>
                    </div>
                    <div class="w-full h-[220px] mt-4 rounded-[15px] shadow-none flex justify-center items-center text-center">
                        <p class="w-[70%] text-[18px] font-poppins font-medium text-primary">Live Lectionary Stats will appear here</p>
                    </div>
                </div>
                <div class="w-full h-fit">
                    <div class="w-full h-fit text-darkgray">
                        <p class=" w-full text-wrap text-center text-[20px] font-poppins py-2 px-4">
                            Lectionary PIN:
                            <br>
                            <span>
                                ______
                            </span>
                        </p>
                        <p class=" w-full text-wrap text-center text-[15px] font-poppins py-2 px-4">
                            Inform your students to join your Lectionary at  
                            <span class=" font-semibold">Lection.ing </span>
                        </p>
                    </div>
                </div>
        </div>


    </div>


    </div>

    <div class="flex-grow bg-white relative">


        <div id="createLobbyMain" class="w-full h-full flex justify-center items-center absolute p-8 text-center z-0 bg-white">
            <p class="text-darkgray font-normal font-semibold text-[30px] -translate-y-24">Create a Lectionary to Invite Students</p>
        </div>

        <div id="preLobbyMain" class="w-full h-full absolute z-10 bg-white">
            <div class="w-full h-full relative flex-col flex">
                <div class="w-full h-[20%] flex items-end shadow-lg">
                    <p class="ml-4 mb-4 font-normal font-semibold text-[30px] text-darkgray">
                        Participants:
                    </p>
                </div>
    
                <div class="w-full h-[98%] overflow-y-auto">
                    <ul>
                        {#each list as item, i}

                        {#if item.status == 0}
                        <li>
                            <div class="w-full h-[45px] border-b-2 relative">
    
                                <div class="w-full h-full pl-[10px] absolute z-10 flex">
                                    <div class="w-fit h-full zinc-400 pr-4 flex items-center">
                                        <p class="text-darkgray font-poppins translate-y-1 text-[20px] font-semibold">
                                            {item.name}
                                        </p>
                                    </div>
                                    <div class="flex-grow h-full flex justify-between">
                                        <div class="w-full h-full flex relative">
                                            <div class="h-full w-[20px] flex justify-center items-center text-[40px] pointer-events-none select-none">⋅</div>
                                            <div class="h-full flex-grow flex items-center">
                                                <p class="translate-y-1 font-poppins text-[17px] italic pl-4 text-darkgray">
                                                
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-[150px] h-ful flex justify-center items-center">
                                            <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-primary">
                                                Joined
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
    
                                <div class="w-full h-full absolute z-0 flex">
                                    <div class="w-2/3 h-full"></div>
                                    <div class="w-1/3 h-full bg-gradient-to-r from-transparent to-[#a8c4d0]"></div>
                                </div>
    
                            </div>
                        </li>
                        {/if}

                        {#if item.status == 1}
                        <li>
                            <div class="w-full h-[45px] border-b-2 relative">
    
                                <div class="w-full h-full pl-[10px] absolute z-10 flex">
                                    <div class="w-fit h-full zinc-400 pr-4 flex items-center">
                                        <p class="text-darkgray font-poppins translate-y-1 text-[20px] font-semibold">
                                            {item.name}
                                        </p>
                                    </div>
                                    <div class="flex-grow h-full flex justify-between">
                                        <div class="w-full h-full flex relative">
                                            <div class="h-full w-[20px] flex justify-center items-center text-[40px] pointer-events-none select-none">⋅</div>
                                            <div class="h-full flex-grow flex items-center">
                                                <p class="translate-y-1 font-poppins text-[17px] italic pl-4 text-darkgray">
                                                    {item.response}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-[150px] h-ful flex justify-center items-center">
                                            <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-green-600">
                                                Replied
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
    
                                <div class="w-full h-full absolute z-0 flex">
                                    <div class="w-2/3 h-full"></div>
                                    <div class="w-1/3 h-full bg-gradient-to-r from-transparent to-green-200"></div>
                                </div>
    
                            </div>
                        </li>
                        {/if}

                        {#if item.status == 2}
                        <li>
                            <div class="w-full h-[45px] border-b-2 relative">
    
                                <div class="w-full h-full pl-[10px] absolute z-10 flex">
                                    <div class="w-fit h-full zinc-400 pr-4 flex items-center">
                                        <p class="text-darkgray font-poppins translate-y-1 text-[20px] font-semibold">
                                            {item.name}
                                        </p>
                                    </div>
                                    <div class="flex-grow h-full flex justify-between">
                                        <div class="w-full h-full flex relative">
                                            <div class="h-full w-[20px] flex justify-center items-center text-[40px] pointer-events-none select-none">⋅</div>
                                            <div class="h-full flex-grow flex items-center">
                                                <p class="translate-y-1 font-poppins text-[17px] italic pl-4 text-darkgray">
                                                    
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-[150px] h-ful flex justify-center items-center">
                                            <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-yellow-500">
                                                Pending
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
    
                                <div class="w-full h-full absolute z-0 flex">
                                    <div class="w-2/3 h-full"></div>
                                    <div class="w-1/3 h-full bg-gradient-to-r from-transparent to-yellow-100"></div>
                                </div>
    
                            </div>
                        </li>
                        {/if}

                        {#if item.status == 3}
                        <li>
                            <div class="w-full h-[45px] border-b-2 relative">
    
                                <div class="w-full h-full pl-[10px] absolute z-10 flex">
                                    <div class="w-fit h-full zinc-400 pr-4 flex items-center">
                                        <p class="text-darkgray font-poppins translate-y-1 text-[20px] font-semibold">
                                            {item.name}
                                        </p>
                                    </div>
                                    <div class="flex-grow h-full flex justify-between">
                                        <div class="w-full h-full flex relative">
                                            <div class="h-full w-[20px] flex justify-center items-center text-[40px] pointer-events-none select-none">⋅</div>
                                            <div class="h-full flex-grow flex items-center">
                                                <p class="translate-y-1 font-poppins text-[17px] italic pl-4 text-darkgray">
                                                    
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-[150px] h-ful flex justify-center items-center">
                                            <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-red-700">
                                            Silent
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
    
                                <div class="w-full h-full absolute z-0 flex">
                                    <div class="w-2/3 h-full"></div>
                                    <div class="w-1/3 h-full bg-gradient-to-r from-transparent to-red-200"></div>
                                </div>
    
                            </div>
                        </li>
                        {/if}


                        {/each}
                </div>
    
            </div>
        </div>


    </div>


</div>