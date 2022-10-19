import axios from 'axios';

export function getHeader() {
  let header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  return header;
}

export function createAccountApi(payload, successCallback, failCallback) {
  return axios
    .post(`${process.env.REACT_APP_CONFIG_URL}/api/v1/create_user`, payload, {
      headers: getHeader(),
    })
    .then(resp => {
      console.log('resp====>>>>', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>', ex);
      failCallback(ex);
    });
}

export function logInApi(payload, successCallback, failCallback) {
  return axios
    .post(`${process.env.REACT_APP_CONFIG_URL}/api/v1/logIn`, payload, {
      headers: getHeader(),
    })
    .then(resp => {
      console.log('resp====>>>>', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>', ex);
      failCallback(ex);
    });
}

export function verifyEmailOfUser(payload, successCallback, failCallback) {
  return axios
    .post(`${process.env.REACT_APP_CONFIG_URL}/api/v1/verify_email`, payload, {
      headers: getHeader(),
    })
    .then(resp => {
      console.log('resp====>>>>', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>', ex);
      failCallback(ex);
    });
}

export function getUserData(payload, successCallback, failCallback) {
  return axios
    .post(`${process.env.REACT_APP_CONFIG_URL}/api/v1/get_user_data`, payload, {
      headers: getHeader(),
    })
    .then(resp => {
      console.log('resp====>>>>', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>', ex);
      failCallback(ex);
    });
}

export function getTotalAmountOfUser(payload, successCallback, failCallback) {
  return axios
    .post(
      `${process.env.REACT_APP_CONFIG_URL}/api/v1/get_Total_user`,
      payload,
      {
        headers: getHeader(),
      },
    )
    .then(resp => {
      console.log('resp====>>>>111', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>', ex);
      failCallback(ex);
    });
}

export function sendAmoundOfPurchased(payload, successCallback, failCallback) {
  return axios
    .post(
      `${process.env.REACT_APP_CONFIG_URL}/api/v1/amount/amount_user`,
      payload,
      {
        headers: getHeader(),
      },
    )
    .then(resp => {
      console.log('resp====>>>>111', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>', ex);
      failCallback(ex);
    });
}

export function showAllAdminData(successCallback, failCallback) {
  return axios
    .get(`${process.env.REACT_APP_CONFIG_URL}/api/v1/find_data/find`)
    .then(resp => {
      console.log('resp====>>>>111', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>', ex);
      failCallback(ex);
    });
}

export function getMoneyFromUser(payload, successCallback, failCallback) {
  return axios
    .post(
      `${process.env.REACT_APP_CONFIG_URL}/api/v1/money/get_money`,
      payload,
      {
        headers: getHeader(),
      },
    )
    .then(resp => {
      console.log('resp====>>>>111', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>Paymoney', ex);
      failCallback(ex);
    });
}

export function forgetPasswordApi(payload, successCallback, failCallback) {
  return axios
    .post(
      `${process.env.REACT_APP_CONFIG_URL}/api/v1/forget_password/sendEmail`,
      payload,
      {
        headers: getHeader(),
      },
    )
    .then(resp => {
      console.log('resp====>>>>111', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>Paymoney', ex);
      failCallback(ex);
    });
}

export function forgetPasswordApiAfterVarify(
  payload,
  successCallback,
  failCallback,
) {
  return axios
    .post(
      `${process.env.REACT_APP_CONFIG_URL}/api/v1/forget_password`,
      payload,
      {
        headers: getHeader(),
      },
    )
    .then(resp => {
      console.log('resp====>>>>111', resp);
      successCallback(resp);
    })
    .catch(ex => {
      console.log('errrr--->>>>Paymoney', ex);
      failCallback(ex);
    });
}
