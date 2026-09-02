<script setup lang="ts">
import { Star, GitFork, ExternalLink } from "@lucide/vue"
import { languageColor, type GithubRepoInfo } from "@/composables/useGithubRepo"

defineProps<{
  repo: GithubRepoInfo
}>()

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
</script>

<template>
  <a
    :href="repo.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors p-5"
  >
    <div class="flex items-start justify-between gap-2">
      <h4 class="text-white font-medium truncate">{{ repo.name }}</h4>
      <ExternalLink
        class="size-4 text-white/30 group-hover:text-white/60 shrink-0 transition-colors"
      />
    </div>

    <p class="text-white/50 text-sm mt-2 line-clamp-2 min-h-[2.5rem]">
      {{ repo.description || "Pas de description." }}
    </p>

    <div class="flex items-center gap-4 mt-4 text-xs text-white/60">
      <span v-if="repo.language" class="flex items-center gap-1.5">
        <span
          class="size-2.5 rounded-full"
          :style="{ backgroundColor: languageColor(repo.language) }"
        />
        {{ repo.language }}
      </span>
      <span class="flex items-center gap-1">
        <Star class="size-3.5" />
        {{ repo.stars }}
      </span>
      <span class="flex items-center gap-1">
        <GitFork class="size-3.5" />
        {{ repo.forks }}
      </span>
      <span class="ml-auto text-white/30">{{ formatDate(repo.updatedAt) }}</span>
    </div>
  </a>
</template>
