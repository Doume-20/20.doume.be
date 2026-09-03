<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { NAV_SECTIONS } from "@/config/site"

const open = ref(false)
const route = useRoute()
</script>

<template>
  <nav
    aria-label="Navigation principale"
    class="fixed left-0 top-0 z-50 flex flex-col justify-center gap-2 border-r border-white/10 bg-black/60 backdrop-blur-md px-3 overflow-hidden transition-[width] duration-200 ease-out"
    :class="open ? 'w-50' : 'w-14'"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <NuxtLink
      v-for="section in NAV_SECTIONS"
      :key="section.path"
      :to="section.path"
      class="group flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors"
      :class="
        route.path === section.path
          ? 'text-white'
          : 'text-white/50 hover:text-white/80'
      "
      :aria-current="route.path === section.path ? 'page' : undefined"
    >
      <span class="relative flex items-center justify-center size-4 shrink-0">
        <component
          :is="section.icon"
          class="size-4 shrink-0 transition-colors"
          :class="!open && route.path === section.path ? 'text-orange-400' : ''"
        />
        <span
          class="absolute -right-1.5 -top-1.5 h-1.5 w-1.5 rounded-full transition-all"
          :class="[
            route.path === section.path ? 'bg-orange-400' : 'bg-white/20',
            open ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
          ]"
        />
      </span>
      <span class="truncate whitespace-nowrap" :class="open ? 'opacity-100' : 'opacity-0'">
        {{ section.label }}
      </span>
    </NuxtLink>
  </nav>
</template>