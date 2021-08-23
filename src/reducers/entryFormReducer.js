import { ADD_ENTRY_SUCCESS, CREATE_ENTRY, ADD_TO_GALLERY, REMOVE_FROM_GALLERY, CLEAR_GALLERY } from 'constants/actionType';

const initState = {
  galleryFiles: [],
};

const entryFormState = (state = initState, action) => {
  switch (action.type) {
    case CREATE_ENTRY:
      return { ...state, values: action.payload };
    case ADD_ENTRY_SUCCESS:
      return { galleryFiles: [] };
    case ADD_TO_GALLERY:
      return { ...state, galleryFiles: [...state.galleryFiles, action.payload] };
    case REMOVE_FROM_GALLERY:
      return { ...state, galleryFiles: state.galleryFiles.filter(item => item.uri !== action.payload) };
    case CLEAR_GALLERY:
      return { ...state, galleryFiles: [] };
    default:
      return state;
  }
};

export default entryFormState;
