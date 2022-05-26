<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import { onMount } from "svelte";

    import { user } from "../sessionStore";
    import { supabase } from "../supabaseClient";
    import Login from "./Login.svelte";
    import Home from "./Home.svelte";


    onMount(() => user.set(supabase.auth.user()))
    supabase.auth.onAuthStateChange((_, session) => {
        user.set(session?.user ?? null)
    })
</script>
{#if $user}
<Router>
    <Route path="*" component="{Home}" />
</Router>
{:else}
    <Login />
{/if}