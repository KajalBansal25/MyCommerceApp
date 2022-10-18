const fetchUserData = data => {
  console.log('data>>>>', data);
  return {
    type: 'FETCH_USER_DATA',
    payload: data,
  };
};

const setTotalAmount = data => {
  console.log('data>>>>', data);
  return {
    type: 'SET_TOTAL_AMOUNT',
    payload: data,
  };
};

export default {fetchUserData, setTotalAmount};
