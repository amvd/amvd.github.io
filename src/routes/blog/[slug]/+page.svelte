<script lang="ts">
  import dayjs from "dayjs";
  import { ArrowLeft } from "lucide-svelte";
  import MarkdownIt from "markdown-it";

  let { data } = $props();
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  let renderedContent = $derived(md.render(data.post.content));
</script>

<svelte:head>
  <title>{data.post.meta.title} | amvd</title>
</svelte:head>

<article class="pb-32">
  <div class="max-w-[700px] mx-auto px-6">
    <a
      href="/blog"
      class="inline-flex items-center gap-2 text-slate-400 mb-12 text-sm font-medium hover:text-slate-900 transition-colors"
    >
      <ArrowLeft size={16} /> Back to Blog
    </a>

    <header class="mb-16">
      <div
        class="mb-6 text-xs text-slate-400 font-bold uppercase tracking-widest"
      >
        {dayjs(data.post.meta.date).format("MMMM D, YYYY")}
      </div>
      <h1
        class="text-4xl md:text-5xl font-bold mb-8 leading-[1.1] text-slate-900 tracking-tight"
      >
        {data.post.meta.title}
      </h1>
      <div class="flex gap-2">
        {#if data.post.meta.categories}
          {#each data.post.meta.categories.split(" ") as cat}
            <span
              class="text-xs bg-slate-50 px-3 py-1 rounded-full text-slate-500 border border-slate-100 uppercase tracking-wider font-semibold"
            >
              {cat}
            </span>
          {/each}
        {/if}
      </div>
    </header>

    <div
      class="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:underline prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-100 prose-pre:rounded-xl"
    >
      {@html renderedContent}
    </div>
  </div>
</article>
