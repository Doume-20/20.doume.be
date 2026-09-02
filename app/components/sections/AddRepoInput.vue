<script setup lang="ts">
import { ref } from "vue"
import { Plus, Loader2 } from "@lucide/vue"

const emit = defineEmits<{
  add: [url: string]
}>()

const value = ref("")
const loading = ref(false)

function submit() {
  if (!value.value.trim()) return
  loading.value = true
  emit("add", value.value.trim())
  value.value = ""
  setTimeout(() => (loading.value = false), 600)
}
</script>

<template>
  <form
    class="flex items-center gap-2 w-full max-w-md"
    @submit.prevent="submit"
  >
    <input
      v-model="value"
      type="text"
      placeholder="owner/repo ou lien github.com/..."
      class="flex-1 rounded-md border border-white/10 bg-white/3 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-orange-400/50 transition-colors"
    />
    <button
      type="submit"
      :disabled="loading"
      class="flex items-center justify-center rounded-md bg-orange-500/20 border border-orange-500/30 text-orange-300 hover:bg-orange-500/30 transition-colors size-9 shrink-0 disabled:opacity-50"
    >
      <Loader2 v-if="loading" class="size-4 animate-spin" />
      <Plus v-else class="size-4" />
    </button>
  </form>
</template>
