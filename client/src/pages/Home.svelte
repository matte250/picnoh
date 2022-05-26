<script lang="ts">
    import { user } from "../sessionStore"
</script>

<div>
    <span>
        <p>Welcome&nbsp;</p>
        <p class="email">{$user?.email}!</p>
    </span>
    
</div>

<style>
    p {
        color: var(--black)
    }

    .email {
        color: var(--action)
    }
</style>