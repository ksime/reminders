export const addReminder = (text, dueDate) => ({ type: 'ADD_REMINDER', text, dueDate });
export const deleteReminder = id => ({ type: 'DELETE_REMINDER', id });
export const clearReminders = () => ({ type: 'CLEAR_REMINDERS' });
