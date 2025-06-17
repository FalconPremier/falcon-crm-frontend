export enum UserRoutes {
  CREATE_AGENT = '/admin/user/createAgent',
  GET_USERS = '/admin/user/get',
}

export enum AuthRoutes {
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  SET_PASSWORD = '/auth/setPassword',
  REQUEST_OTP_FORGOT_PASSWORD = '/auth/requestOtp/forgotPassword',
  VERIFY_OTP = '/auth/verifyOtp',
  FORGOT_PASSWORD = '/auth/forgotPassword',
}
