<script lang="ts">

    //importing stuffs
    import { page } from "$app/stores"
    import { onMount } from "svelte";
 
 
    //defining stuffs
 
    let promptField = ''
    let hostId = $page.data.session?.user?._id
    let lobbyMembershipLevel: string = $page.data.session?.user?.membershipLevel
    let joincode = ''
    let currentPrompt: number = 0
    let currentResponseSet: any = []
    let totalResponseSet: any = []
    let currentPhase: number = 0
    let numOfParticipants: number = 0
    let seconds: number = 0
    let minutes: number = 0
    let currentConfidencePercentage: number = 0
    let currentParticipationPercentage: number = 0
    let lastConfidenceMeterColor: string = 'bg-darkgray'
    let lastParticipationColor: string = 'bg-darkgray'
    let currentConfidenceMeterColor: string
    let currentParticipationColor: string
    let currentViewingPrompt: number = 0
 
    //doc element variables
    let createLobbyMainInformText: any
    let createLobbyMain: any
    let preLobbyMenu: any
    let preLobbyMain: any
    let activeLobbyMenu: any
    let preLobbyMenuInformText: any
    let timer: any
    let participationMeter: any
    let confidenceMeter: any
    let groupSelectInputField: any
    let groupSelectInputFieldOpener: any
 
    let groupSelectInputFieldOpen: boolean = false
 
    let groupsArray
 
    let lectionMins: any = $page.data.session?.user?.lobbyMinutesUsed
    if(Number.isNaN(lectionMins)) {
        lectionMins = 1
    }
    console.log(lectionMins)
    
 
    if($page.data.session?.user?.groups) {
    groupsArray = $page.data.session?.user?.groups
    }
    else{
    groupsArray = []
    }
 
    let currentGroup = ''
    let currentGroupValue = ''
 
 
 
    onMount(() => {
        createLobbyMainInformText = document.getElementById('createLobbyMainInformText')
        createLobbyMain = document.getElementById('createLobbyMain')
        preLobbyMenu = document.getElementById('preLobbyMenu')
        preLobbyMain = document.getElementById('preLobbyMain')
        activeLobbyMenu = document.getElementById('activeLobbyMenu')
        preLobbyMenuInformText = document.getElementById('preLobbyMenuInformText')
        timer = document.getElementById('timer')
        participationMeter = document.getElementById('participationMeter')
        confidenceMeter = document.getElementById('confidenceMeter')
 
 
    })
 
    //function stuffs
    function createLobby() {
    createLobbyMainInformText.textContent = 'Creating the Lectionary...'
      const thenDate = (new Date()).toISOString()
      const lobby = {
        hostid: hostId,
        lobbyMembershipLevel: lobbyMembershipLevel,
        joincode: null,
        group: currentGroupValue,
        prompts: [],
        participants: [],
        datetime: thenDate,
        duration: 0,
        status: 1
      }
  
      fetch(
        'https://lection-backend.fly.dev/createlobby',
       {
        method: "POST", 
        body: JSON.stringify(lobby),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      .then( response => {
        if (!response.ok) {
          throw new Error(`There was an error: ${response.status}`)
        }
        return response.json() 
      })
      .then(data => {
        //switches to the preLobby page view
        preLobbyMenu.classList.remove('-z-10')
        preLobbyMenu.classList.add('z-10')
 
        preLobbyMain.classList.remove('-z-10')
        preLobbyMain.classList.add('z-10')
 
        joincode = data.joincode
        console.log(joincode)
      })
      //When the Lobby is created on the backend, the client calls this function
      .then(() => {lobbyHostCom()})
      .catch( error => {
        console.error(`There was a problem: ${error}`)
      })
  
      async function lobbyHostCom() {
        let route = `https://lection-backend.fly.dev/lobbyhost/${joincode}`
        const source = new EventSource(route)
        source.addEventListener('message', message => {
          let response = JSON.parse(message.data)
 
          numOfParticipants = response.participants.length
 
          //sorts through the returned participants & their responses
            response.participants.forEach((participant: any) => {
                if(currentPhase === 1) {
                    if (participant.responses && participant.responses.length > 0) {
                        const highestPromptIndex = Math.max(...participant.responses.map((response: any) => response.promptIndex))
 
                        if (highestPromptIndex === (currentPrompt-1)) {
                            participant.status = 1
                        }
 
                        if (highestPromptIndex === (currentPrompt-2)) {
                            participant.status = 2
                        }
 
                        if (highestPromptIndex < (currentPrompt-2)) {
                            participant.status = 3
                        }
                    }
                    else{
                        participant.status = 2
                    }
                }
                else{
                    participant.status = 0
                }
            })
            currentResponseSet = response.participants
            
 
            //Average Confidence Calculations
 
            const averageConfidenceArray: any = []
            //pulls confidence values from current responses
            currentResponseSet.forEach((participant: any) => {
            if (participant.responses && participant.responses.length > 0) {
                try {
                averageConfidenceArray.push(participant.responses[currentPrompt-1].confidence)   
                } catch (error) {
                
                }
            }
            })
 
            //calculates average confidence value
            if (averageConfidenceArray.length > 0) {
                //adds up values of array
                const sum = averageConfidenceArray.reduce((accumulator: any, currentValue: any) => accumulator + currentValue, 0)
                //divides the values
                const average = sum / averageConfidenceArray.length
                //calculates average as percentage
                currentConfidencePercentage = (average / 5) * 100
                currentConfidencePercentage = Math.trunc(currentConfidencePercentage)
            }
 
 
            //Average participation Calculations
 
            let studentParticipationCount: number = 0
            currentResponseSet.forEach((participant: any) => {
                if (participant.status === 1) {
                    studentParticipationCount = studentParticipationCount + 1
                }
                else{
                }
            })
            currentParticipationPercentage = ((studentParticipationCount/currentResponseSet.length)*100)
            currentParticipationPercentage = Math.trunc(currentParticipationPercentage)
 
            if(currentPhase === 1) {
                if(currentConfidencePercentage >= 30) {
                currentConfidenceMeterColor = 'bg-red-500'
                }
                if(currentConfidencePercentage >= 50) {
                currentConfidenceMeterColor = 'bg-yellow-500'
                }
                if(currentConfidencePercentage >= 70) {
                currentConfidenceMeterColor = 'bg-green-500'
                }
 
                confidenceMeter.classList.remove(lastConfidenceMeterColor)
                confidenceMeter.classList.add(currentConfidenceMeterColor)
                lastConfidenceMeterColor = currentConfidenceMeterColor
 
 
                if(currentParticipationPercentage >= 30) {
                currentParticipationColor = 'bg-red-500'
                }
                if(currentParticipationPercentage >= 50) {
                currentParticipationColor = 'bg-yellow-500'
                }
                if(currentParticipationPercentage >= 70) {
                currentParticipationColor = 'bg-green-500'
                }
 
                participationMeter.classList.remove(lastParticipationColor)
                participationMeter.classList.add(currentParticipationColor)
                lastParticipationColor = currentParticipationColor
 
 
 
 
 
                confidenceMeter.style.width = `${currentConfidencePercentage}%`
 
                participationMeter.style.width = `${currentParticipationPercentage}%`
 
            }
 
 
 
        })
      }
    }
  
    function submitPrompt() {
      let promptContent = {
        prompt: promptField
      }
      let route = `https://lection-backend.fly.dev/hostsubmitprompt/${joincode}/${hostId}`
      //submit prompt to mongodb
      fetch(route, 
    {
        method: "POST", 
        body: JSON.stringify(promptContent),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //error checking response
      .then( response => {
        if (!response.ok) {
          throw new Error(`There was an error: ${response.status}`)
        }
 
        //clears the prompt input field
        promptField = ''
 
        //increment the current prompt
        currentPrompt = currentPrompt + 1
 
        //increment lobby phase to 2
        currentPhase = 1
 
        currentParticipationPercentage = 0
        currentConfidencePercentage = 0
 
        let tempCurrentResponseSet = currentResponseSet
 
 
        //resets stats card
        participationMeter.style.width = `0%`
        confidenceMeter.style.width = `0%`


        //Adds the current response set to the total response set
        totalResponseSet.push(currentResponseSet)
        totalResponseSet = totalResponseSet
 
 
 
 
 
        tempCurrentResponseSet.forEach((participant: any) => {
            participant.status = 2
          })
        
          currentResponseSet = tempCurrentResponseSet
 
        return response
      })
 
    }
  
    function closeLobby() {
      const nowDate = (new Date()).toISOString()
      const endData = {
        newdatetime: nowDate
      }
      createLobbyMain.classList.add('z-30')
      createLobbyMain.classList.remove('-z-10')
      createLobbyMainInformText.textContent = 'Ending the Lectionary...'
      
      
      let route = `https://lection-backend.fly.dev/hostlobbyclose/${joincode}/${hostId}`
  
      fetch(route, 
    {
        method: "POST", 
        body: JSON.stringify(endData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //error checking response
      .then( response => {
        if (!response.ok) {
          throw new Error(`There was an error: ${response.status}`)
        }
        return response
      })
      .then(data => {
        console.log(data)
      })
      setTimeout(() => {
        location.reload()
      }, 1000)
    }
 
    function updateTimer() {
    seconds++
    if (seconds === 60) {
        seconds = 0
        minutes++
    }
 
    let formattedMinutes = String(minutes).padStart(2, '0')
    let formattedSeconds = String(seconds).padStart(2, '0')
 
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`
    }
    function startLobby() {
        if(numOfParticipants > 0) {
        setInterval(updateTimer, 1000)
        submitPrompt()
        activeLobbyMenu.classList.remove('-z-20')
        activeLobbyMenu.classList.add('z-20')
        }
        else{
            preLobbyMenuInformText.classList.add('opacity-0')
            setTimeout(() => {
            
                preLobbyMenuInformText.textContent = 'Cannot start a Lectionary without any participants.'
                preLobbyMenuInformText.classList.remove('text-primary')
                preLobbyMenuInformText.classList.add('text-darkred')
                preLobbyMenuInformText.classList.remove('opacity-0')
 
            },200)
        }
        
    }
 
    function toggleMenu() {
        if (groupSelectInputFieldOpen === false) {
            groupSelectInputFieldOpener.classList.add("rotate-90")
        }
        else{
            groupSelectInputFieldOpener.classList.remove("rotate-90")
        }
        groupSelectInputFieldOpen = !groupSelectInputFieldOpen
    }
 
    function groupSelected(group: any) {
 
        currentGroup = group
        if(group === 'new') {
            currentGroupValue = ''
        }
        else{
            currentGroupValue = group
        }
        groupSelectInputFieldOpener.classList.remove("rotate-90")
        groupSelectInputFieldOpen = false
    }
  
 </script>

<div id="parentPage" class="w-full h-full flex  overflow-hidden">


    <div class="w-[380px] h-full bg-gray1 border-r-[3px] border-accent relative -sm:w-full">


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

                    <div class="w-full h-fit rounded-[15px] mt-4">

                        {#if $page.data.session?.user?.membershipLevel !== 'standard'}
                        <div bind:this={groupSelectInputField} class="w-full h-fit flex rounded-[15px] bg-darkgray overflow-hidden font-poppins text-[15px]">

                            <div 
                            class="w-[85%] transition-all duration-200 overflow-hidden" 
                            style="height: {groupSelectInputFieldOpen ? `${((groupsArray.length + 1) * 50)}px` : '50px'};">

                                <div class="{groupSelectInputFieldOpen ? 'block' : 'hidden'}">
                                    {#each groupsArray as node}
                                    <button on:click={() => {groupSelected(node)}} class="w-full h-[50px] text-white pl-4 py-2 flex items-center">
                                        <p>{node}</p>
                                    </button>
                                    
                                    {/each}

                                    <button on:click={() => {groupSelected('new')}} class="w-full h-[50px] text-white pl-4 py-2 flex items-center">
                                        <p>Create New Group</p>
                                    </button>
                                </div>

                                <div class="{groupSelectInputFieldOpen ? 'hidden' : 'block'}">
                                    {#if currentGroup === 'new'}
                                    <input bind:value={currentGroupValue} class=" bg-darkgray w-full h-[50px] pl-4 py-2 flex items-center border-none outline-none transition duration-100 p-0 m-0 text-white" spellcheck="false" placeholder="Enter Group Name" type="text"/>
                                    {:else}
                                        <div class="w-full h-[50px] text-white pl-4 py-2 flex items-center">{#if currentGroup === ''} Select a Group {:else} {currentGroup} {/if}</div>
                                    {/if}
                                </div>

                            </div>

                            <div class="h-[50px] w-[15%] flex justify-center items-center">
                                <div class="h-[60%] aspect-square flex justify-center items-center relative">
                                    <button bind:this={groupSelectInputFieldOpener} on:click={toggleMenu} class=" transition-all duration-200 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-full h-full stroke-white">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>   
                                    </button>                                   
                                </div>
                            </div>

                        </div>
                        {/if}

                    </div>

                    {#if ($page.data.session?.user?.membershipLevel == 'standard' && lectionMins >= 18000)}
                    <div class="w-full h-[60px] mt-8 text-[18px]">
                        <button on:click={createLobby} class="w-full h-full bg-darkgray rounded-[15px] font-poppins font-medium text-gray1 active:bg-[#252525] active:translate-y-[1px] transition duration-100 opacity-20 pointer-events-none">
                            Create
                        </button>
                    </div>
                    <p class="text-center mt-4 p-1 text-darkred font-poppins text-[18px] font-medium">You have exceeded your monthly Lectionary hours</p>
                    {:else}
                    <div class="w-full h-[60px] mt-10 text-[18px]">
                        <button on:click={createLobby} class="w-full h-full bg-darkgray rounded-[15px] font-poppins font-medium text-gray1 active:bg-[#252525] active:translate-y-[1px] transition duration-100">
                            Create
                        </button>
                    </div>
                    {/if}

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

        <div id="preLobbyMenu" class="w-full h-full bg-gray1 absolute -z-10 overflow-y-auto">


            <div class="w-full flex-col flex justify-between p-4 px-4 pointer-events-none select-none">

                <div class="w-full h-[100px]">

                </div>

                <div class="w-full h-12 flex justify-between mb-8">
                    <div class="w-[32%] h-[100%] flex">
                        <div class="w-full h-full flex justify-center items-center font-normal font-bold text-secondary text-[33px] translate-y-[2px]">
                            <p>00:00</p>
                        </div>
                    </div>
                    <div class="w-[40%] h-[100%] flex">
                        <div class="w-[50%] h-full flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[90%] h-[90%] stroke-secondary">
                                <path stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>                                                 
                        </div>
                        {#if $page.data.session?.user?.membershipLevel == 'standard'}
                        <div class="w-[50%] h-full flex justify-center items-center font-normal font-bold text-secondary text-[34px] translate-y-[2px]">
                            <p>{numOfParticipants}/10</p>
                        </div>
                        {:else}
                        <div class="w-[50%] h-full flex justify-center items-center font-normal font-bold text-secondary text-[34px] translate-y-[2px]">
                            <p>{numOfParticipants}</p>
                        </div>
                        {/if}
                    </div>
                </div>

                <div class="w-full h-12 flex justify-center items-center">
                        <h1 class=" text-[22px] font-normal font-semibold text-darkgray text-center">
                            Students join the Lectionary via the join PIN now.
                        </h1>
                </div>


            </div>

            <div class="w-full flex flex-col items-center justify-between p-4 px-6">
                    <div class="w-full h-fit mb-8">
                        <div class="w-full h-[200px] rounded-[15px] mt-4">
                            <div class="w-full h-full rounded-[15px] bg-gray1 transition duration-100 border-2 border-primary relative">
                                <div class="w-full h-full absolute flex p-[10px] justify-end items-end pointer-events-none">
                                    <p class="text-primary font-poppins text-[23px] translate-y-2">{currentPrompt+1}</p>
                                </div>
                                <textarea bind:value={promptField} class="w-full h-full rounded-[15px] bg-gray2 focus:bg-gray1 border-none outline-none transition duration-100 m-0 text-primary font-poppins resize-none p-[14px]" spellcheck="false" placeholder="Enter the starting prompt of the Lectionary" rows="4"></textarea>
                            </div>
                        </div>
                        <div class="w-full h-[50px] mt-4 text-[18px] mb-8">
                            <button on:click={startLobby} class="w-full h-full bg-accent rounded-[15px] font-poppins font-medium text-gray1 active:bg-[#899fa9] active:translate-y-[1px] transition duration-100">
                                <p class="translate-y-[2px]">Begin the Lectionary</p>
                            </button>
                        </div>
                        <div class="w-full h-[70px] mt-4 rounded-[15px] shadow-none flex justify-center items-center text-center">
                            <p id="preLobbyMenuInformText" class="w-[90%] text-[18px] font-poppins font-medium text-primary transition-opacity duration-100">Students will not be able to join a Lectionary after it has begun.</p>
                        </div>
                    </div>
                    <div class="w-full h-fit">
                        <div class="w-full h-fit text-darkgray">
                            <p class=" w-full text-wrap text-center text-[20px] font-poppins py-2 px-4">
                                Lectionary PIN:
                                <br>
                                <span class="text-[25px] font-semibold">
                                    {joincode}
                                </span>
                            </p>
                            <p class=" w-full text-wrap text-center text-[15px] font-poppins py-2 px-4 -translate-y-1">
                                Inform your students to join your Lectionary at  
                                <span class=" font-semibold">Lection.ing </span>
                            </p>
                        </div>
                    </div>
            </div>


        </div>

        <div id="activeLobbyMenu" class="w-full h-full bg-gray1 absolute -z-20 overflow-y-auto">


            <div class="w-full flex-col flex justify-between p-4 px-4 pointer-events-none select-none">

                <div class="w-full h-[100px]">

                </div>

                <div class="w-full h-12 flex justify-between mb-8">
                    <div class="w-[32%] h-[100%] flex">
                        <div class="w-full h-full flex justify-center items-center font-normal font-bold text-secondary text-[33px] translate-y-[2px]">
                            <p id="timer">00:00</p>
                        </div>
                    </div>
                    <div class="w-[20%] h-[100%] flex">
                        <div class="w-[50%] h-full flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[90%] h-[90%] stroke-secondary">
                                <path stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>                                                 
                        </div>
                        <div class="w-[50%] h-full flex justify-center items-center font-normal font-bold text-secondary text-[34px] translate-y-[2px]">
                            <p>{numOfParticipants}</p>
                        </div>
                    </div>
                </div>

                <div class="w-full h-12 flex justify-center items-center">
                        <h1 class=" text-[22px] font-normal font-semibold text-darkgray text-center">
                            Send questions or prompts to students now.
                        </h1>
                </div>


            </div>

            <div class="w-full flex flex-col items-center justify-between p-4 px-6">
                    <div class="w-full h-fit">
                        <div class="w-full h-[200px] rounded-[15px] mt-4">
                            <div class="w-full h-full rounded-[15px] bg-gray1 transition duration-100 border-2 border-primary relative">
                                <div class="w-full h-full absolute flex p-[10px] justify-end items-end pointer-events-none">
                                    <p class="text-primary font-poppins text-[23px] translate-y-2">{currentPrompt+1}</p>
                                </div>
                                <textarea bind:value={promptField} class="w-full h-full rounded-[15px] bg-gray2 focus:bg-gray1 border-none outline-none transition duration-100 m-0 text-primary font-poppins resize-none p-[14px]" spellcheck="false" placeholder="Enter prompt here" rows="4"></textarea>
                            </div>
                        </div>
                        <div class="w-full h-[50px] mt-4 text-[18px]">
                            <button on:click={submitPrompt} class="w-full h-full bg-accent rounded-[15px] font-poppins font-medium text-gray1 active:bg-[#899fa9] active:translate-y-[1px] transition duration-100">
                                <p class="translate-y-[2px]">Submit Prompt</p>
                            </button>
                        </div>
                        <div class="w-full h-[250px] mt-4 rounded-[15px] shadow-none flex flex-col text-center bg-white p-2 pt-4">
                            <div class="w-full h-[45%]">
                                <div class="w-full h-[45%] flex items-center pl-2">
                                    <p class="text-[22px] font-poppins translate-y-1 font-medium">
                                        Participation: {currentParticipationPercentage}%
                                    </p>
                                </div>
                                <div class="w-full h-[55%] pr-4 pl-1 py-2">
                                    <div class="w-full h-full bg-gray2 rounded-[10px]">
                                        <div id="participationMeter" style="width: 0%" class="h-full bg-darkgray rounded-[10px] transition-all duration-500">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full h-[45%]">
                                <div class="w-full h-[45%] flex items-center pl-2">
                                    <p class="text-[22px] font-poppins translate-y-1 font-medium">
                                        Confidence: {currentConfidencePercentage}%
                                    </p>
                                </div>
                                <div class="w-full h-[55%] pr-4 pl-1 py-2">
                                    <div class="w-full h-full bg-gray2 rounded-[10px]">
                                        <div id="confidenceMeter" style="width: 0%" class="h-full  bg-darkgray rounded-[10px] transition-all duration-500">

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="w-full h-fit">
                        <div class="w-full h-fit pt-4">
                            <button on:click={closeLobby} class="w-[100%] h-[60px] bg-darkred rounded-[15px] active:bg-[#500e0e]">
                                <p class="translate-y-[2px] font-poppins font-medium text-gray1">End the Lectionary</p>
                            </button>
                        </div>
                    </div>
            </div>


        </div>


    </div>

    <div class="flex-grow bg-white relative -sm:hidden">


        <div id="createLobbyMain" class="w-full h-full flex justify-center items-center absolute p-8 text-center z-0 bg-white">
            {#if ($page.data.session?.user?.membershipLevel == 'standard' && lectionMins >= 18000)}
            <p id="createLobbyMainInformText" class="text-darkred font-normal font-semibold text-[30px] -translate-y-24">Maximum monthly Lectionary hours exceeded. Upgrade to a paid plan or wait until monthly top up to use Lection again.</p>
            {:else}
            <p id="createLobbyMainInformText" class="text-darkgray font-normal font-semibold text-[30px] -translate-y-24">Create a Lectionary to Invite Students</p>
            {/if}
        </div>

        <div id="preLobbyMain" class="w-full h-full absolute -z-10 bg-white">
            <div class="w-full h-full relative">
                <div class="w-full h-[165px] flex items-end shadow-lg justify-between">
                    <p class="ml-4 mb-4 font-normal font-semibold text-[30px] text-darkgray">
                        Participants:
                    </p>
                    <div class="w-[250px] h-[50px] mr-4 mb-3 flex justify-center">

                            <div class="w-1/3 h-full flex items-center justify-center">

                                <h1 class="text-[18px] font-poppins translate-y-[2px] pr-4">Viewing:</h1>
                                
                            </div>

                            <select
                            bind:value={currentViewingPrompt}
                            class="w-2/3 h-full relative appearance-none rounded-[15px] text-center  bg-darkgray text-white cursor-pointer"
                            >
                            <option value={0}>Current Prompt</option>
                            {#each (totalResponseSet.slice(1)) as responseSet, i}
                            <option value={i+1}>Prompt {i+1}</option>
                            {/each}
                            </select>


                    </div>
                </div>
    
                <div class="w-full h-[98%] overflow-y-auto">
                    <ul>


                        {#if currentViewingPrompt == 0}

                            {#each currentResponseSet as item, i}

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
                                                    <span class=" not-italic font-semibold">({item.responses[(currentPrompt-1)].confidence}/5)</span>  {item.responses[(currentPrompt-1)].response}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-[150px] h-ful flex justify-center items-center">
                                            <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-green-700">
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
                                            <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-yellow-600">
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
                                            <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-red-800">
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

                        {:else}

                            {#each totalResponseSet[currentViewingPrompt] as item, i}

                                {#if !(item.responses[(currentViewingPrompt-1)]) }
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
                                                    <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-red-800">
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

                                {:else if item.responses[(currentViewingPrompt-1)].Promptstatus == 0}

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

                                {:else}

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
                                                            <span class=" not-italic font-semibold">({item.responses[(currentViewingPrompt-1)].confidence}/5)</span>  {item.responses[(currentViewingPrompt-1)].response}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="w-[150px] h-ful flex justify-center items-center">
                                                    <p class="font-poppins font-medium translate-y-1 text-[23px] italic text-green-700">
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


                            {/each}

                        {/if}
                </div>
    
            </div>
        </div>


    </div>


</div>