<script setup lang="ts">
import HeroSection from "@/components/sections/HeroSection.vue"
import { FULL_DOMAIN, INDEX_DESC } from "@/config/site"

useSeoMeta({
  title: "Accueil",
  description: "Doume20 — étudiant, passionné de reverse engineering, cybersécurité, programmation et électronique.",
  ogTitle: "Doume20's homepage",
  ogDescription: INDEX_DESC,
  ogType: "website",
  ogImage: `${FULL_DOMAIN}/favicon.ico`,

  twitterTitle: "Accueil",
  twitterImage: `${FULL_DOMAIN}/favicon.ico`,
})
</script>

<template>
  <HeroSection first-name="Doume20" description="Étudiant / Juste un gars"/>
</template>
