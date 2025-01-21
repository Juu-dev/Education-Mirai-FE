const API_PATH = {
    login: '/auth/login',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    registerStudent: "/auth/register/student",
    quiz: {
        list: "/quizzes",
        pagination: "/quizzes/pagination"
    },
    class: {
        list: "/classes",
        pagination: `/classes/pagination`
    },
    exercise: {
        list: "/exercises",
        pagination: "/exercises/pagination"
    }
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

export const classPath = {url: API_PATH.class.pagination, auth: false, initQueries: {pageSize: 100}}

export const quizFetchPath = {
    url: API_PATH.quiz.pagination,
    auth: true,
    presentData: (data) => data.map(e => ({
        id: e.id,
        key: e.id,
        title: e.title,
        amount: e._count.questions,
        allDoneStudent: 0,
        origin: e
    }))
}

export const exerciseFetchPath = {
    url: API_PATH.exercise.pagination,
    auth: true,
    presentData: (data) => data.map(e => ({
        id: e.id,
        key: e.id,
        name: e.name,
        timeOut: e.timeOut,
        allDoneStudent: 0,
        description: e.description,
        assignerId: e.assignerId,
        classAssigneeId: e.classAssigneeId,
        quizId: e.quizId,
    }))
}

export const quizzesFetchPath = {
    url: API_PATH.quiz.list,
    auth: true,
    presentData: (data) => (data.map((e) => ({
        id: e.id,
        name: e.title
    })).sort((a, b) => a.name.localeCompare(b.name)))
}

export const classesFetchPath = {
    url: API_PATH.class.list,
    auth: true,
    presentData: (data) => (data.map((e) => ({
        id: e.id,
        name: e.name
    })).sort((a, b) => a.name.localeCompare(b.name)))
}

export const exercuseCreatePath = {
    url: API_PATH.exercise.list,
    successMsg: "Giao bài tập thành công!",
    errorMsg: "Giao bài tập thất bại, vui lòng thử lại.",
    fullResp: true,
}
