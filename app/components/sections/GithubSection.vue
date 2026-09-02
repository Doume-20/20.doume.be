<script setup lang="ts">
import { ref } from "vue"
import { GitCommitHorizontal, FolderGit2, Clock } from "@lucide/vue"
import DecryptReveal from "@/components/canvasui/DecryptReveal.vue"
import StreakStatsBar from "@/components/sections/StreakStatsBar.vue"
import RepoCard from "@/components/sections/RepoCard.vue"
import AddRepoInput from "@/components/sections/AddRepoInput.vue"
import { GITHUB_USERNAME, FEATURED_REPOS } from "@/config/site"
import { fetchGithubRepo, type GithubRepoInfo } from "@/composables/useGithubRepo"
import { fetchAllPublicRepos } from "@/composables/getGithubRepos"
import Background from "./Background.vue"

const DECRYPT_CHARSET = Array.from({ length: 95 }, (_, i) =>
  String.fromCharCode(32 + i)
).join("")

const { stats, pending } = await useGithubStats(GITHUB_USERNAME)

const repos = ref<GithubRepoInfo[]>([])
const reposLoading = ref(FEATURED_REPOS.length === 0)
const repoErrors = ref<string[]>([])

async function loadRepo(input: string) {
  try {
    const repo = await fetchGithubRepo(input)
    if (!repos.value.some((r) => r.fullName === repo.fullName)) {
      repos.value.unshift(repo)
    }
  } catch {
    repoErrors.value.push(`Impossible de récupérer "${input}"`)
    setTimeout(() => repoErrors.value.shift(), 3000)
  }
}

if (FEATURED_REPOS.length) {
  for (const slug of FEATURED_REPOS) {
    loadRepo(slug)
  }
} else {
  fetchAllPublicRepos(GITHUB_USERNAME)
    .then((all) => {
      repos.value = all
    })
    .catch(() => {
      repoErrors.value.push("Impossible de récupérer tes repos publics")
    })
    .finally(() => {
      reposLoading.value = false
    })
}

function formatDate(d: string | null) {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
</script>

<template>
  <section id="github" class="relative w-full bg-black">
    <Background />
    <div class="relative z-10 w-full flex flex-col gap-16 py-10 px-6 md:px-16">
      <div class="max-w-4xl mx-auto w-full">
        <DecryptReveal
          style="width: 100%; min-height: 330px; border-radius: 1rem; overflow: hidden"
          :radius="350"
          :softness="0.5"
          :cell="10"
          :aspect="0.75"
          :charset="DECRYPT_CHARSET"
          :colored="1"
          color="#fb923c"
          :brightness="1"
          :legibility="1"
          :contrast="1"
          :exposure="1"
          :scramble="0.1"
          :scramble-speed="6"
          :edge-width="0.2"
          :edge-flicker="1"
          :edge-glow="2"
          :edge-tint="0.75"
          :aberration="10"
          :passthrough="0.15"
          :threshold="0.025"
          background="#000000"
          :smoothing="0.2"
        >
          
          <div
            class="w-full min-h-80 flex flex-col items-center justify-center gap-6 p-8 bg-black/30"
          >
            <FlameWrap
              style="border-radius: 0.375rem; display: block"
              :intensity="0.6"
              :height="100"
              :spread="8"
              :radius="40"
              :speed="0.25"
              :scale="0.75"
              :turbulence="0"
              :turbulenceScale="0.5"
              :turbulenceReach="25"
              :sparks="1.5"
              :sparkSize="0.20"
              :sparkDensity="1"
              :sparkSpeed="1"
              :rim="2.5"
              :melt="1"
              :distortion="0"
              :smoke="0"
              :ember="2"
              :scorch="0"
              :color="[1, 0.5059, 0]"
            >
              <img
                v-if="stats?.avatarUrl"
                :src="stats.avatarUrl"
                :alt="stats.login"
                class="size-20 rounded-full border-2 border-orange-400/40"
              />
            </FlameWrap>
            <div class="text-center">
              <h2 class="text-2xl md:text-3xl font-bold text-white">
                @{{ stats?.login ?? GITHUB_USERNAME }}
              </h2>
              <p v-if="stats?.name" class="text-white/50 text-sm mt-1">
                {{ stats.name }}
              </p>
            </div>

            <div
              v-if="!pending"
              class="grid grid-cols-3 gap-6 md:gap-10 text-center"
            >
              <div class="flex flex-col items-center gap-1">
                <GitCommitHorizontal class="size-4 text-orange-400" />
                <span class="text-xl font-semibold text-white">{{
                  stats?.commitsThisYear ?? 0
                }}</span>
                <span class="text-[11px] text-white/40 uppercase tracking-wider">
                  Commits / an
                </span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <FolderGit2 class="size-4 text-orange-400" />
                <span class="text-xl font-semibold text-white">{{
                  stats?.publicRepos ?? 0
                }}</span>
                <span class="text-[11px] text-white/40 uppercase tracking-wider">
                  Repos publics
                </span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <Clock class="size-4 text-orange-400" />
                <span class="text-xl font-semibold text-white">{{
                  formatDate(stats?.lastCommitDate ?? null)
                }}</span>
                <span class="text-[11px] text-white/40 uppercase tracking-wider">
                  Dernier commit
                </span>
              </div>
            </div>
          </div>
        </DecryptReveal>

        <div class="mt-6">
          <StreakStatsBar
            :total-contributions="stats?.commitsThisYear ?? 0"
            :current-streak="stats?.currentStreak ?? 0"
            :longest-streak="stats?.longestStreak ?? 0"
            :last-commit-date="stats?.lastCommitDate ?? null"
          />
        </div>
      </div>

      <div class="max-w-5xl mx-auto w-full">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 class="text-2xl font-semibold text-white">Projets</h3>
          <AddRepoInput @add="loadRepo" />
        </div>

        <p v-for="(err, i) in repoErrors" :key="i" class="text-red-400 text-xs mb-2">
          {{ err }}
        </p>

        <p v-if="reposLoading" class="text-white/40 text-sm">Chargement des repos...</p>
        <div v-else-if="repos.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RepoCard v-for="repo in repos" :key="repo.fullName" :repo="repo" />
        </div>
        <p v-else class="text-white/40 text-sm">Aucun repo pour le moment.</p>
      </div>
    </div>
  </section>
</template>
