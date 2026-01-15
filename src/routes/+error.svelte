<script lang="ts">
  import { page } from "$app/state";
  import { ArrowLeft } from "lucide-svelte";
  import errorImage from "$lib/assets/404.jpeg";
  import SEO from "$lib/components/SEO.svelte";
</script>

<SEO
  title="Page Not Found | amvd"
  description="The page you're looking for doesn't exist."
/>

<div
  class="max-w-[700px] mx-auto px-6 py-20 flex flex-col items-center text-center"
>
  <div
    class="mb-12 relative w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm animate-in fade-in zoom-in duration-1000"
  >
    <img src={errorImage} alt="404 Error" class="w-full object-cover" />
  </div>

  <h1
    class="text-6xl font-black text-slate-100 absolute -z-10 select-none pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
  >
    404
  </h1>

  <div
    class="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
  >
    <div>
      <h2 class="text-2xl font-bold text-slate-900 mb-2">¯\_(ツ)_/¯</h2>
      <p class="text-slate-500 max-w-[400px]">
        This part of my site doesn't exist. 🙃
      </p>
    </div>

    <a
      href="/"
      class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
    >
      <ArrowLeft size={18} />
      Go back home
    </a>
  </div>
</div>

<style>
  :global(body) {
    background-color: white;
  }
</style>
