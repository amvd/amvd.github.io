<script lang="ts">
  import { config } from "$lib/config";
  import { Mail, MapPin, Download } from "lucide-svelte";

  const resumeInfo = {
    name: "Armand De Asis",
    location: "Denver, Colorado 80204",
    email: "armand.deas@gmail.com",
    phone: "(720) 443-0593",
    summary:
      "Senior Full-Stack Engineer with 8+ years of experience building scalable applications in high-stakes FinTech and consumer-focused environments. Specialist in performance optimization, complex integrations, and large-scale framework migrations (JS/TS/Ruby).",
    experience: [
      {
        company: "Northstar Investment Advisory",
        period: "Apr 2021 – Mar 2024",
        role: "Senior Software Engineer",
        achievements: [
          "Deployed financial data visualization tools and tax-burden scenario calculators used by dozens of advisors.",
          "Enabled international expansion through platform-wide overhaul of permissions and localization.",
          "Optimized SQL/ORM queries and caching, improving data ingestion speed by 400%.",
          "Collaborated with advisors and sales teams to build data management tools, saving significant weekly labor.",
          "Implemented systems to ensure internal compliance with RIA/FINRA/SEC standards.",
        ],
      },
      {
        company: "Freelance",
        period: "Feb 2020 – Oct 2020",
        role: "Software Engineer",
        achievements: [
          "Managed client projects, including an inventory display system and data analytics for a published research book.",
        ],
      },
      {
        company: "Dscout Research",
        period: "Apr 2017 – Aug 2019",
        role: "Software Engineer",
        achievements: [
          "Spearheaded development of a video interview product with automatic transcript generation and video editing.",
          "Developed algorithms for plaintext copyediting of audio transcripts while maintaining metadata/timestamps.",
        ],
      },
      {
        company: "CarAdvise",
        period: "Jun 2016 – Mar 2017",
        role: "Software Engineer",
        achievements: [
          "Developed full-stack features and managed AWS DevOps for an auto service scheduler.",
        ],
      },
      {
        company: "Health123",
        period: "Dec 2015 – Mar 2016",
        role: "Software Engineer",
        achievements: [
          "Integrated biometric data from consumer health monitoring devices for reporting to providers.",
        ],
      },
    ],
    education: [
      {
        school: "Baldwin Wallace University",
        location: "Berea, OH",
        degree: "B.S. Neuroscience, Psychology, with honors",
      },
    ],
    skills: {
      technical: [
        "Ruby",
        "TypeScript",
        "JavaScript",
        "Elixir",
        "SQL",
        "PHP",
        "Ruby on Rails",
        "React.js",
        "Svelte",
        "PostgreSQL",
        "GraphQL",
      ],
      interests: [
        "Swing dancing",
        "Live music",
        "Backpacking",
        "Photography",
        "Personal finance",
      ],
    },
  };
</script>

<svelte:head>
  <title>Resume | {config.fullName}</title>
  <meta
    name="description"
    content="Professional resume of {config.fullName}, Senior Software Engineer."
  />
</svelte:head>

<div
  class="max-w-[800px] mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700"
>
  <!-- Header -->
  <header
    class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-12"
  >
    <div>
      <h1 class="text-4xl font-bold text-slate-900 tracking-tight mb-4">
        {resumeInfo.name}
      </h1>
      <div class="flex flex-wrap gap-x-6 gap-y-3 text-slate-500 text-sm">
        <span class="flex items-center gap-1.5">
          <MapPin size={16} class="text-slate-400" />
          {resumeInfo.location}
        </span>
        <a
          href="mailto:{resumeInfo.email}"
          class="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
        >
          <Mail size={16} class="text-slate-400" />
          {resumeInfo.email}
        </a>
      </div>
    </div>
    <a
      href="/docs/resume.pdf"
      download="Armand_De_Asis_Resume.pdf"
      class="print:hidden flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full text-sm font-medium transition-colors border border-slate-200"
    >
      <Download size={16} />
      Download PDF
    </a>
  </header>

  <!-- Summary -->
  <section class="mb-16">
    <p class="text-slate-600 leading-relaxed text-lg italic">
      {resumeInfo.summary}
    </p>
  </section>

  <!-- Experience -->
  <section class="mb-16">
    <h2 class="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
      Experience
      <div class="h-px flex-1 bg-slate-100"></div>
    </h2>

    <div class="space-y-12">
      {#each resumeInfo.experience as job}
        <div class="group">
          <div
            class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4"
          >
            <div>
              <h3
                class="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors"
              >
                {job.company}
              </h3>
              <p class="text-slate-500 font-medium">{job.role}</p>
            </div>
            <span class="text-sm font-medium text-slate-400 tabular-nums"
              >{job.period}</span
            >
          </div>
          <ul class="space-y-3">
            {#each job.achievements as achievement}
              <li
                class="relative pl-6 text-slate-600 leading-relaxed text-sm md:text-base"
              >
                <span
                  class="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-slate-300"
                ></span>
                {achievement}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <!-- Education -->
  <section class="mb-16">
    <h2 class="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
      Education
      <div class="h-px flex-1 bg-slate-100"></div>
    </h2>

    {#each resumeInfo.education as edu}
      <div>
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-2"
        >
          <h3 class="font-bold text-slate-800 text-lg">{edu.school}</h3>
          <span class="text-sm font-medium text-slate-400">{edu.location}</span>
        </div>
        <p class="text-slate-700 font-medium mb-2">{edu.degree}</p>
      </div>
    {/each}
  </section>

  <!-- Skills & Interests -->
  <section>
    <h2 class="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
      Skills & Interests
      <div class="h-px flex-1 bg-slate-100"></div>
    </h2>

    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h4
          class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"
        >
          Technical
        </h4>
        <div class="flex flex-wrap gap-2">
          {#each resumeInfo.skills.technical as skill}
            <span
              class="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded text-sm font-medium"
            >
              {skill}
            </span>
          {/each}
        </div>
      </div>
      <div>
        <h4
          class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"
        >
          Interests
        </h4>
        <div class="flex flex-wrap gap-2">
          {#each resumeInfo.skills.interests as interest}
            <span
              class="px-3 py-1 bg-blue-50/50 text-blue-700 border border-blue-100 rounded text-sm font-medium"
            >
              {interest}
            </span>
          {/each}
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  @media print {
    :global(header),
    :global(footer) {
      display: none !important;
    }

    .print\:hidden {
      display: none !important;
    }

    div {
      padding: 0 !important;
      margin: 0 auto !important;
      max-width: 100% !important;
    }

    .animate-in {
      animation: none !important;
    }
  }
</style>
