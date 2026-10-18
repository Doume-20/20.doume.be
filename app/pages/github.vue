<script setup lang="ts">
import GithubSection from "@/components/sections/GithubSection.vue"
import { FULL_DOMAIN, GITHUB_DESC } from "@/config/site"

useSeoMeta({
  title: "Github",
  description: "infos sur mon Github",
  ogImage: `${FULL_DOMAIN}/favicon.ico`,
  ogTitle: "Github",
  ogDescription: GITHUB_DESC,
  ogType: "profile",

  twitterTitle: "Github",
  twitterImage: `${FULL_DOMAIN}/favicon.ico`,
})
</script>

<template>
  <GithubSection />
</template>
