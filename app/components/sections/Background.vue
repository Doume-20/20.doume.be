<script setup lang="ts">
import HexFloat from "@/components/canvasui/HexFloat.vue"

withDefaults(
  defineProps<{
    color?: number[]
  }>(),
  {
    color: () => [0.6431, 0.7294, 0.7255],
  }
)
</script>

<template>
    <div class="absolute inset-0 z-0 pointer-events-none">
    <!-- https://canvasui.dev/docs/components/hex-float?size=110&gap=0.5&bevel=1&tilt=30&perspective=0.1&float=0.2&lift=0.2&radius=360&iridescence=0.55&grain=0&gapMode=custom&gapHex=a4bab9&shine=0.25 -->
      <HexFloat
        style="width: 100%; height: 100%"
        :size="110"
        :gap="0.5"
        :bevel="1"
        :tilt="30"
        :perspective="0.1"
        :float="0.18"
        :speed="1"
        :shine="1"
        :lift="0.2"
        :radius="360"
        :flow="0"
        :swirl="0"
        :trail="0"
        :iridescence="0.25"
        :bloom="0"
        :grain="0"
        :gap-color="color"
      />
    </div>
</template>