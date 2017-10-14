import { bake_cookie, read_cookie } from 'sfcookies';

const reminders = (state = read_cookie('reminders'), action) => {
  let remindersArray = null;
  if (action.type === 'ADD_REMINDER') {
    remindersArray = [...state, { text: action.text, id: Math.random(), dueDate: action.dueDate }];
    bake_cookie('reminders', remindersArray);
    return remindersArray;
  } else if (action.type === 'DELETE_REMINDER') {
    bake_cookie('reminders', reminders);
    return state.filter(reminder => reminder.id !== action.id);
  } else if (action.type === 'CLEAR_REMINDERS') {
    remindersArray = [];
    bake_cookie('reminders', reminders);
    return remindersArray;
  }
  return state;
};

export default reminders;
