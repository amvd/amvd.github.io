<script lang="ts">
	import "../app.css";
	import { Menu, X } from "lucide-svelte";
	import { config } from "$lib/config";
	let { children } = $props();

	let isMenuOpen = $state(false);
</script>

<header
	class="fixed top-0 left-0 right-0 h-[70px] flex items-center bg-white/80 backdrop-blur-md z-[100] border-b border-slate-100"
>
	<div
		class="max-w-[1000px] mx-auto px-6 flex justify-between items-center w-full"
	>
		<a
			href="/"
			class="text-xl font-bold text-slate-900 tracking-tight hover:opacity-70 transition-opacity"
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
			class="md:hidden text-slate-500 hover:text-slate-900 transition-colors"
			onclick={() => (isMenuOpen = !isMenuOpen)}
			aria-label="Toggle Menu"
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
			class="md:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-slate-100 flex flex-col p-6 gap-4 shadow-sm"
		>
			<a
				href="/"
				onclick={() => (isMenuOpen = false)}
				class="text-sm font-medium text-slate-500 hover:text-slate-900">Home</a
			>
			<a
				href="/blog"
				onclick={() => (isMenuOpen = false)}
				class="text-sm font-medium text-slate-500 hover:text-slate-900">Blog</a
			>
			<a
				href="/about"
				onclick={() => (isMenuOpen = false)}
				class="text-sm font-medium text-slate-500 hover:text-slate-900">About</a
			>
		</nav>
	{/if}
</header>

<main class="pt-[70px] min-h-screen">
	{@render children()}
</main>

<footer class="max-w-[700px] mx-auto px-6 py-12 border-t border-slate-50">
	<div class="flex justify-between items-center text-slate-400 text-xs">
		<p>&copy; {new Date().getFullYear()} {config.name.toLowerCase()}.</p>
		<p>Built with SvelteKit & Tailwind</p>
	</div>
</footer>
