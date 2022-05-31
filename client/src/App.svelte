<script lang="ts">
import Landing from "./pages/Landing.svelte";

</script>

<main>
	<Landing />
</main>

<style global>
	@import "normalize.css";

	:root {
 		--white: #F7FFFD;
  		--black: #1A535C;
		--action: #FF6B6B;
		--primary: #4ECDC4;
		--secondary: #FFE66D;
	}

	html, body, main {
		width: 100%;
		height: 100%;
	}

	body {
		font-size: 1em;
		background-color: var(--white);
	}

	@media (min-width: 600px) and (min-height: 600px) {
		body  {
			font-size: 1.5em;
		}
	}

	h1 { 
        font-family: Josefin Sans;
        color: var(--action);
		margin: 0;
	}

	h2 { 
        font-family: Josefin Sans;
        color: var(--action);
		margin: 0;
	}

	p {
		font-family: Tajawal;
		color: var(--black);
	}
</style>