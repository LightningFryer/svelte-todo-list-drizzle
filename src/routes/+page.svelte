<script>

	import { goto } from "$app/navigation";
    import {signIn, signOut} from "@auth/sveltekit/client"
    import { AppBar, Avatar } from "@skeletonlabs/skeleton"
    
    export let data;
    export const session = data.session;
    export const todos = data.todos;
    let navBarHeight;

</script>

<body class="" data-theme="rocket">
    <nav class="absolute z-10 w-full min-h-fit" bind:clientHeight={navBarHeight}>
        {#if session}
        <AppBar shadow="shadow-xl">
            <svelte:fragment slot="lead"><h1 class="text-3xl font-bold">Todo List</h1></svelte:fragment>
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

    <main class="h-screen flex flex-col">
        {#if !session}
        <div class="h-full w-full flex flex-col justify-center items-center space-y-6">
            <h1 class="text-5xl font-bold">Login to start your todo list.</h1>
            <button class="btn variant-filled-primary rounded" on:click={() => signIn("google", {callbackUrl: "/"})}>Login with Google</button>
        </div>
        {:else}
            {#if todos?.length == 0}
                <div class="h-full w-full flex flex-col justify-center items-center space-y-6">
                    <h1 class="text-5xl font-bold">You're all caught up!</h1>
                    <button class="btn variant-filled-primary rounded" on:click={() => goto("/create")}>Create a new Todo</button>
                </div>
            {:else}
                <div class={` mt-[${navBarHeight}px] p-8 grid grid-cols-4 gap-6`}>
                    <div class="card card-hover rounded justify-center items-center">
                        <button class="h-full w-full btn variant-filled-secondary rounded text-xl font-bold" on:click={() => goto("/create")}>Create Todo</button>
                    </div>
                    {#each todos ?? [] as todo}
                        <form action="?/deleteTodo" method="post">
                            <input value="{todo.id}" name="todoId" class="hidden" />
                                <div class="">
                                    <div class="card card-hover rounded">
                                        <header class="card-header">
                                            <h2 class="text-2xl font-semibold">{todo.title}</h2>
                                        </header>
                                        <section class="p-4">
                                            <p>{todo.content}</p>
                                        </section>
                                        <footer class="card-footer text-end">
                                            <button class="btn variant-filled-error rounded" type="submit">Done</button>
                                        </footer>
                                    </div>
                                </div> 
                        </form>
                    {/each}
                </div>
            {/if}
        {/if}
    </main>
</body>