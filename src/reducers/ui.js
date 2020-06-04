import {SET_PROGRESS_BAR} from '../actions/progressBar'

export const ui = (state = { progressBarStatus: 'OPEN' }, action) => {
  switch (action.type) {
    case SET_PROGRESS_BAR:
      return Object.assign({}, state, { progressBarStatus: action.isOpen });

  default:
   return state;
 }
};
export default ui