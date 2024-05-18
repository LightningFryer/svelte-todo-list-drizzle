<script lang="ts">
	// import SuperDebug, { superForm } from "sveltekit-superforms";
    export let data;
    const session = data.session;
</script>

<body data-theme="rocket">
    <main class="h-screen flex flex-col justify-center items-center">
        <form action="?/createTodo" method="POST" class="h-[50%] w-[20%] flex flex-col justify-center p-7 bg-surface-800 rounded gap-4">
            <h1 class="text-center text-2xl font-extrabold">Create a new Todo</h1>
            <div>
                <label class="label" for="title">
                    <span>Title</span>
                    <input name="title" class="input rounded p-2" type="text" placeholder="Enter a title"  />
                </label>
            </div>
            
            <div>
                <label class="label" for="content">
                    <span>Content</span>
                    <textarea name="content" class="textarea rounded p-2" placeholder="Enter content for todo"  />
                </label>
            </div>
            <button type="submit" class="btn variant-filled-primary rounded">Create</button>
        </form>
    
    </main>
</body>