<script setup lang="ts">
import HeroSection from "@/components/sections/HeroSection.vue"

definePageMeta({
  title: 'Doume\'s portfolio',
  meta: [
    { name: 'description', content: '\'jour' },
    { property: 'og:title', content: '\'jour' }
  ]
})
</script>

<template>
  <HeroSection first-name="Doume20" description="Étudiant / Juste un gars"/>
</template>
