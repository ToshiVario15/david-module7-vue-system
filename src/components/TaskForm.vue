<script setup>
import { reactive, ref, watch } from 'vue'
import { STATUS_OPTIONS, validateTask } from '../utils/validators.js'

const props = defineProps({
  editingTask: { type: Object, default: null },
})

const emit = defineEmits(['submit', 'cancel'])

const emptyForm = () => ({
  title: '',
  description: '',
  subject: '',
  dueDate: '',
  status: 'Pending',
})

const form = reactive(emptyForm())
const errors = ref({})
const touched = ref({})

// Populate the form when an existing task is passed in for editing,
// and reset it back to blank when editing ends.
watch(
  () => props.editingTask,
  (task) => {
    errors.value = {}
    touched.value = {}
    if (task) {
      form.title = task.title
      form.description = task.description
      form.subject = task.subject
      form.dueDate = task.dueDate
      form.status = task.status
    } else {
      Object.assign(form, emptyForm())
    }
  },
  { immediate: true }
)

function markTouched(field) {
  touched.value[field] = true
}

function handleSubmit() {
  const { valid, errors: validationErrors } = validateTask(form)
  errors.value = validationErrors
  touched.value = { title: true, subject: true, dueDate: true, description: true, status: true }

  if (!valid) return

  emit('submit', { ...form })

  if (!props.editingTask) {
    Object.assign(form, emptyForm())
    touched.value = {}
    errors.value = {}
  }
}

function handleCancel() {
  Object.assign(form, emptyForm())
  errors.value = {}
  touched.value = {}
  emit('cancel')
}
</script>

<template>
  <form
    novalidate
    @submit.prevent="handleSubmit"
    class="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
  >
    <div class="flex items-center justify-between">
      <h2 class="text-base font-semibold text-foreground">
        {{ editingTask ? 'Edit task' : 'Add a new task' }}
      </h2>
      <span v-if="editingTask" class="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
        Editing
      </span>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="title" class="mb-1 block text-sm font-medium text-foreground">
          Title <span class="text-destructive">*</span>
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          maxlength="100"
          placeholder="e.g. Finish lab report"
          @blur="markTouched('title')"
          :aria-invalid="Boolean(touched.title && errors.title)"
          aria-describedby="title-error"
          class="w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          :class="touched.title && errors.title ? 'border-destructive' : 'border-border'"
        />
        <p v-if="touched.title && errors.title" id="title-error" class="mt-1 text-xs text-destructive">
          {{ errors.title }}
        </p>
      </div>

      <div>
        <label for="subject" class="mb-1 block text-sm font-medium text-foreground">
          Subject <span class="text-destructive">*</span>
        </label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          maxlength="60"
          placeholder="e.g. Chemistry"
          @blur="markTouched('subject')"
          :aria-invalid="Boolean(touched.subject && errors.subject)"
          aria-describedby="subject-error"
          class="w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          :class="touched.subject && errors.subject ? 'border-destructive' : 'border-border'"
        />
        <p v-if="touched.subject && errors.subject" id="subject-error" class="mt-1 text-xs text-destructive">
          {{ errors.subject }}
        </p>
      </div>

      <div>
        <label for="dueDate" class="mb-1 block text-sm font-medium text-foreground">
          Due date <span class="text-destructive">*</span>
        </label>
        <input
          id="dueDate"
          v-model="form.dueDate"
          type="date"
          @blur="markTouched('dueDate')"
          :aria-invalid="Boolean(touched.dueDate && errors.dueDate)"
          aria-describedby="dueDate-error"
          class="w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          :class="touched.dueDate && errors.dueDate ? 'border-destructive' : 'border-border'"
        />
        <p v-if="touched.dueDate && errors.dueDate" id="dueDate-error" class="mt-1 text-xs text-destructive">
          {{ errors.dueDate }}
        </p>
      </div>

      <div class="sm:col-span-2">
        <label for="description" class="mb-1 block text-sm font-medium text-foreground"> Description </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          maxlength="500"
          placeholder="Add any extra notes (optional)"
          @blur="markTouched('description')"
          :aria-invalid="Boolean(touched.description && errors.description)"
          aria-describedby="description-error"
          class="w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
          :class="touched.description && errors.description ? 'border-destructive' : 'border-border'"
        ></textarea>
        <div class="mt-1 flex items-center justify-between">
          <p v-if="touched.description && errors.description" id="description-error" class="text-xs text-destructive">
            {{ errors.description }}
          </p>
          <p class="ml-auto text-xs text-muted-foreground">{{ form.description.length }}/500</p>
        </div>
      </div>

      <div class="sm:col-span-2">
        <label for="status" class="mb-1 block text-sm font-medium text-foreground">Status</label>
        <select
          id="status"
          v-model="form.status"
          class="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option v-for="option in STATUS_OPTIONS" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
    </div>

    <div class="flex items-center gap-3 pt-1">
      <button
        type="submit"
        class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
      >
        {{ editingTask ? 'Save changes' : 'Add task' }}
      </button>
      <button
        v-if="editingTask"
        type="button"
        @click="handleCancel"
        class="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-border bg-transparent px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
