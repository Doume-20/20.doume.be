<script setup lang="ts">
import AppSidebar from "@/components/sections/AppSidebar.vue"
import AppFooter from "@/components/sections/AppFooter.vue"
</script>

<template>
  <div class="bg-black min-h-screen">
    <AppSidebar class="h-[calc(100vh-57px)]"/>
    <NuxtPage class="h-[calc(100vh-57px)]"/>
    <AppFooter />
  </div>
</template>
