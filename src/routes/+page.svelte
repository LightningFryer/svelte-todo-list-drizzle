<script>
    import { page } from "$app/stores"
    import {signIn, signOut} from "@auth/sveltekit/client"
    import {AppBar} from "@skeletonlabs/skeleton"
    export const session = $page.data.session;
</script>

<body class="" data-theme="rocket">
    <nav class="absolute z-10 w-full min-h-fit">
        {#if session}
        <AppBar shadow="shadow-xl">
            <svelte:fragment slot="lead"><h1 class="text-2xl font-semibold">Todo List</h1></svelte:fragment>
            <svelte:fragment slot="trail">
                <button class="btn variant-filled-primary rounded" on:click={() => signOut()}>Logout</button>
            </svelte:fragment>
        </AppBar>
        {:else}
        <AppBar shadow="shadow-xl">
            <svelte:fragment slot="lead"><h1 class="text-2xl font-semibold">Todo List</h1></svelte:fragment>
            <svelte:fragment slot="trail">
                <button class="btn variant-filled-primary rounded" on:click={() => signIn("google", {callbackUrl: "/"})}>Login</button>
            </svelte:fragment>
        </AppBar>
        {/if}
    </nav>

    <main class="h-screen flex flex-col justify-center items-center space-y-6">
        <h1 class="text-5xl font-bold">Login to start your todo list.</h1>
        <button class="btn variant-filled-primary rounded">Login with Google</button>
    </main>
</body>