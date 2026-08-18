<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-12 border-t border-border bg-card/60">
    <div
      class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6"
    >
      <p>© {{ year }} StudyTrack — Module 7 frontend prototype.</p>
      <p class="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Your data stays in this browser (localStorage)
      </p>
    </div>
  </footer>
</template>
