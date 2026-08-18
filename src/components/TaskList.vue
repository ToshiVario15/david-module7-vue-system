<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: { type: Array, required: true },
  totalCount: { type: Number, required: true },
  searchQuery: { type: String, default: '' },
})

const emit = defineEmits(['update:searchQuery', 'edit', 'delete', 'status-change'])
</script>

<template>
  <section class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <h2 class="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
        Your Tasks
        <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          {{ tasks.length }}<span v-if="searchQuery"> of {{ totalCount }}</span>
        </span>
      </h2>

      <label class="relative block w-full sm:w-72">
        <span class="sr-only">Search tasks</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
        <input
          type="search"
          :value="searchQuery"
          placeholder="Search by title, subject, status..."
          class="w-full h-10 pl-9 pr-8 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition"
          @input="emit('update:searchQuery', $event.target.value)"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label="Clear search"
          @click="emit('update:searchQuery', '')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </label>
    </div>

    <ul v-if="tasks.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="(t) => emit('edit', t)"
        @delete="(t) => emit('delete', t)"
        @status-change="(t, s) => emit('status-change', t, s)"
      />
    </ul>

    <div v-else class="flex flex-col items-center justify-center text-center py-14 px-4">
      <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
      </div>
      <p class="text-sm font-medium text-slate-700">
        {{ searchQuery ? 'No tasks match your search' : 'No tasks yet' }}
      </p>
      <p class="text-sm text-slate-400 mt-1">
        {{ searchQuery ? 'Try a different keyword.' : 'Add your first task using the form above.' }}
      </p>
    </div>
  </section>
</template>
