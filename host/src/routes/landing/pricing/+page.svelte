<script lang="ts">
  import { goto } from '$app/navigation';
  import { redirect } from "@sveltejs/kit";

  function setCheckoutCookie(value: string) {
   document.cookie = "checkout=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
   const date = new Date();
   date.setTime(date.getTime() + 60 * 60 * 1000); // 1 hour expiration
   const expires = "; expires=" + date.toUTCString();
   document.cookie = `checkout=${value}${expires}; path=/`;
   document.cookie = `pageState=signUp;path=/;max-age=2592000`;
}

function getCheckoutCookie() {
   const name = "checkout="
   const decodedCookie = decodeURIComponent(document.cookie)
   const ca = decodedCookie.split(';')
   for (let i = 0; i < ca.length; i++) {
       let c = ca[i].trim()
       if (c.indexOf(name) === 0) {
           return c.substring(name.length, c.length)
       }
   }
   return "none"
}


  function continueButtonPressed (type: number) {
    console.log(type)
    if(type === 1) {
        setCheckoutCookie('none')
        goto('/user')
    }
    if(type === 2) {
        setCheckoutCookie('unlimited')
        goto('/user')
    }
    if(type === 3) {
        setCheckoutCookie('premium')
        goto('/user')
    }
  }

</script>
<div class="w-full h-full flex-col flex">
<div class="w-full h-[220px] flex justify-center items-center flex-col">

        <h1 class="text-[37px] font-normal font-semibold text-center text-primary mb-5">
            Simple, Fair Pricing
        </h1>

        <p class=" text-[18px] text-center w-[540px] font-light text-accent">
            Use Lection for up to 5 hours per month - free of charge with no credit card required.
        </p>

</div>

<div class="w-full flex-grow justify-center flex pointer-events-auto">

    <div class="h-full w-[300px] mx-[14px]">
        <div class="w-full h-[480px] rounded-[20px] border-secondary border-[2px] mt-7 relative hover:-translate-y-[8px] transition-transform duration-200">

            <div class="w-full h-full bg-gradient-to-b from-stone-50 via-amber-50 to-secondary rounded-[20px] opacity-50 absolute z-0">
            </div>

            <div class="w-full h-full absolute z-10 text-darkgray">
                <div class="w-full h-full flex flex-col justify-end opacity-1">

                    <div class="w-full h-[23%] p-4 text-[25px]">
                        <h1 class=" font-normal mb-3">
                            Standard
                        </h1>

                        <h2 class=" font-normal mb-2">
                            $0 <span class="text-[15px] text-zinc-500">/month</span>
                        </h2>

                        <div class="w-full h-[2px] rounded-full bg-secondary"></div>
                    </div>

                    <div class="w-full h-[60%] p-2 pt-6">

                        <div class="w-full h-[30px] flex justify-between mb-1">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-secondary">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">5 Monthly Lectionary Hours</p>
                            </div>
                        </div>

                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-secondary">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Up To 10 Participants</p>
                            </div>
                        </div>

                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-secondary">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Real-Time Interaction</p>
                            </div>
                        </div>                    
                        
                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-secondary">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">In-Lecture Class Analysis</p>
                            </div>
                        </div>
                        


                    </div>

                    <div class="w-full h-[17%] p-4 pointer-events-auto">
                        <button on:click={() => {continueButtonPressed(1)}} class="w-full h-full bg-secondary rounded-[10px]">
                            <p class="text-white text-[14px] translate-y-[2px] font-semibold">
                                Continue For Free
                            </p>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="h-full w-[300px] mx-[14px]">
        <div class="w-full h-[480px] rounded-[20px] border-accent border-[2px] relative hover:-translate-y-[8px] transition-transform duration-200">

            <div class="w-full h-full bg-gradient-to-b from-stone-50 via-cyan-50 to-accent rounded-[20px] opacity-50 absolute z-0">
            </div>

            <div class="w-full h-full absolute z-10 text-darkgray">
                <div class="w-full h-full flex flex-col justify-end opacity-1">

                    <div class="w-full h-[23%] p-4 text-[25px]">
                        <h1 class=" font-normal mb-3">
                            Unlimited
                        </h1>

                        <h2 class=" font-normal mb-2">
                            $2 <span class="text-[15px] text-zinc-500">/month</span>
                        </h2>

                        <div class="w-full h-[2px] rounded-full bg-accent"></div>
                    </div>

                    <div class="w-full h-[60%] p-2 pt-6">

                        <div class="w-full h-[30px] flex justify-between mb-1">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-accent">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Everything in Standard, and: </p>
                            </div>
                        </div>

                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-accent">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Unlimited Lectionary Hours</p>
                            </div>
                        </div>

                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-accent">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Unlimited Participants</p>
                            </div>
                        </div>                    
                        
                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-accent">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Custom Class Grouping</p>
                            </div>
                        </div>

                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-accent">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Review Past Lectionaries</p>
                            </div>
                        </div>
                        


                    </div>

                    <div class="w-full h-[17%] p-4 pointer-events-auto">
                        <button on:click={() => {continueButtonPressed(2)}} class="w-full h-full bg-accent rounded-[10px]">
                            <p class=" text-white text-[14px] translate-y-[2px] font-semibold">
                                Get Started
                            </p>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="h-full w-[300px] mx-[14px]">
        <div class="w-full h-[480px] rounded-[20px] border-primary border-[2px] mt-7 relative hover:-translate-y-[8px] transition-transform duration-200">

            <div class="w-full h-full bg-gradient-to-b from-stone-50 via-slate-200 to-primary rounded-[20px] opacity-50 absolute z-0">
            </div>

            <div class="w-full h-full absolute z-10 text-darkgray">
                <div class="w-full h-full flex flex-col justify-end opacity-1">

                    <div class="w-full h-[23%] p-4 text-[25px]">
                        <h1 class=" font-normal mb-3">
                            Premium
                        </h1>

                        <h2 class=" font-normal mb-2">
                            $5 <span class="text-[15px] text-zinc-500">/month</span>
                        </h2>

                        <div class="w-full h-[2px] rounded-full bg-primary"></div>
                    </div>

                    <div class="w-full h-[60%] p-2 pt-6">

                        <div class="w-full h-[30px] flex justify-between mb-1">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-primary">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Everything in Unlimited, and:</p>
                            </div>
                        </div>

                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-primary">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Advanced In-Lecture Stats</p>
                            </div>
                        </div>

                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-primary">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Per-Student Growth Analytics</p>
                            </div>
                        </div>                    
                        
                        <div class="w-full h-[30px] flex justify-between my-3">

                            <div class="w-[55px] h-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-full h-full fill-primary">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>                              
                            </div>

                            <div class=" w-full h-full flex justify-start items-center pl-1">
                                <p class="text-[12px] text-nowrap">Priority Support</p>
                            </div>
                        </div>
                        


                    </div>

                    <div class="w-full h-[17%] p-4 pointer-events-auto">
                        <button on:click={() => {continueButtonPressed(3)}} class="w-full h-full bg-primary rounded-[10px]">
                            <p class=" text-white text-[14px] translate-y-[2px] font-semibold">
                                Coming Soon
                            </p>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
</div>