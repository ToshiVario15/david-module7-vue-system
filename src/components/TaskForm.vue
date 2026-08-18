<script setup>
import { reactive, watch, ref } from 'vue'
import { validateTask, isValid } from '../utils/validators.js'
import TaskFormFields from './TaskFormFields.vue'

const props = defineProps({
  // When editing, pass the existing task; null/undefined means "create" mode.
  task: { type: Object, default: null },
  // Renders as a centered modal dialog (used for editing) vs. an inline card (used for creating).
  isModal: { type: Boolean, default: false },
})

const emit = defineEmits(['submit', 'cancel'])

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed']

function emptyForm() {
  return {
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    status: 'Pending',
  }
}

const form = reactive(emptyForm())
const errors = reactive({})
const submitAttempted = ref(false)

function syncFromTask() {
  const source = props.task
  const base = source
    ? {
        title: source.title,
        description: source.description,
        subject: source.subject,
        dueDate: source.dueDate,
        status: source.status,
      }
    : emptyForm()
  Object.assign(form, base)
  Object.keys(errors).forEach((k) => delete errors[k])
  submitAttempted.value = false
}

watch(() => props.task, syncFromTask, { immediate: true })

function validateField(field) {
  const fieldErrors = validateTask(form)
  if (fieldErrors[field]) {
    errors[field] = fieldErrors[field]
  } else {
    delete errors[field]
  }
}

function handleSubmit() {
  submitAttempted.value = true
  const fieldErrors = validateTask(form)
  Object.keys(errors).forEach((k) => delete errors[k])
  Object.assign(errors, fieldErrors)

  if (!isValid(fieldErrors)) return

  emit('submit', { ...form })

  if (!props.isModal) {
    // Reset the inline create form after a successful submit.
    Object.assign(form, emptyForm())
    submitAttempted.value = false
  }
}

function handleCancel() {
  emit('cancel')
}
</script>

<template>
  <!-- Modal wrapper (edit mode) -->
  <div
    v-if="isModal"
    class="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="task-form-title"
    @keydown.esc="handleCancel"
  >
    <div class="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-xl max-h-[92vh] overflow-y-auto">
      <div class="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
        <h2 id="task-form-title" class="text-base sm:text-lg font-semibold text-slate-900">Edit Task</h2>
        <button
          type="button"
          class="w-9 h-9 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          aria-label="Close edit dialog"
          @click="handleCancel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <div class="px-5 sm:px-6 py-5">
        <TaskFormFields
          :form="form"
          :errors="errors"
          :status-options="STATUS_OPTIONS"
          @field-blur="validateField"
        />
      </div>
      <div class="flex gap-3 px-5 sm:px-6 py-4 border-t border-slate-100 sticky bottom-0 bg-white">
        <button
          type="button"
          class="flex-1 h-11 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 active:scale-[0.98] transition"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          type="button"
          class="flex-1 h-11 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-[0.98] transition shadow-sm"
          @click="handleSubmit"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>

  <!-- Inline card (create mode) -->
  <section v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
    <div class="flex items-center gap-2 mb-4">
      <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14" /></svg>
      </div>
      <h2 class="text-base sm:text-lg font-semibold text-slate-900">Add New Task</h2>
    </div>
    <TaskFormFields
      :form="form"
      :errors="errors"
      :status-options="STATUS_OPTIONS"
      @field-blur="validateField"
    />
    <button
      type="button"
      class="mt-5 w-full h-11 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 active:scale-[0.98] transition shadow-sm flex items-center justify-center gap-2"
      @click="handleSubmit"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14" /></svg>
      Add Task
    </button>
  </section>
</template>
