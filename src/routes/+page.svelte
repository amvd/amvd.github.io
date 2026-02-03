<script lang="ts">
  import { ArrowRight, Github, Twitter, Mail, Linkedin } from "lucide-svelte";
  import dayjs from "dayjs";
  import headshot from "$lib/assets/headshot.jpeg?enhanced";
  import { config } from "$lib/config";

  let { data } = $props();
  let featuredPost = $derived(data.posts[0]);
  let recentPosts = $derived(data.posts.slice(1, 4));
</script>

<svelte:head>
  <title>{config.title}</title>
</svelte:head>

<section class="max-w-[700px] mx-auto px-6 py-20 text-center">
  <div class="mb-10 inline-block">
    <enhanced:img
      src={headshot}
      alt="Headshot of {config.fullName}"
      class="w-48 h-48 rounded-full mx-auto border-2 border-slate-100 p-1 bg-white shadow-sm"
    />
  </div>

  <h1 class="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
    {config.fullName}
  </h1>

  <p class="text-lg text-slate-600 mb-10 max-w-[500px] mx-auto leading-relaxed">
    {config.description}
  </p>

  <div class="flex flex-wrap justify-center gap-4 mb-4">
    <a
      href="/about"
      class="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
    >
      About
    </a>
    <a
      href="/blog"
      class="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
    >
      Blog
    </a>
  </div>

  <div class="flex flex-wrap justify-center gap-4 mb-16">
    <a
      href="/resume"
      class="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all"
    >
      Resume
    </a>
  </div>

  <div class="flex justify-center gap-8 border-t border-slate-100 pt-10">
    {#if config.contact.github}
      <a
        href={config.contact.github}
        target="_blank"
        rel="noreferrer"
        class="text-slate-400 hover:text-slate-900 transition-colors focus-visible:outline-blue-500 rounded p-1"
        aria-label="GitHub Profile"
      >
        <Github size={20} />
      </a>
    {/if}
    {#if config.contact.twitter}
      <a
        href={config.contact.twitter}
        target="_blank"
        rel="noreferrer"
        class="text-slate-400 hover:text-slate-900 transition-colors focus-visible:outline-blue-500 rounded p-1"
        aria-label="Twitter Profile"
      >
        <Twitter size={20} />
      </a>
    {/if}
    {#if config.contact.linkedin}
      <a
        href={config.contact.linkedin}
        target="_blank"
        rel="noreferrer"
        class="text-slate-400 hover:text-slate-900 transition-colors focus-visible:outline-blue-500 rounded p-1"
        aria-label="LinkedIn Profile"
      >
        <Linkedin size={20} />
      </a>
    {/if}
    {#if config.contact.email}
      <a
        href="mailto:{config.contact.email}"
        class="text-slate-400 hover:text-slate-900 transition-colors focus-visible:outline-blue-500 rounded p-1"
        aria-label="Email {config.fullName}"
      >
        <Mail size={20} />
      </a>
    {/if}
  </div>
</section>

{#if featuredPost}
  <section class="max-w-[700px] mx-auto px-6 mb-20">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-sm uppercase tracking-widest text-slate-400 font-bold">
        Latest Entry
      </h2>
    </div>
    <a
      href="/blog/{featuredPost.slug}"
      class="block group p-6 sm:p-8 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-slate-200 transition-all"
    >
      <span class="text-xs text-slate-400 mb-2 block"
        >{dayjs(featuredPost.date).format("MMMM D, YYYY")}</span
      >
      <h3
        class="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors"
      >
        {featuredPost.title}
      </h3>
      <p class="text-slate-600 text-sm mb-4 line-clamp-2">
        {featuredPost.description ||
          "A deep dive into building with modern web tools."}
      </p>
      <span class="text-sm font-semibold flex items-center gap-2 text-slate-900"
        >Read Post <ArrowRight
          size={14}
          class="group-hover:translate-x-1 transition-transform"
        /></span
      >
    </a>
  </section>
{/if}
