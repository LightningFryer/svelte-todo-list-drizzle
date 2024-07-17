<script lang="ts">
    import { onNavigate } from "$app/navigation";

    onNavigate((navigation) => {
        // @ts-expect-error
        if (!document.startViewTransition){
            return   
        }

        return new Promise(resolve => {
            // @ts-ignore
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            })
        })
    })
</script>