<script lang="ts">
  import dayjs from "dayjs";
  import { ArrowLeft, X } from "lucide-svelte";
  import MarkdownIt from "markdown-it";
  import container from "markdown-it-container";
  import { fade, scale } from "svelte/transition";

  import { imageRegistry } from "$lib/images";

  let { data } = $props();

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  // Custom containers for figures and captions
  md.use(container as any, "figure", {
    render: function (tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<figure class="not-prose my-12 flex flex-col items-center">';
      } else {
        return "</figure>";
      }
    },
  });

  md.use(container as any, "caption", {
    render: function (tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        return '<figcaption class="text-sm text-slate-500 text-center italic max-w-[500px] leading-relaxed">';
      } else {
        return "</figcaption>";
      }
    },
  });

  // Custom image rule to resolve slugs from the imageRegistry
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const srcIndex = token.attrIndex("src");

    if (srcIndex !== -1 && token.attrs) {
      const src = token.attrs[srcIndex][1];
      if (imageRegistry[src]) {
        token.attrs[srcIndex][1] = imageRegistry[src];
      }
    }

    return defaultRender(tokens, idx, options, env, self);
  };

  // Custom link rule to open external links in a new tab
  const defaultLinkRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const aIndex = tokens[idx].attrIndex("href");
    if (aIndex >= 0 && tokens[idx].attrs) {
      const href = tokens[idx].attrs[aIndex][1];
      // Check if link is external
      if (href.startsWith("http") || href.startsWith("//")) {
        tokens[idx].attrPush(["target", "_blank"]);
        tokens[idx].attrPush(["rel", "noopener noreferrer"]);
      }
    }
    return defaultLinkRender(tokens, idx, options, env, self);
  };

  let renderedContent = $derived(md.render(data.post.content));

  let selectedImage = $state<{ src: string; alt: string } | null>(null);

  function handleImageClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      selectedImage = {
        src: img.src,
        alt: img.alt,
      };
    }
  }

  function closeTheater() {
    selectedImage = null;
  }
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
      class="prose max-w-none"
      onclick={handleImageClick}
      onkeydown={(e) => e.key === "Enter" && handleImageClick(e as any)}
      role="button"
      tabindex="0"
    >
      {@html renderedContent}
    </div>
  </div>
</article>

{#if selectedImage}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 200 }}
    class="fixed inset-0 z-[1000] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
    onclick={closeTheater}
  >
    <button
      class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
      onclick={closeTheater}
      aria-label="Close theater mode"
    >
      <X size={32} />
    </button>

    <div
      transition:scale={{ duration: 300, start: 0.95 }}
      class="relative max-w-full max-h-full flex flex-col items-center gap-4"
    >
      <img
        src={selectedImage.src}
        alt={selectedImage.alt}
        class="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain bg-white/5"
      />
      {#if selectedImage.alt}
        <p
          class="text-white/70 text-sm font-medium tracking-wide bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-md"
        >
          {selectedImage.alt}
        </p>
      {/if}
    </div>
  </div>
{/if}
