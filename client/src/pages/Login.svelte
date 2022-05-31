<script lang="ts">
import type { ApiError } from "@supabase/supabase-js";
import SvgLogin from "../components/SvgLogin.svelte";
import SvgSun from "../components/SvgSun.svelte";

    import {supabase} from "../supabaseClient";
  
    let loading = false
    let email: string;
    let apiError: ApiError | null = null;
    let showLinkSentMessage = false;

    const handleLogin = async () => {
        showLinkSentMessage = false;
        loading = true
        const { error } = await supabase.auth.signIn({ email })
        loading = false
        if (error) {
            apiError = error;
            return;
        }
        showLinkSentMessage = true;
    }
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <div class="container">
      <div>
        <h1>Picnoh</h1>
        <p>Sign in via magic link with your email below</p>
      </div>
      <div class="svg-wrapper">
        <SvgSun />
        <h2>
          Decisions made easy
        </h2>
      </div>
      <div class="error-container">
        {#if apiError}
          <p>{apiError.message}</p>
        {/if}
      </div>
      <div class="input-container"> 
        <input
          type="email"
          placeholder="Your email"
          bind:value={email}
        />
        <input type="submit" value={loading ? "Loading" : "Send magic link"} disabled={loading} />
      </div>
      <div>
      {#if showLinkSentMessage} 
        <p>Check your email for the login link!</p>
      {/if}
      </div>
    </div>
  </form>

  <style>
      .container {
        padding: 1em;
        max-width: 80ch;
        margin: auto;
        display: grid;
        grid-template-rows: 1fr 8em 2em 1fr 1em;
      }

      @media (min-height: 460px) and (min-width: 400px){
        .container {
            padding: 3em;
        }
      }

      .input-container {
        display: flex;
        flex-direction: column;
      }

      .error-container {
        text-align: left;
        font-size: 0.8em;
        height: 3em;
      }

      .error-container > p {
        margin: 0;
        color: red;
      }

      .svg-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      .svg-wrapper > h2 {
        padding: 1em;
      }
    
      form {
          height: 100%;
          width: 100%;
      }

      ::placeholder {
        color: var(--black);
      }
      
      input[type=email] {
        font-family: Tajawal;
        color: var(--black);
        background-color: transparent;
        border: 2px solid var(--primary);
        border-radius: 20px;
        padding: 0.3em 0.5em;
        margin-bottom: 1em;
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