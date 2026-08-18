<script setup>
import { STATUS_OPTIONS } from '../utils/validators.js'

defineProps({
  modelValue: { type: String, default: '' },
  statusFilter: { type: String, default: 'All' },
})

const emit = defineEmits(['update:modelValue', 'update:statusFilter'])
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row">
    <div class="relative flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        placeholder="Search by title, subject, or description..."
        aria-label="Search tasks"
        class="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
    <select
      :value="statusFilter"
      @change="emit('update:statusFilter', $event.target.value)"
      aria-label="Filter by status"
      class="rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring sm:w-48"
    >
      <option value="All">All statuses</option>
      <option v-for="option in STATUS_OPTIONS" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>
