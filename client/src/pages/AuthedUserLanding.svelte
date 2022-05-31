<script lang="ts">
import { Route, Router } from "svelte-routing";
import SvgHello from "../components/SvgHello.svelte";

import type { Profile } from "../dbTypes";
import { currentProfile, user } from "../sessionStore";

import { supabase } from "../supabaseClient";
import Home from "./Home.svelte";

    let displayname: string = "";
    let showSetDisplayName = false;
    let updateDisplayNameErrorMessage = "";

    async function loadProfile() {
        const user = supabase.auth.user()
        if(user === null)
            throw new Error("Authentication error");

        const { data, error } = await supabase
            .from<Profile>('profiles')
            .select('*')
            .eq('id', user.id)

        if (error) throw error;
        
        if(data[0] === undefined){
            showSetDisplayName = true
            return
        }
        
        currentProfile.set(data[0])
    }


    const setDisplayName = async () => {
        updateDisplayNameErrorMessage = ""
        if(displayname.length <= 3){
            updateDisplayNameErrorMessage = "Display name must have a lenght greater than 3";
            return;
        }

        if(!$user) throw new Error("No active session")

        const newProfile: Profile = {
            id: $user.id ,
            updated_at: new Date(),
            displayname,
        }

        const { error } = await supabase
            .from<Profile>('profiles')
            .upsert(newProfile, {
                returning: "minimal"
            });

        if(error) throw error;

        currentProfile.set(newProfile)
        showSetDisplayName = false;
    }

    loadProfile();

</script>

{#await loadProfile}
    <div></div>
{:then} 
    {#if !showSetDisplayName}
        <Router>
            <Route component="{Home}" />
        </Router>
    {:else}
        <div class="wrapper">
            <div>
                <h1>Welcome!</h1>
                <p>Please provide a display name</p>
            </div>
            <div class="svg">
                <SvgHello />
            </div>
            <form class="form-wrapper" on:submit|preventDefault={setDisplayName}>
                <input 
                    placeholder="Name"
                    bind:value={displayname} 
                    type="text" />
                <input type="submit" value="Continue"/>
                <span>
                    {#if updateDisplayNameErrorMessage}
                        <p class="error-message">{updateDisplayNameErrorMessage}</p>
                    {/if}
                </span>
            </form>
        </div>
    {/if}
{:catch error}
    <div>{error}</div>
{/await}
<style>

    .wrapper {
        display: grid;
        align-items: center;
        justify-items: stretch;
        grid-template-rows: 1fr 8em min-content;
        padding: 1em;
        max-width: 80ch;
        margin: auto;
    }

    @media (min-height: 460px) and (min-width: 400px){
        .wrapper {
            padding: 3em;
        }
    }


    .svg {
        align-self: start;
        justify-self: center;
    }

    .form-wrapper {
        display: grid;
        gap: 0.5em;
    }

    .error-message {
        color: red;
        margin: 0;
    }

    input[type=text] {
        font-family: Tajawal;
        color: var(--black);
        background-color: transparent;
        border: 2px solid var(--primary);
        border-radius: 20px;
        padding: 0.3em 0.5em;
        box-sizing: content-box;
        font-size: 1em;
    }

    input[type=submit] {
        border: 0;
        font-family: Tajawal;
        color: var(--white);
        background-color: var(--action);
        font-size: 1em;
        padding: 0.3em 0.5em;
        border-radius: 20px;
      }
</style>