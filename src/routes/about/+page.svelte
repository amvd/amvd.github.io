<script lang="ts">
  import { Github, Twitter, Mail, Linkedin } from "lucide-svelte";
  import { config } from "$lib/config";
</script>

<svelte:head>
  <title>About | {config.name}</title>
</svelte:head>

<section class="max-w-[700px] mx-auto px-6 py-20">
  <header class="mb-12">
    <h1 class="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
      About Me
    </h1>
    <p class="text-slate-500">
      Software Engineer, Designer, and Tech Enthusiast.
    </p>
  </header>

  <div class="prose prose-slate prose-lg">
    <p>
      I'm a software engineer passionate about building beautiful,
      high-performance web applications. This site serves as a digital garden
      where I share my thoughts on coding, design, and the various projects I'm
      working on.
    </p>
    <p>
      Currently, I'm exploring the deep integration of AI in software
      development workflows, modern frontend frameworks like Svelte, and the
      evolution of static site generation.
    </p>

    <div class="flex flex-wrap gap-4 mt-12 not-prose">
      {#if config.contact.github}
        <a
          href={config.contact.github}
          class="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all focus-visible:outline-blue-500"
          aria-label="GitHub Profile"
        >
          <Github size={18} /> GitHub
        </a>
      {/if}
      {#if config.contact.twitter}
        <a
          href={config.contact.twitter}
          class="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all focus-visible:outline-blue-500"
          aria-label="Twitter Profile"
        >
          <Twitter size={18} /> Twitter
        </a>
      {/if}
      {#if config.contact.linkedin}
        <a
          href={config.contact.linkedin}
          class="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all focus-visible:outline-blue-500"
          aria-label="LinkedIn Profile"
        >
          <Linkedin size={18} /> LinkedIn
        </a>
      {/if}
      {#if config.contact.email}
        <a
          href="mailto:{config.contact.email}"
          class="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all focus-visible:outline-blue-500"
          aria-label="Email {config.fullName}"
        >
          <Mail size={18} /> Contact
        </a>
      {/if}
    </div>
  </div>
</section>
