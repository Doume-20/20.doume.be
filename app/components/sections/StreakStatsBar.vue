<script setup lang="ts">
defineProps<{
  totalContributions: number
  currentStreak: number
  longestStreak: number
  lastCommitDate: string | null
}>()

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
  <div
    class="w-full rounded-xl border border-orange-500/20 bg-black/40 backdrop-blur-sm grid grid-cols-3 divide-x divide-orange-500/20 overflow-hidden"
  >
    <div class="flex flex-col items-center justify-center gap-1 py-6 px-2">
      <span class="text-3xl md:text-4xl font-bold text-orange-300">{{
        totalContributions
      }}</span>
      <span class="text-[11px] uppercase tracking-wider text-white/50">
        Contributions
      </span>
      <span class="text-[11px] text-white/30">cette année</span>
    </div>

    <div class="flex flex-col items-center justify-center gap-1 py-6 px-2">
      <span class="text-3xl md:text-4xl font-bold text-orange-400">{{
        currentStreak
      }}</span>
      <span class="text-[11px] uppercase tracking-wider text-white/50">
        Streak actuel
      </span>
      <span class="text-[11px] text-white/30">
        {{ currentStreak === 1 ? "jour" : "jours" }}
      </span>
    </div>

    <div class="flex flex-col items-center justify-center gap-1 py-6 px-2">
      <span class="text-3xl md:text-4xl font-bold text-orange-300">{{
        longestStreak
      }}</span>
      <span class="text-[11px] uppercase tracking-wider text-white/50">
        Meilleur streak
      </span>
      <span class="text-[11px] text-white/30">{{ formatDate(lastCommitDate) }}</span>
    </div>
  </div>
</template>
