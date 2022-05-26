<script lang="ts">
import type { ApiError } from "@supabase/supabase-js";

    import {supabase} from "../supabaseClient";
  
    let loading = false
    let email: string;
    let apiError: ApiError | null = null;
    let loginSuccess = false;

    const handleLogin = async () => {
        loading = true
        const { error } = await supabase.auth.signIn({ email })
        loading = false
        if (error) {
            apiError = error;
            return;
        }
        loginSuccess = true;
    }
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <div class="container">
      <h1>Picnoh</h1>
      <p>Sign in via magic link with your email below</p>
      <div class="input-container"> 
      <input
        class="inputField"
        type="email"
        placeholder="Your email"
        bind:value={email}
      />
      <input type="submit" value={loading ? "Loading" : "Send magic link"} disabled={loading} />
      </div>
    </div>
  </form>

  <style>
      .container {
        padding: 20px;
        display: flex;
        flex-direction: column;
        text-align: center;
        max-width: 500px;
        margin: auto;
      }

      .input-container {
        display: flex;
        flex-direction: column;
      }
    
      form {
          height: 100%;
          width: 100%;
      }

      p {
        margin-bottom: 20px;
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
        padding: 5px 10px;
        margin-bottom: 10px;
      }

      input[type=submit] {
        border: 0;
        font-family: Tajawal;
        color: var(--white);
        background-color: var(--action);
        font-size: 20px;
        padding: 5px;
        border-radius: 20px;
      }
  </style>