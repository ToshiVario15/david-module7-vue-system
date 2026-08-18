export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed']

/**
 * Validate a task form payload.
 * @param {{title:string, description?:string, subject:string, dueDate:string, status:string}} form
 * @returns {{valid: boolean, errors: Record<string,string>}}
 */
export function validateTask(form) {
  const errors = {}

  const title = (form.title || '').trim()
  if (!title) {
    errors.title = 'Title is required.'
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters.'
  } else if (title.length > 100) {
    errors.title = 'Title must be under 100 characters.'
  }

  const subject = (form.subject || '').trim()
  if (!subject) {
    errors.subject = 'Subject is required.'
  } else if (subject.length > 60) {
    errors.subject = 'Subject must be under 60 characters.'
  }

  if (!form.dueDate) {
    errors.dueDate = 'Due date is required.'
  } else if (Number.isNaN(new Date(form.dueDate).getTime())) {
    errors.dueDate = 'Enter a valid date.'
  }

  const description = (form.description || '').trim()
  if (description.length > 500) {
    errors.description = 'Description must be under 500 characters.'
  }

  if (!STATUS_OPTIONS.includes(form.status)) {
    errors.status = 'Please select a valid status.'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
