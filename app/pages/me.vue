<script setup lang="ts">
import AboutSection from "@/components/sections/AboutSection.vue"
import { FULL_DOMAIN, ME_DESC } from "@/config/site"

useSeoMeta({
  title: "Me",
  description: "Infos sur moi",
  ogImage: `${FULL_DOMAIN}/favicon.ico`,
  ogTitle: "À propos de Moi",
  ogDescription: ME_DESC,
  ogType: "profile",

  twitterTitle: "À propos de moi",
  twitterImage: `${FULL_DOMAIN}/favicon.ico`,
})
</script>

<template>
  <AboutSection />
</template>
