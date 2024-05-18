<script>
	import { goto } from "$app/navigation";
    import {signIn, signOut} from "@auth/sveltekit/client"
    import { AppBar, Avatar } from "@skeletonlabs/skeleton"
    
    export let data;
    export const session = data.session;
    export const todos = data.todos;
</script>

<body class="" data-theme="rocket">
    <nav class="absolute z-10 w-full min-h-fit">
        {#if session}
        <AppBar shadow="shadow-xl">
            <svelte:fragment slot="lead"><h1 class="text-2xl font-semibold">Todo List</h1></svelte:fragment>
            <svelte:fragment slot="trail">
                <Avatar src={`${session.user?.image}`} alt="user_img" width="max-w-12" />
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
        {#if !session}
            <h1 class="text-5xl font-bold">Login to start your todo list.</h1>
            <button class="btn variant-filled-primary rounded" on:click={() => signIn("google", {callbackUrl: "/"})}>Login with Google</button>
        {:else}
            {#if todos?.length == 0}
                <h1 class="text-5xl font-bold">You're all caught up!</h1>
                <button class="btn variant-filled-primary rounded" on:click={() => goto("/create")}>Create a new Todo</button>
            {:else}
                {#each todos as todo}
                <h1>{todo.title}</h1>
                {/each}
            {/if}
        {/if}
    </main>
</body>