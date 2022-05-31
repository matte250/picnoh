<script lang="ts">
    import { Router, Route } from "svelte-routing";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    import { user } from "../sessionStore";
    import { supabase } from "../supabaseClient";
    import Login from "./Login.svelte";
    import AuthedUserLanding from "./AuthedUserLanding.svelte";

    let showLoading = localStorage.getItem("supabase.auth.token") !== null;
    onMount(() => user.set(supabase.auth.user()))

    supabase.auth.onAuthStateChange((_, session) => {
        user.set(session?.user ?? null)
        showLoading = false
    })
</script> 

<div class="site-wrapper">
{#if showLoading}
    <div out:fade="{{ duration: 200, delay: 200, }}" class="wrapper">
        <div class="loading-wrapper">
            <div>
                <h1>Picnoh</h1>
                <h2>Decisions made easy</h2>
            </div>
        </div>
    </div>
{:else}
    <div in:fly="{{ duration: 200, delay: 500, x: -500}}" class="wrapper" >
        {#if $user}
            <AuthedUserLanding />
        {:else}
            <Login />
        {/if}
    </div>
{/if}
</div>

<style>
    .site-wrapper {
        display: grid;
        width: 100%;
        height: 100%;
    }

    .wrapper {
        width: 100%;
        height: 100%;
    }

    .loading-wrapper {
        display: grid;
        justify-content: center;
    }

    .loading-wrapper > div {
        display: flex;
        flex-direction: column;
        padding: 5em;
    }
</style>