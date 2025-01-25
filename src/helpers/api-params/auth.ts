import {formatDate} from "../date.ts";
import {requestStatus} from "../../constants/status/requestStatus.ts";

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
        pagination: "/exercises/pagination/class"
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

export const classPath = {
    url: API_PATH.class.pagination,
    auth: false,
    initQueries: {pageSize: 100},
    presentData: (data) => (data.map((e) => ({
        id: e.id,
        name: e.name
    })).sort((a, b) => a.name.localeCompare(b.name)))
}

export const quizFetchPath = {
    url: API_PATH.quiz.pagination,
    auth: true,
    initQueries: {pageSize: 5},
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
    initQueries: {pageSize: 5},
    presentData: (data) => data.map(e => ({
        id: e.id,
        key: e.id,
        name: e.name,
        timeOut: e.timeOut,
        allDoneStudent: e.countDoneStudent,
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

export const exerciseCreatePath = {
    url: API_PATH.exercise.list,
    successMsg: "Giao bài tập thành công!",
    errorMsg: "Giao bài tập thất bại, vui lòng thử lại.",
    fullResp: true,
}

export const sentTaskPath = {
    url: "/tasks/sent-mode",
    auth: true,
    initQueries: {
        pageSize: 5
    },
    presentData: (data) => data.map((item: any) => ({
        key: item.id,
        id: item.id,
        task: item.title,
        assignedTo: item.assignee?.name || "Hiệu trưởng",
        deadline: formatDate(item.endTime),
        content: item.description,
        status: requestStatus[item.status]
    }))
}

export const receivedTaskPath = {
    url: "/tasks/received-mode",
    auth: true,
    initQueries: {
        pageSize: 5
    },
    presentData: (data) => data.map((item: any) => ({
        key: item.id,
        id: item.id,
        task: item.title,
        assignedBy: item.assigner?.name || "Hiệu trưởng",
        deadline: formatDate(item.endTime),
        content: item.description,
        status: requestStatus[item.status]
    }))
}
