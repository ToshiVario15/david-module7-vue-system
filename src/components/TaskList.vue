<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: { type: Array, default: () => [] },
  hasAnyTasks: { type: Boolean, default: false },
})
const emit = defineEmits(['edit', 'delete', 'status-change'])
</script>

<template>
  <div>
    <ul v-if="tasks.length" class="grid grid-cols-1 gap-4 md:grid-cols-2" role="list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="(t) => emit('edit', t)"
        @delete="(t) => emit('delete', t)"
        @status-change="(id, status) => emit('status-change', id, status)"
      />
    </ul>
    <div v-else class="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mx-auto h-10 w-10 text-muted-foreground"
        aria-hidden="true"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
      <p class="mt-3 text-sm font-medium text-foreground">
        {{ hasAnyTasks ? 'No tasks match your search' : 'No tasks yet' }}
      </p>
      <p class="mt-1 text-sm text-muted-foreground">
        {{ hasAnyTasks ? 'Try a different search term or status filter.' : 'Add your first task using the form above.' }}
      </p>
    </div>
  </div>
</template>
