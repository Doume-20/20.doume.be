<script setup lang="ts">
import Droplets from "@/components/canvasui/Droplets.vue"
import Background from "@/components/sections/Background.vue"

withDefaults(
  defineProps<{
    firstName?: string
    description?: string
  }>(),
  {
    firstName: "Prénom",
    description: "Description",
  }
)
</script>

<template>
  <section
    id="home"
    class="relative w-full overflow-hidden"
  >
    <Droplets
      style="width: 100%; height: 100%"
      :intensity="0.6"
      :speed="1"
      :scale="0.4"
      :drop-width="1"
      :drop-length="1"
      :refraction="0.2"
      :blur="0"
      :vignette="0"
      :fall-speed="1"
      :wiggle="1"
      :static-drops="0.2"
      :interactive="true"
      :interaction-radius="0.3"
      :interaction-strength="0.6"
      :interaction-distortion="3"
      :tint="[1, 1, 1]"
      :tint-strength="0"
    >
      <div class="relative w-full h-full">
        <Background />

        <div
          class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
        >
          <h1
            class="text-[clamp(3.5rem,12vw,9rem)] font-bold tracking-tight text-white select-none"
          >
            {{ firstName }}
          </h1>
          <p class="text-white/50 text-sm md:text-base tracking-widest uppercase">
            {{ description }}
          </p>
        </div>
      </div>
    </Droplets>
  </section>
</template>