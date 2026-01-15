<script lang="ts">
  import { ArrowRight, Github, Twitter, Mail } from "lucide-svelte";
  import dayjs from "dayjs";
  import headshot from "$lib/assets/headshot.jpeg";

  let { data } = $props();
  let featuredPost = $derived(data.posts[0]);
  let recentPosts = $derived(data.posts.slice(1, 4));
</script>

<svelte:head>
  <title>Armand De Asis | Software Engineer</title>
</svelte:head>

<section class="max-w-[700px] mx-auto px-6 py-20 text-center">
  <div class="mb-10 inline-block">
    <img
      src={headshot}
      alt="Profile"
      class="w-32 h-32 rounded-full mx-auto border-2 border-slate-100 p-1 bg-white shadow-sm"
    />
  </div>

  <h1 class="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Armand</h1>

  <p class="text-lg text-slate-600 mb-10 max-w-[500px] mx-auto leading-relaxed">
    Software engineer exploring the intersection of AI, creative coding, and
    high-performance web applications.
  </p>

  <div class="flex flex-wrap justify-center gap-4 mb-16">
    <a
      href="/blog"
      class="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all"
    >
      Read Blog
    </a>
    <a
      href="/about"
      class="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
    >
      About
    </a>
  </div>

  <div class="flex justify-center gap-8 border-t border-slate-100 pt-10">
    <a
      href="https://github.com/amvd"
      target="_blank"
      rel="noreferrer"
      class="text-slate-400 hover:text-slate-900 transition-colors"
    >
      <Github size={20} />
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noreferrer"
      class="text-slate-400 hover:text-slate-900 transition-colors"
    >
      <Twitter size={20} />
    </a>
    <a
      href="mailto:hello@example.com"
      class="text-slate-400 hover:text-slate-900 transition-colors"
    >
      <Mail size={20} />
    </a>
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
      class="block group p-8 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-slate-200 transition-all"
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
