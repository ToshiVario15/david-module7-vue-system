<script setup>
defineProps({
  task: { type: Object, required: true },
})
const emit = defineEmits(['edit', 'delete', 'status-change'])

const statusStyles = {
  Pending: 'bg-muted text-muted-foreground border-border',
  'In Progress': 'bg-primary/10 text-primary border-primary/30',
  Completed: 'bg-secondary/10 text-secondary border-secondary/30',
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function isOverdue(task) {
  if (task.status === 'Completed' || !task.dueDate) return false
  const due = new Date(`${task.dueDate}T23:59:59`)
  return due.getTime() < Date.now()
}
</script>

<template>
  <li class="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="break-words font-semibold text-foreground">{{ task.title }}</h3>
          <span class="shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium" :class="statusStyles[task.status]">
            {{ task.status }}
          </span>
          <span
            v-if="isOverdue(task)"
            class="shrink-0 rounded-full border border-destructive/30 bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive"
          >
            Overdue
          </span>
        </div>
        <p class="mt-1 text-sm text-muted-foreground">{{ task.subject }} • Due {{ formatDate(task.dueDate) }}</p>
        <p v-if="task.description" class="mt-2 whitespace-pre-line break-words text-sm text-foreground/90">
          {{ task.description }}
        </p>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap items-center gap-2">
      <label class="sr-only" :for="`status-${task.id}`">Change status for {{ task.title }}</label>
      <select
        :id="`status-${task.id}`"
        :value="task.status"
        @change="emit('status-change', task.id, $event.target.value)"
        class="min-h-[36px] rounded-lg border border-border bg-background px-2.5 py-2 text-xs font-medium text-foreground transition focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        type="button"
        @click="emit('edit', task)"
        class="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
        Edit
      </button>
      <button
        type="button"
        @click="emit('delete', task)"
        class="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-2 text-xs font-medium text-destructive transition hover:bg-destructive/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
        Delete
      </button>
    </div>
  </li>
</template>
