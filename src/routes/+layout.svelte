<script lang="ts">
	import "../app.css";
	import { Menu, X } from "lucide-svelte";
	import { config } from "$lib/config";
	import { slide } from "svelte/transition";
	let { children } = $props();

	let isMenuOpen = $state(false);
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:border focus:border-slate-200 focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-medium"
>
	Skip to content
</a>

<header
	class="fixed top-0 left-0 right-0 h-[70px] flex items-center bg-white/80 backdrop-blur-md z-[100] border-b border-slate-100"
>
	<div
		class="max-w-[1000px] mx-auto px-6 flex justify-between items-center w-full"
	>
		<a
			href="/"
			class="text-xl font-bold text-slate-900 tracking-tight hover:opacity-70 transition-opacity focus-visible:outline-blue-500"
			aria-label="{config.name} home"
		>
			{config.name.toLowerCase()}
		</a>

		<nav class="hidden md:flex gap-8">
			<a
				href="/"
				class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
				>Home</a
			>
			<a
				href="/blog"
				class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
				>Blog</a
			>
			<a
				href="/about"
				class="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
				>About</a
			>
		</nav>

		<button
			class="md:hidden text-slate-500 hover:text-slate-900 transition-colors focus-visible:outline-blue-500 rounded-md p-1"
			onclick={() => (isMenuOpen = !isMenuOpen)}
			aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
			aria-expanded={isMenuOpen}
			aria-controls="mobile-nav"
		>
			{#if isMenuOpen}
				<X size={20} />
			{:else}
				<Menu size={20} />
			{/if}
		</button>
	</div>

	{#if isMenuOpen}
		<nav
			id="mobile-nav"
			transition:slide={{ duration: 200 }}
			class="md:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-slate-100 flex flex-col p-6 gap-4 shadow-sm"
		>
			<a
				href="/"
				onclick={() => (isMenuOpen = false)}
				class="text-sm font-medium text-slate-500 hover:text-slate-900 focus-visible:outline-blue-500 px-2 py-1 rounded"
				>Home</a
			>
			<a
				href="/blog"
				onclick={() => (isMenuOpen = false)}
				class="text-sm font-medium text-slate-500 hover:text-slate-900 focus-visible:outline-blue-500 px-2 py-1 rounded"
				>Blog</a
			>
			<a
				href="/about"
				onclick={() => (isMenuOpen = false)}
				class="text-sm font-medium text-slate-500 hover:text-slate-900 focus-visible:outline-blue-500 px-2 py-1 rounded"
				>About</a
			>
		</nav>
	{/if}
</header>

<main
	id="main-content"
	class="pt-[70px] min-h-screen outline-none"
	tabindex="-1"
>
	{@render children()}
</main>

<footer class="max-w-[700px] mx-auto px-6 py-12 border-t border-slate-50">
	<div
		class="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-xs text-center sm:text-left"
	>
		<p>&copy; {new Date().getFullYear()} {config.name.toLowerCase()}.</p>
		<p>Built with SvelteKit & Tailwind</p>
	</div>
</footer>
