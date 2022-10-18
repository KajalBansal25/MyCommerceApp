
const initialState = {
  userData: [],
  totalAmount: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_DATA':
        console.log('Typpp',action.payload)
      return {...state, userData: action.payload};
      case 'SET_TOTAL_AMOUNT':
        console.log('Typppiiiiiiii',action.payload)
      return {...state, totalAmount: action.payload};
    default:
      return state;
  }
};

export default userReducer;
