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
      Software Engineer, World Traveler, and Swing Dancer.
    </p>
  </header>

  <div class="prose prose-slate prose-lg">
    <p>
      Gemini/Antigravity auto-generated some fluff about how I love building
      high-performance web applications, and while that may be true, it's mostly
      that I love optimization and solving interesting problems.
    </p>
    <p>Problems I'm good at solving:</p>
    <ul>
      <li>
        How do we add this feature to our app without breaking everything?
      </li>
      <li>
        How do we speed up this data ingestion pipeline that was built to
        process 10 records at a time and is now slogging through 10,000 records?
      </li>
      <li>How do I backpack from Bangkok to Barcelona for under $1000?</li>
      <li>
        I'm 28 years old, make $100,000 a year, have $250,000 in my 401k,
        $60,000 in my Roth IRA, and $20,000 in savings. How do I save up buy a
        house and still live out my dream of traveling the world and retiring
        before I'm 40?
      </li>
    </ul>

    <p>
      I also like to take pretty pictures and I'm a fairly decent swing dancer.
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
