const API_PATH = {
    login: '/auth/login',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    registerStudent: "/auth/register/student",
}

export const loginPath = {
    url: API_PATH.login,
    fullResp: true,
    isWithCredentials: true
}

export const logoutPath = {
    url: API_PATH.logout
}

export const refreshTokenPath = {
    url: API_PATH.refreshToken,
    isWithCredentials: true
}

export const registerPath = {
    url: API_PATH.registerStudent,
    successMsg: "Đăng ký thành công!",
    errorMsg: "Đăng ký thất bại, vui lòng thử lại.",
    fullResp: true,
}

export const classPath = {url: `/classes/pagination`, auth: false, initQueries: {pageSize: 100}}
