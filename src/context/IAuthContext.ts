import React from "react";

export interface IUser {
    id: string;
    username: string;
    email: string;
    name: string;
    dob: string;
    ethnicity: string;
    gender: string;
    teacher?: {
        id: string;
        userId: string;
        classId: string;
        metadataUrl: string;
        dob: string;
        position: string;
        createdAt: string;
        updatedAt: string;

    };
    librarian?: object;
    student?: object;
    class: {
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        _count: {
            user: number
        }
    }
    role: string;
}

export interface ILoginData {
    username: string;
    password: string;
}

export interface IAuthContext {
    isAuthenticated: boolean | null;
    login_CallFromUI: (data: ILoginData) => Promise<void>;
    logout_CallFromUI: () => Promise<void>;
    me: IUser | null;
    setMe: (data: IUser) => void;
    isTeacher: boolean,
    isStudent: boolean,
    isPrincipal: boolean,
    isLibrarian: boolean,
    isUploadableDocument: boolean
}

export interface IAuthProviderProps {
    children?: React.ReactNode;
}
