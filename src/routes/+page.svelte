<script>
    import { AppBar, Avatar, popup } from "@skeletonlabs/skeleton"
    import { Check } from "lucide-svelte"
    import { popupUserIconHover } from "$lib/popupSettings"
    import PopupUserIconHover from "$lib/components/PopupUserIconHover.svelte"
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
    
    export let data;
    const user = data.user;
    const session = data.session;
    const todos = data?.todos;

</script>
					
<PopupUserIconHover userName={user?.username}/>
<body class="flex flex-col" data-theme="rocket">
    <nav class="absolute z-10 w-full min-h-fit">
        {#if session}
        <AppBar shadow="shadow-xl">
            <svelte:fragment slot="lead"><h1 class="text-3xl font-bold">Todo List</h1></svelte:fragment>
            <svelte:fragment slot="trail">
                <div use:popup={popupUserIconHover}>
                    <Avatar src={`${user?.picture}`} alt="user_img" width="max-w-12" />
                </div>
                <form action="?/logout" method="post">
                    <button class="btn variant-filled-primary rounded" type="submit">Logout</button>
                 </form>
            </svelte:fragment>
        </AppBar>
        {:else}
        <AppBar shadow="shadow-xl">
            <svelte:fragment slot="lead"><h1 class="text-2xl font-semibold">Todo List</h1></svelte:fragment>
            <svelte:fragment slot="trail">
                <a class="btn variant-filled-primary rounded" href="/login/google">Login</a>
            </svelte:fragment>
        </AppBar>
        {/if}
    </nav>

    <main class="h-screen flex flex-col">
        {#if !session}
        <div class="h-full w-full flex flex-col justify-center items-center space-y-6">
            <h1 class="text-3xl lg:text-5xl font-bold text-center">Login to start your todo list.</h1>
            <a class="btn variant-filled-primary rounded" href="/login/google">Login with Google</a>
        </div>
        {:else}
            {#if todos?.length == 0}
                <div class="h-full w-full flex flex-col justify-center items-center space-y-6">
                    <h1 class="text-3xl lg:text-5xl font-bold text-center">You're all caught up!</h1>
                    <button class="btn variant-filled-primary rounded" on:click={() => goto("/create")}>Create a new Todo</button>
                </div>
            {:else}
                <div class={` mt-[80px] p-8 grid lg:grid-cols-4 gap-6`}>
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
                                            <p>{todo.description}</p>
                                        </section>
                                        <footer class="card-footer text-end">
                                            <button class="btn-icon variant-filled-success rounded" type="submit">
                                                <Check size={24}/>
                                            </button>
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