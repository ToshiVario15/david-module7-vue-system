<script setup>
defineProps({
  pendingCount: { type: Number, default: 0 },
})
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <div>
          <h1 class="text-lg font-bold leading-tight tracking-tight text-foreground sm:text-xl">StudyTrack</h1>
          <p class="text-xs text-muted-foreground sm:text-sm">Student Task Manager</p>
        </div>
      </div>

      <div
        class="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground sm:flex"
        role="status"
      >
        <span class="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
        {{ pendingCount }} task{{ pendingCount === 1 ? '' : 's' }} pending
      </div>
    </div>
  </header>
</template>
