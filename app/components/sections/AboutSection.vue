<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { BIOGRAPHY } from "@/config/site"
import Liquid from "@/components/canvasui/Liquid.vue"
import Background from "./Background.vue"

const sections = [
  { id: "about", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "appareils", label: "Appareils" },
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

useSeoMeta({
  title: "À propos",
  description: "mon À propos",
  ogTitle: "À propos",
  ogDescription: "'jour",
  ogType: "website",
  ogImage: 'https://www.doume.be/favicon.ico',

  twitterTitle: "À propos",
  twitterImage: "https://www.doume.be/favicon.ico",

})
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

      <div class="absolute inset-0 z-20 flex items-center text-white mix-blend-difference justify-center px-6 md:px-16">

        <div
          v-if="BIOGRAPHY[i].type === 'presentation'"
          class="max-w-5xl mx-auto w-full pointer-events-none"
        >
          <p v-for="(paragraph, j) in BIOGRAPHY[i].texte" :key="j" class="mb-4">
            {{ paragraph }}
          </p>
        </div>

        <!-- TODO: Régler le problème de taille d'icone qui est trop petite par rapport à la page -->
        <div
          v-else-if="BIOGRAPHY[i].type === 'skills-vertical'"
          class="w-full h-full flex flex-row-reverse flex-wrap items-stretch justify-around gap-x-6 md:gap-x-10 py-16 pointer-events-none"
        >
          <div
            v-for="(group, g) in BIOGRAPHY[i].texte"
            :key="g"
            class="flex flex-row items-start gap-x-3 md:gap-x-4"
          >
            <span
              v-if="group.titre"
              class="font-mono font-bold text-xl md:text-3xl tracking-[0.3em] leading-relaxed"
              style="writing-mode: sideways-lr; text-orientation: mixed;"
            >
              {{ group.titre }}
            </span>
            <div class="flex flex-col items-center gap-y-3 md:gap-y-4">
              <template v-for="(skill, j) in group.items" :key="j">
                <Icon
                  v-if="typeof skill.icon === 'string'"
                  :name="skill.icon"
                  :title="skill.hl"
                  :aria-label="skill.nom"
                  class="w-30 h-30 md:w-40 md:h-40"
                />
                <component
                  :is="skill.icon"
                  v-else-if="skill.icon"
                  :title="skill.hl"
                  class="w-20 h-20 md:w-30 md:h-30"
                />
              </template>
            </div>
          </div>
        </div>

        <div
          v-else-if="BIOGRAPHY[i].type === 'skills-horizontal'"
          class="max-w-5xl mx-auto w-full flex flex-col gap-8 py-8 pointer-events-none"
        >
          <div v-for="(group, g) in BIOGRAPHY[i].texte" :key="g">
            <p
              v-if="group.titre"
              class="font-mono uppercase tracking-widest text-sm md:text-base text-white/70 mb-2"
            >
              {{ group.titre }}
            </p>
            <!--! Problème actuellement avec les icones -->
            <!-- TODO: Régler le problème... encore un autre... j'adore coder ! (aidez moi) (blague) -->
            <div class="flex flex-wrap gap-2 md:gap-3">
              <span
                v-for="(skill, j) in group.items"
                :key="j"
                class="font-mono text-sm md:text-lg border border-white/40 rounded-full px-3 py-1"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <div
          v-else-if="BIOGRAPHY[i].type === 'devices'"
          class="max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pointer-events-auto"
        >
          <div
            v-for="(device, j) in BIOGRAPHY[i].texte"
            :key="j"
            class="border border-white/30 rounded-lg p-4 transition-colors hover:border-white/70 hover:bg-white/5"
          >
            <p class="font-semibold">{{ device.nom }}</p>
            <p v-if="device.description" class="text-sm text-white/70 mt-1">
              {{ device.description }}
            </p>
          </div>
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
        <button v-if="activeIndex === 2 && sections.length === 3" @click="next" class="mt-4 hover:text-white text-white/60 cursor-not-allowed" aria-label="Next section" :disabled="true">⤓</button>
      </div>
      <div v-else>
        <button @click="next" class="mt-4 text-white/60 hover:text-white" aria-label="Next section" :disabled="sections.length === (activeIndex +1)" :class="sections.length === (activeIndex +1) ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white'">↓</button>
      </div>

    </nav>
  </div>
</template>