// project imports
import config from 'config';

// action - state management
import * as actionTypes from './actions';

export const initialState = {
  isOpen: [], 
  isAdminOpen: [], 
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  adminOpened: true,
  user: null
};


// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.ADMIN_MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isAdminOpen: [id]
      };
    case actionTypes.ADMIN_SET_MENU:
      return {
        ...state,
        adminOpened: action.adminOpened
      };
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default customizationReducer;
