const fetchUserData = data => {
    console.log('data>>>>',data)
  return {
    type: 'FETCH_USER_DATA',
    payload: data,
  };
};

export default {fetchUserData}