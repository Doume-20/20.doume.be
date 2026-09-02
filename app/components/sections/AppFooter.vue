<script setup lang="ts">
import { SOCIAL_LINKS } from "@/config/site"
import FooterLink from "@/components/sections/FooterLink.vue"
</script>

<template>
  <footer class="w-full bg-black border-t border-white/10 py-2 px-6 md:px-16">
    <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
      <p class="text-white/30 text-xs">
        © {{ new Date().getFullYear() }}
      </p>

      <div class="flex items-center gap-3 flex-wrap justify-center">
        <FooterLink v-for="link in SOCIAL_LINKS" :key="link.label" :link="link" />
      </div>
    </div>
  </footer>
</template>
