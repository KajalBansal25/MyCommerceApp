
const initialState = {
  userData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_DATA':
        console.log('Typpp',action.payload)
      return {...state, userData: action.payload};
    default:
      return state;
  }
};

export default userReducer;
