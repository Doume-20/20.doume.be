<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from "vue"
import FlameWrap from "@/components/canvasui/FlameWrap.vue"
import type { SocialLink } from "@/config/site"

const props = defineProps<{
  link: SocialLink
}>()

const seed = computed(() =>
  [...props.link.label].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) % 997, 7) / 10
)

const rise = computed(() => (hovered.value ? 4 : 2))

const hovered = ref(false)

const intensity = computed(() => (hovered.value ? 0.9 : 0.12))
const sparks = computed(() => (hovered.value ? 2 : 0.3))
const ember = computed(() => (hovered.value ? 3 : 0.5))
const rim = computed(() => (hovered.value ? 3.5 : 1))

const FLAME_IDLE = 90
const FLAME_HOVER = 170
const flameHeight = ref(FLAME_IDLE)
const flameGrow = computed(() => flameHeight.value / FLAME_HOVER)
let raf = 0

watch(hovered, (h) => {
  const target = h ? FLAME_HOVER : FLAME_IDLE
  cancelAnimationFrame(raf)
  const step = () => {
    flameHeight.value += (target - flameHeight.value) * 0.18
    if (Math.abs(target - flameHeight.value) < 0.5) {
      flameHeight.value = target
      return
    }
    raf = requestAnimationFrame(step)
  }
  step()
})

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <a
    :href="link.href"
    target="_blank"
    rel="noopener noreferrer"
    class="block"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <FlameWrap
      style="border-radius: 0.375rem; display: block"
      :intensity="0.3"
      :height="FLAME_HOVER"
      :grow="flameGrow"
      :rise="rise"
      :seed="seed"
      :spread="8"
      :radius="20"
      :speed="0.1"
      :scale="0.75"
      :turbulence="0"
      :turbulenceScale="0.5"
      :turbulenceReach="25"
      :sparks="1.5"
      :sparkSize="0.20"
      :sparkDensity="1"
      :sparkSpeed="1"
      :rim="2.5"
      :melt="1"
      :distortion="0"
      :smoke="0"
      :ember="2"
      :scorch="0"
      :color="[1, 1, 1]"
    >
      <div
        class="flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs transition-colors"
        :class="
          hovered
            ? 'border-orange-400/30 bg-white/6 text-white'
            : 'border-white/10 bg-white/3 text-white/60'
        "
      >
        <component :is="link.icon" class="size-3.5" />
        {{ link.label }}
      </div>
    </FlameWrap>
  </a>
</template>
