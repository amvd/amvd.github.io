<script lang="ts">
  import dayjs from "dayjs";
  import { ArrowRight } from "lucide-svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Blog | amvd</title>
</svelte:head>

<section class="max-w-[700px] mx-auto px-6 py-20">
  <header class="mb-16">
    <h1 class="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
      Writing
    </h1>
    <p class="text-slate-500">
      Thoughts on engineering, design, and everything in between.
    </p>
  </header>

  <div class="flex flex-col gap-12">
    {#each data.posts as post}
      <article class="group">
        <span class="text-xs text-slate-400 mb-2 block"
          >{dayjs(post.date).format("MMMM D, YYYY")}</span
        >
        <a href="/blog/{post.slug}" class="block">
          <h2
            class="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors"
          >
            {post.title}
          </h2>
        </a>
        <p class="text-slate-600 mb-4 leading-relaxed">
          {post.description ||
            "Exploring the boundaries of web development and creative coding."}
        </p>
        <a
          href="/blog/{post.slug}"
          class="text-sm font-semibold flex items-center gap-1 text-slate-900 group-hover:gap-2 transition-all"
        >
          Read Post <ArrowRight size={14} />
        </a>
      </article>
    {/each}
  </div>
</section>
