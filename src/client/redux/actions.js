export const actionTypes = {
  setFilter: 'SET_FILTER',
  toggleTodo: 'TOGGLE_TODO',
};

export const setFilter = filter => ({ type: actionTypes.setFilter, filter });
export const toggleTodo = id => ({ type: actionTypes.toggleTodo, id });
