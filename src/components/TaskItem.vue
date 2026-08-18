<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: { type: Object, required: true },
})

const emit = defineEmits(['edit', 'delete', 'status-change'])

const statusStyles = {
  Pending: 'bg-amber-100 text-amber-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-emerald-100 text-emerald-800',
}

const badgeClass = computed(() => statusStyles[props.task.status] || 'bg-slate-100 text-slate-700')

const dueInfo = computed(() => {
  if (!props.task.dueDate) return { label: '', overdue: false }
  const due = new Date(props.task.dueDate + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = Math.round((due - today) / 86400000)
  const formatted = due.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

  if (props.task.status === 'Completed') return { label: formatted, overdue: false }
  if (diffDays < 0) return { label: `${formatted} · Overdue`, overdue: true }
  if (diffDays === 0) return { label: `${formatted} · Due today`, overdue: false, dueToday: true }
  return { label: formatted, overdue: false }
})
</script>

<template>
  <li class="group bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-1.5">
          <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="badgeClass">{{ task.status }}</span>
          <span class="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full truncate max-w-[10rem]">{{ task.subject }}</span>
        </div>
        <h3 class="font-semibold text-slate-900 text-sm sm:text-base break-words">{{ task.title }}</h3>
        <p v-if="task.description" class="text-sm text-slate-500 mt-1 line-clamp-3 break-words">{{ task.description }}</p>

        <div class="flex items-center gap-1.5 mt-3 text-xs" :class="dueInfo.overdue ? 'text-rose-600 font-medium' : dueInfo.dueToday ? 'text-amber-600 font-medium' : 'text-slate-400'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          <span>{{ dueInfo.label }}</span>
        </div>
      </div>

      <div class="flex flex-col gap-1.5 shrink-0">
        <button
          type="button"
          class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          aria-label="Edit task"
          @click="emit('edit', task)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
        </button>
        <button
          type="button"
          class="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          aria-label="Delete task"
          @click="emit('delete', task)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /><path d="M10 11v6M14 11v6" /></svg>
        </button>
      </div>
    </div>

    <div v-if="task.status !== 'Completed'" class="flex gap-2 mt-3 pt-3 border-t border-slate-100">
      <button
        v-if="task.status === 'Pending'"
        type="button"
        class="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        @click="emit('status-change', task, 'In Progress')"
      >
        Start Task
      </button>
      <button
        type="button"
        class="text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
        @click="emit('status-change', task, 'Completed')"
      >
        Mark Complete
      </button>
    </div>
  </li>
</template>
