<script setup lang="ts">
import AppSidebar from "@/components/sections/AppSidebar.vue"
import AppFooter from "@/components/sections/AppFooter.vue"
</script>

<template>
  <!-- h-dvh + flex : la page prend exactement l'espace restant au-dessus du footer, sans scroll de la fenêtre -->
  <div class="bg-black h-dvh flex flex-col overflow-hidden">
    <div class="relative flex-1 min-h-0">
      <AppSidebar />
      <NuxtPage class="h-full overflow-y-auto"/>
    </div>
    <AppFooter class="shrink-0"/>
  </div>
</template>
