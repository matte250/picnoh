<script lang="ts">
    import SvgLogout from "../components/SvgLogout.svelte"
import { currentProfile, user } from "../sessionStore"
    import { supabase } from "../supabaseClient"
</script>

<div class="container">
    <div class="menu">
        <h1>Picnoh</h1>
        <span class="header">
            <h2>{$currentProfile.displayname}</h2>
            <button class="signout" on:click="{() => supabase.auth.signOut()}">
                <SvgLogout width="1em" height="1em"/>
            </button>
        </span>
    </div>
    <div class="divider">
        <div />
    </div>
    <div class="card-container">
        <div class="card">
            <div class="card-footer"> 
                <p class="card-title">Hovås Pizzeria</p> 
                <div class="card-tag-container">
                    <span class="card-tag">Pizza</span>
                    <span class="card-tag">Kebab</span>
                    <span class="card-tag">Thai</span>
                    <span class="card-tag">Vegansk</span>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    p {
        margin: 0;
    }

    .signout {
        border: 0;
        background-color: transparent;
        display: grid;
        margin-left: 1ch;
    }

    .container {
        padding: 1em;
        margin: auto;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 10em 2em 1fr;
    }

    @media (max-aspect-ratio: 6/5) {
        .container {
            grid-template-columns: 1fr;
            grid-template-rows: 15% 0 1fr;
            gap: 0.5em;
        }
    }

    .menu {
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header, h2 {
        color: var(--black);
        font-size: 100%
    }

    .divider {

    }

    .divider > div {
        content: "";
        width: 0.1em;
        height: 100%;
        background-color: var(--action);
        margin: auto;
        border-radius: 20px;
    }

    .card-container {
        display: grid;
        justify-items: center;
        align-items: center;
    }

    .card {
        border-radius: 1em;
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: center;
        background-image: linear-gradient(180deg, transparent, 80%, var(--black) 90%), url("https://media-cdn.tripadvisor.com/media/photo-s/0c/c7/67/9f/dsc-0010-4-largejpg.jpg");
        display: flex;
        align-items: flex-end;
    }

    @media screen and (min-width: 60ch), 
            screen and (min-height: 120ch) {
        .card {
            height: min(100%, 50ch);
            width: min(100%, 30ch);
        }
    }

    .card-footer {
        padding: 1em;
    }

    .card-title {
        color: var(--white)
    }

    .card-tag-container {
        margin-top: 0.25em;
        display: flex;
        flex-wrap: wrap;
        gap: 0.25em;
    }

    .card-tag {
        border: solid 1px var(--white);
        color: var(--white);
        font-family: Tajawal;
        font-size: 0.8rem;
        padding: 0.2em 0.8em;
        border-radius: 1em;
    }

</style>