<script lang="ts">
    import {signIn, signOut} from '@auth/sveltekit/client'
    import { page } from '$app/stores'
</script>
<div class="w-svw h-svh">
    <div class="w-full h-full bg-gray-300 flex flex-col items-center justify-center text-[30px] font-serif font-bold text-slate-800">
        <h1>Membership lvl {$page.data.session?.user?.membershipLevel}</h1>
        <div class="w-1/2 bg-slate-500">
        <button class=" bg-white p-4 left-0" on:click={() => signIn('google', { prompt: 'login' })}>Sign-in</button>
        <button class=" bg-white p-4 right-0" on:click={() => {signOut()}}>Signout</button>
        {#if $page.data.session}
            <p>Signed in as: {$page.data.session?.user?.name} ({$page.data.session.user?._id})</p>
            <img src={$page.data.session.user?.image} alt="profile" class=" size-24">
            <button on:click={() => {console.log($page.data)}}>
                log info
            </button>
        {/if}
        </div>
    </div>
</div>