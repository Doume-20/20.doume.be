<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { BIOGRAPHY } from "@/config/site"
import Liquid from "@/components/canvasui/Liquid.vue"
import Background from "./Background.vue"

const sections = [
  { id: "about", label: "À propos" },
  { id: "parcours", label: "Parcours" },
  { id: "competences", label: "Compétences" },
]

const activeIndex = ref(0)
const sectionRefs = ref<HTMLElement[]>([])
const setSectionRef = (el: any, i: number) => { if (el) sectionRefs.value[i] = el }

const goTo = (i: number) => sectionRefs.value[i]?.scrollIntoView({ behavior: "smooth" })
const previous = () => { if (activeIndex.value > 0) goTo(activeIndex.value - 1) }
const next = () => { if (activeIndex.value < sections.length - 1) goTo(activeIndex.value + 1) }

let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        const i = sectionRefs.value.indexOf(e.target as HTMLElement)
        if (i !== -1) activeIndex.value = i
      }
    }),
    { threshold: 0.5 }
  )
  sectionRefs.value.forEach((el) => observer!.observe(el))
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="relative w-full overflow-y-scroll snap-y snap-mandatory">
    <Background class="fixed inset-0 z-0" />
    <section
      v-for="(s, i) in sections"
      :key="s.id"
      :ref="(el) => setSectionRef(el, i)"
      :id="s.id"
      class="relative w-full h-full snap-start"
    >
      <!-- https://canvasui.dev/docs/components/liquid?force=1.4&radius=0.6&curl=1.9&pressureIterations=5&intensity=3&distortion=0.45&color=ffffff -->
      <Liquid
        style="width: 100%; height: 100%"
        class="z-10"
        :force="1.4"
        :radius="0.6"
        :curl="1.9"
        :pressureIterations="5"
        :pressure="0.8"
        :intensity="3"
        :distortion="0.45"
        :blend="5"
        :densityDissipation="0.96"
        :velocityDissipation="1"
        :simResolution="128"
        :dyeResolution="512"
        :color="[1, 1, 1]"
        :rainbow="false"
      />

      <div class="absolute inset-0 z-20 flex items-center text-white mix-blend-difference justify-center px-6 md:px-16 pointer-events-none">
        <div class="max-w-5xl mx-auto w-full">
          <p v-for="(paragraph, j) in BIOGRAPHY[i]" :key="j" class="mb-4">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>


    <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 mix-blend-difference">
      
      <div v-if="sections.length === 3 || sections.length === 2">
        <button 
          v-if="activeIndex === 0" @click="previous" class="mt-4 text-white/60 hover:text-white" aria-label="Previous section" :disabled="activeIndex === 0" :class="activeIndex === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'">⤒</button>
        <button v-if="activeIndex === 1" @click="previous" class="mt-4 text-white/60 hover:text-white" aria-label="Previous section">⤉</button>
        <button v-if="activeIndex === 2 && sections.length === 3" @click="previous" class="mt-4 text-white/60 hover:text-white" aria-label="Previous section">↥</button>
      </div>
      <div v-else>
        <button @click="previous" class="mt-4 text-white/60 hover:text-white" aria-label="Previous section" :disabled="activeIndex === 0" :class="activeIndex === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'">↑</button>
      </div>

      <button
        v-for="(s, i) in sections" :key="s.id"
        @click="goTo(i)"
        class="text-xs font-mono transition-opacity"
        :class="activeIndex === i ? 'text-white opacity-100' : 'text-white/40 opacity-70 hover:opacity-100'"
      >
        {{ String(i + 1).padStart(2, '0') }}
      </button>

      <div v-if="sections.length === 3 || sections.length === 2">
        <button v-if="activeIndex === 0" @click="next" class="mt-4 text-white/60 hover:text-white" aria-label="Next section">↧</button>
        <button v-if="activeIndex === 1" @click="next" class="mt-4 text-white/60 hover:text-white" aria-label="Next section" :disabled="sections.length === (activeIndex +1)" :class="sections.length === (activeIndex +1) ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'">⤈</button>
        <button v-if="activeIndex === 2 && sections.length === 3" @click="next" class="mt-4 hover:text-white text-white/20 cursor-not-allowed" aria-label="Next section" :disabled="true">⤓</button>
      </div>
      <div v-else>
        <button @click="next" class="mt-4 text-white/60 hover:text-white" aria-label="Next section" :disabled="sections.length === (activeIndex +1)" :class="sections.length === (activeIndex +1) ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'">↓</button>
      </div>

    </nav>
  </div>
</template>