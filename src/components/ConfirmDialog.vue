<script setup>
defineProps({
  title: { type: String, default: 'Are you sure?' },
  message: { type: String, default: '' },
  confirmLabel: { type: String, default: 'Confirm' },
  cancelLabel: { type: String, default: 'Cancel' },
})
const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div
    class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="confirm-dialog-title"
    @keydown.esc="emit('cancel')"
  >
    <div class="bg-white w-full sm:max-w-sm rounded-2xl shadow-xl p-5 sm:p-6">
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /><path d="M12 9v4M12 17h.01" /></svg>
        </div>
        <div class="min-w-0">
          <h2 id="confirm-dialog-title" class="text-base font-semibold text-slate-900">{{ title }}</h2>
          <p class="text-sm text-slate-500 mt-1 break-words">{{ message }}</p>
        </div>
      </div>
      <div class="flex gap-3 mt-5">
        <button
          type="button"
          class="flex-1 h-11 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 active:scale-[0.98] transition"
          @click="emit('cancel')"
        >
          {{ cancelLabel }}
        </button>
        <button
          type="button"
          class="flex-1 h-11 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 active:scale-[0.98] transition shadow-sm"
          @click="emit('confirm')"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
