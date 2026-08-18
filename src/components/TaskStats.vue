<script setup>
defineProps({
  total: { type: Number, default: 0 },
  pending: { type: Number, default: 0 },
  inProgress: { type: Number, default: 0 },
  completed: { type: Number, default: 0 },
})
</script>

<template>
  <div class="grid grid-cols-2 gap-3 sm:grid-cols-4" role="status" aria-label="Task counts by status">
    <div class="rounded-xl border border-border bg-card px-4 py-3">
      <p class="text-xs font-medium text-muted-foreground">Total tasks</p>
      <p class="text-2xl font-bold text-foreground">{{ total }}</p>
    </div>
    <div class="rounded-xl border border-border bg-card px-4 py-3">
      <p class="text-xs font-medium text-muted-foreground">Pending</p>
      <p class="text-2xl font-bold text-foreground">{{ pending }}</p>
    </div>
    <div class="rounded-xl border border-border bg-card px-4 py-3">
      <p class="text-xs font-medium text-muted-foreground">In Progress</p>
      <p class="text-2xl font-bold text-primary">{{ inProgress }}</p>
    </div>
    <div class="rounded-xl border border-border bg-card px-4 py-3">
      <p class="text-xs font-medium text-muted-foreground">Completed</p>
      <p class="text-2xl font-bold text-secondary">{{ completed }}</p>
    </div>
  </div>
</template>
