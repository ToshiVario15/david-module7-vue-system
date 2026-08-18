<script setup>
defineProps({
  notifications: { type: Array, default: () => [] },
})
const emit = defineEmits(['dismiss'])

const styles = {
  success: { bar: 'bg-emerald-500', icon: 'text-emerald-500' },
  error: { bar: 'bg-rose-500', icon: 'text-rose-500' },
  info: { bar: 'bg-slate-500', icon: 'text-slate-500' },
}
</script>

<template>
  <div class="fixed top-4 right-4 left-4 sm:left-auto z-[60] flex flex-col gap-2 items-stretch sm:items-end pointer-events-none" aria-live="polite" role="status">
    <TransitionGroup name="toast">
      <div
        v-for="n in notifications"
        :key="n.id"
        class="pointer-events-auto w-full sm:w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex"
      >
        <span class="w-1.5 shrink-0" :class="(styles[n.type] || styles.info).bar"></span>
        <div class="flex items-center gap-2.5 px-3.5 py-3 flex-1 min-w-0">
          <svg v-if="n.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 shrink-0" :class="styles.success.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          <svg v-else-if="n.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 shrink-0" :class="styles.error.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 shrink-0" :class="styles.info.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
          <p class="text-sm text-slate-700 flex-1 min-w-0 break-words">{{ n.message }}</p>
          <button type="button" class="text-slate-300 hover:text-slate-500 shrink-0" aria-label="Dismiss notification" @click="emit('dismiss', n.id)">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(16px);
}
</style>
