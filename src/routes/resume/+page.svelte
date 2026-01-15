<script lang="ts">
  import { config } from "$lib/config";
  import { Mail, MapPin, Download } from "lucide-svelte";

  const resumeInfo = {
    name: "Armand De Asis",
    location: "Denver, Colorado 80204",
    email: "hello@armand.io",
    experience: [
      {
        company: "Northstar Investment Advisory",
        period: "Apr 2021 – Mar 2024",
        role: "Senior Software Engineer",
        achievements: [
          "Implemented systems to enforce RIA/FINRA/SEC compliance standards across software platform, enabling the company to secure deals with key client companies and provide investment guidance.",
          "Built various tools for both clients and financial planners including data visualization interfaces to compare and model tax burden scenarios and health insurance plans based on planned utilization.",
          "Deployed internationalization features across platform to allow the company to expand to international companies and clients, and employ overseas financial advisors.",
          "Collaborated directly with financial advisors, sales, and success teams to build tools and interfaces to manage data across clients and curate tailored guidance incorporating factors such as specialized employee benefits and equity grants, with data provided from employers.",
        ],
      },
      {
        company: "Dscout Research",
        period: "Apr 2017 – Aug 2019",
        role: "Software Engineer",
        achievements: [
          "Developed various features used for qualitative consumer research projects commissioned by clients from Google to Intuit.",
          "Studied interactions and interviews between researchers and research participants to refine tools and interfaces for performance and ease of use.",
        ],
      },
      {
        company: "CarAdvise",
        period: "Jun 2016 – Mar 2017",
        role: "Software Engineer",
        achievements: [
          "Built a platform to aggregate and compare automobile repair services and costs across various repair shops, exploring integrations to point-of-service systems to allow for direct scheduling from one centralized application.",
        ],
      },
      {
        company: "Health123",
        period: "Dec 2015 – Mar 2016",
        role: "Software Engineer",
        achievements: [
          "Developed an application to allow seamless monitoring of medical patients by healthcare providers, integrating biometric data from consumer health monitoring devices.",
        ],
      },
    ],
    education: [
      {
        school: "Baldwin Wallace University",
        location: "Berea, OH",
        degree: "B.S. Neuroscience, Psychology, with honors",
        coursework:
          "Elements of Statistics, Data Analysis using PASW, Human Relations & Group Dynamics, Calculus I",
      },
    ],
    skills: {
      technical: [
        "Python",
        "Ruby",
        "JavaScript",
        "TypeScript",
        "Data Analysis",
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
        <p class="text-sm text-slate-500">
          <span class="font-semibold text-slate-600">Coursework:</span>
          {edu.coursework}
        </p>
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
