<script lang="ts">
    import { fade } from 'svelte/transition'
    import { page } from '$app/stores'
    import { signOut } from '@auth/sveltekit/client';

    //profile option popups
    import Firstname from '../../../components/ProfilePopups/firstname.svelte';
    import Lastname from '../../../components/ProfilePopups/lastname.svelte';
    import Photo from '../../../components/ProfilePopups/photo.svelte';
    import Migrate from '../../../components/ProfilePopups/migrate.svelte';
    import Password from '../../../components/ProfilePopups/password.svelte';
    import Email from '../../../components/ProfilePopups/email.svelte';
    import Delete from '../../../components/ProfilePopups/delete.svelte';



    let backgroundSpacer: Element
    let currentPage: string = 'general'
    let currentOptionsMenu: string = 'none'
    let parentPage: any

    /**
   * @param {number} pageNumber
   */
    function changePage (pageNumber: number) {
        if (pageNumber == 1) {
            backgroundSpacer.className = ""
            backgroundSpacer.classList.add("h-full", "w-0", "transition-all", "ease-in-out", "duration-200")
            currentPage = 'general'
        }

        if (pageNumber == 2) {
            backgroundSpacer.className = ""
            backgroundSpacer.classList.add("h-full", "w-1/3", "p-2", "transition-all", "ease-in-out", "duration-200")
            currentPage = 'account'
        }

        if (pageNumber == 3) {
            backgroundSpacer.className = ""
            backgroundSpacer.classList.add("h-full", "w-2/3", "p-2", "transition-all", "ease-in-out", "duration-200")
            currentPage = 'billing'
        }

    }

    function changeOptionsMenu (option: string) {
        currentOptionsMenu = option
        parentPage.classList.toggle('blur-[3px]')
    }

    function closeOptionsMenu () {
        currentOptionsMenu = 'none'
        parentPage.classList.toggle('blur-[3px]')
    }
    
</script>

<div id="parentPage" bind:this={parentPage} class="w-full h-full absolute z-10  overflow-hidden font-poppins flex flex-col bg-white text-darkgray duration-50">

<div id="settingsnavbar">
    <div class="w-full h-[107px]">
    </div>
    
    <div class="w-full h-[65px] pl-4">
        <div class="w-[380px] h-full rounded-[15px] border-2 border-accent flex relative">
    
            <div class="w-full h-full flex absolute z-10">
    
                <div class="w-1/3 h-full p-2">
                    <div class="w-full h-full rounded-[15px]">
                        <div class="w-full h-full flex items-center justify-center">
                            <button on:click={() => {changePage(1)}}>
                                <p class=" translate-y-[1px] font-medium text-darkgray">
                                    General
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
        
                <div class="w-1/3 h-full p-2">
                    <div class="w-full h-full rounded-[15px]">
                        <div class="w-full h-full flex items-center justify-center">
                            <button on:click={() => {changePage(2)}}>
                                <p class=" translate-y-[1px] font-medium text-darkgray">
                                    Account
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
        
                <div class="w-1/3 h-full p-2">
                    <div class="w-full h-full rounded-[15px]">
                        <div class="w-full h-full flex items-center justify-center">
                            <button on:click={() => {changePage(3)}}>
                                <p class=" translate-y-[1px] font-medium text-darkgray">
                                    Billing
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
    
            </div>
    
            <div class="w-full h-full flex absolute z-0">
    
                <div class="h-full w-0 transition-all ease-in-out duration-200" bind:this={backgroundSpacer}>
                </div>
    
                <div class="w-1/3 h-full p-2 transition-all ease-in-out duration-150">
                    <div class="w-full h-full rounded-[15px] bg-gray2">
                    </div>
                </div>
    
            </div>
    
    
    
        </div>
    </div>
</div>

<div class="w-full flex-grow p-4">
{#key currentPage}
  <div class="relative w-full h-full">
    {#if currentPage === 'general'}

        <div class="w-full h-full flex flex-col absolute">

        <h1 class="text-[40px] font-medium mb-2 pl-3">General</h1>

        <p class="text-[17px] text-accent font-medium mb-6 pl-3">Manage basic details & preferences here</p>

        <div class="w-full flex-grow">
            <div class="w-full h-full">

                <div class="w-full h-full relative">

                    <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                    <div class=" h-[80px] flex relative pr-4 ">
        
                            <div class="w-[20%] h-full flex items-center pl-3">
                                <p class=" font-medium text-[19px]">First Name</p>
                            </div>
        
                            <div class="w-[71%] h-full pl-24 flex items-center">
                                <p class=" font-medium text-[19px]">{(($page.data.session?.user?.firstname)?.split(' ')[0] || '').replace(/\s/g, '').replace(/^(.)(.*)$/, (_, first, rest) => first.toUpperCase() + rest.toLowerCase())}</p>
                            </div>
        
                            <div class="w-[9%] h-full flex items-center justify-end">
                                <button on:click={() => {changeOptionsMenu('firstname')}} class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                                    <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                                </button>
                            </div>
        
                    </div>
        
                    <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                    <div class="h-[80px] flex relative pr-4">
        
                        <div class="w-[20%] h-full flex items-center pl-3">
                            <p class=" font-medium text-[19px]">Last Name</p>
                        </div>
    
                        <div class="w-[71%] h-full pl-24 flex items-center">
                            <p class=" font-medium text-[19px]">{(($page.data.session?.user?.lastname)?.split(' ')[0] || '').replace(/\s/g, '').replace(/^(.)(.*)$/, (_, first, rest) => first.toUpperCase() + rest.toLowerCase())}</p>
                        </div>
    
                        <div class="w-[9%] h-full flex items-center justify-end">
                            <button on:click={() => {changeOptionsMenu('lastname')}} class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                                <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                            </button>
                        </div>
    
                    </div>

                    <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                    <div class=" h-[160px] flex relative pr-4">
        
                        <div class="w-[20%] h-full flex items-center pl-3">
                            <p class=" font-medium text-[19px]">Photo</p>
                        </div>
    
                        <div class="w-[71%] h-full pl-24 flex items-center">
                            <div class="w-[100px] aspect-square bg-neutral-400 rounded-[10px] border-[3px] border-gray2 flex justify-center items-center overflow-hidden">
                                <img alt="current profile" src={$page.data.session?.user?.image} class="w-full h-full"/>

                            </div>
                        </div>
    
                        <div class="w-[9%] h-full flex items-center justify-end">
                            <button on:click={() => {changeOptionsMenu('photo')}} class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                                <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                            </button>
                        </div>
    
                    </div>

                    


                </div>

            </div>
        </div>

        </div>

    {:else if currentPage === 'account'}

        <div class="w-full h-full flex flex-col absolute">

        <h1 class="text-[40px] font-medium mb-2 pl-3">Account</h1>

        <p class="text-[17px] text-accent font-medium mb-6 pl-3">Manage account details & preference here</p>

        <div class="w-full flex-grow">
            <div class="w-full h-full">

                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                {#if ($page.data.session?.user?.accountType) === 'external'}
                <div class="w-full h-[80px] flex relative pr-4">

                    <div class="w-[20%] h-full flex items-center pl-3">
                        <p class=" font-medium text-[19px]">Account Type</p>
                    </div>

                    <div class="w-[71%] h-full pl-24 flex items-center">
                        <p class=" font-medium text-[19px]">External</p>
                    </div>

                    <div class="w-[9%] h-full flex items-center justify-end">
                        <button on:click={() => {changeOptionsMenu('migrate')}} class=" h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100 px-2">
                            <p class="text-[15px] font-medium translate-y-[1px] text-nowrap">Migrate Account</p>
                        </button>
                    </div>

                </div>
                {/if}

                {#if ($page.data.session?.user?.accountType) === 'internal'}
                <div class="w-full h-[80px] flex relative pr-4">

                    <div class="w-[20%] h-full flex items-center pl-3">
                        <p class=" font-medium text-[19px]">Account Type</p>
                    </div>

                    <div class="w-[71%] h-full pl-24 flex items-center">
                        <p class=" font-medium text-[19px]">Internal</p>
                    </div>

                </div>
                {/if}

                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                <div class="w-full h-[80px] flex relative pr-4">

                    <div class="w-[20%] h-full flex items-center pl-3 ">
                        <p class=" font-medium text-[19px]">Email</p>
                    </div>

                    <div class="w-[71%] h-full pl-24 flex items-center ">
                        <p class=" font-medium text-[19px]">{$page.data.session?.user?.email}</p>
                    </div>

                    {#if ($page.data.session?.user?.accountType) === 'external'}
                    <div class="w-[9%] h-full flex items-center justify-end group">

                        <button disabled class="peer disabled:opacity-35 disabled:cursor-not-allowed w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary enabled:active:scale-95 transition-all duration-100">
                            <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                        </button>
                        
                        <div class="peer-disabled:peer-hover:opacity-100 opacity-0 p-3 absolute -translate-x-20 text-nowrap text-darkgray font-medium text-[15px] text-center rounded-[10px] bg-gray1 duration-100">
                            Please migrate your account to change email
                        </div>


                    </div>
                    {/if}
                    {#if ($page.data.session?.user?.accountType) === 'internal'}
                    <div class="w-[9%] h-full flex items-center justify-end">
                        <button on:click={() => {changeOptionsMenu('email')}} class=" w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                            <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                        </button>
                    </div>
                    {/if}

                </div>

                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                <div class="w-full h-[80px] flex relative p-3 mt-3 justify-start font-medium text-darkgray">

                    <div class="w-[19%] h-full px-2">
                        <button on:click={() => {changeOptionsMenu('delete')}} class="w-full h-full bg-darkred bg-opacity-5 border-darkred border-[2px] rounded-[15px] active:bg-opacity-10 duration-100 active:scale-[98%]">
                            Delete Account
                        </button>
                    </div>
                    <div class="w-[19%] h-full px-2 relative">
                        {#if ($page.data.session?.user?.accountType) === 'internal'}
                            <button on:click={() => {changeOptionsMenu('password')}} class="peer disabled:opacity-35 disabled:cursor-not-allowed w-full h-full bg-secondary bg-opacity-10 border-secondary border-[2px] rounded-[15px] enabled:active:bg-opacity-25 duration-100 enabled:active:scale-[98%]">
                                Change Password
                            </button>
                            {:else}
                            <button disabled class=" peer disabled:opacity-35 disabled:cursor-not-allowed w-full h-full bg-secondary bg-opacity-10 border-secondary border-[2px] rounded-[15px] enabled:active:bg-opacity-25 duration-100 enabled:active:scale-[98%]">
                                Change Password
                            </button>
                            <div class="w-full h-full peer-disabled:peer-hover:opacity-100 opacity-0 absolute flex justify-center items-center duration-100">
                                <div class="p-3 text-darkgray font-medium text-[15px] text-center text-nowrap rounded-[10px] bg-gray1 translate-y-3">
                                    Please migrate your account to change password
                                </div>
                            </div>
                        {/if}
                    </div>
                    <div class="w-[19%] h-full px-2">
                        <button on:click={() => {signOut()}} class="w-full h-full bg-secondary bg-opacity-10 border-secondary border-[2px] rounded-[15px] active:bg-opacity-25 duration-100 active:scale-[98%]">
                            Sign-Out
                        </button>
                    </div>

                </div>


            </div>
        </div>
        </div>

    {:else if currentPage === 'billing'}

        <div class="w-full h-full flex flex-col absolute">

        <h1 class="text-[40px] font-medium mb-2 pl-3">Billing</h1>

        <p class="text-[17px] text-accent font-medium mb-6 pl-3">Manage billings details & preferences here</p>

        <div class="w-full flex-grow">
            <div class="w-full h-full">
                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>

                <div class="w-full h-[80px] flex relative">

                    <div class="w-[20%] h-full flex items-center pl-3">
                        <p class=" font-medium text-[19px]">First Name</p>
                    </div>

                    <div class="w-[71%] h-full pl-24 flex items-center">
                        <p class=" font-medium text-[19px]">{$page.data.session?.user?.firstname}</p>
                    </div>

                    <div class="w-[9%] h-full flex items-center justify-center">
                        <button class="w-[55px] h-[40px] bg-white rounded-[10px] border-[2px] border-secondary active:scale-90 transition-all duration-100">
                            <p class="text-[15px] font-medium translate-y-[1px]">Edit</p>
                        </button>
                    </div>

                </div>

                <div class="w-[95%] h-[2px] bg-gray1 rounded-full"></div>
            </div>
        </div>
        </div>

    {/if}
  </div>
{/key}
</div>


</div>

{#if currentOptionsMenu === 'firstname'}
<Firstname on:closePopup={closeOptionsMenu}/>
{/if}

{#if currentOptionsMenu === 'lastname'}
<Lastname on:closePopup={closeOptionsMenu}/>
{/if}

{#if currentOptionsMenu === 'photo'}
<Photo on:closePopup={closeOptionsMenu}/>
{/if}

{#if currentOptionsMenu === 'migrate'}
<Migrate on:closePopup={closeOptionsMenu}/>
{/if}

{#if currentOptionsMenu === 'password'}
<Password on:closePopup={closeOptionsMenu}/>
{/if}

{#if currentOptionsMenu === 'email'}
<Email on:closePopup={closeOptionsMenu}/>
{/if}

{#if currentOptionsMenu === 'delete'}
<Delete on:closePopup={closeOptionsMenu}/>
{/if}


