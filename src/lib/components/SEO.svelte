<script lang="ts">
  import { config } from "$lib/config";
  import { page } from "$app/state";

  interface Props {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
  }

  let {
    title = config.title,
    description = config.description,
    image = config.ogImage,
    type = "website",
  }: Props = $props();

  const canonical = $derived(`${config.url}${page.url.pathname}`);
  const fullImage = $derived(
    image.startsWith("http") ? image : `${config.url}${image}`,
  );
</script>

<svelte:head>
  <!-- Standard Meta Tags -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={config.keywords.join(", ")} />
  <meta name="author" content={config.author} />
  <link rel="canonical" href={canonical} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={fullImage} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={canonical} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={fullImage} />
  {#if config.twitterHandle}
    <meta name="twitter:site" content={config.twitterHandle} />
    <meta name="twitter:creator" content={config.twitterHandle} />
  {/if}
</svelte:head>
