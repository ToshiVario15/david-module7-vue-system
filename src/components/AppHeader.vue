<script setup>
defineProps({
  counts: {
    type: Object,
    default: () => ({ total: 0, Pending: 0, 'In Progress': 0, Completed: 0 }),
  },
})
</script>

<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-4">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div>
            <h1 class="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Student Task Manager</h1>
            <p class="text-xs sm:text-sm text-slate-500">Stay on top of assignments and deadlines</p>
          </div>
        </div>

        <div class="hidden sm:flex items-center gap-2 text-sm">
          <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">{{ counts.total }} total</span>
          <span class="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 font-medium">{{ counts.Pending }} pending</span>
          <span class="px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 font-medium">{{ counts['In Progress'] }} active</span>
          <span class="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">{{ counts.Completed }} done</span>
        </div>
      </div>

      <!-- Mobile counts row -->
      <div class="flex sm:hidden items-center gap-2 text-xs mt-3 overflow-x-auto">
        <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium whitespace-nowrap">{{ counts.total }} total</span>
        <span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-medium whitespace-nowrap">{{ counts.Pending }} pending</span>
        <span class="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-medium whitespace-nowrap">{{ counts['In Progress'] }} active</span>
        <span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium whitespace-nowrap">{{ counts.Completed }} done</span>
      </div>
    </div>
  </header>
</template>
