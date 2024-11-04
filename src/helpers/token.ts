import Cookies from 'js-cookie';
import { CookieAttributes } from 'node_modules/@types/js-cookie';

/**
 * Get access token from local storage
 * @returns Return access token
 */
const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

/**
 * Set access token to local storage
 * @param accessToken
 */
const setAccessToken = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken);
};

/**
 * Remove access token to local storage
 */
const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
};

/**
 * Get access token from local storage
 * @returns Return refresh token
 */
const getRefreshToken = () => {
    return Cookies.get('refreshToken');
};

/**
 * Set refresh token to cookie
 * @param refreshToken
 */
const setRefreshToken = (refreshToken: string) => {
    const cookieOptions: CookieAttributes = {
        expires: 30, // Expires in 30 days
    };

    Cookies.set('refreshToken', refreshToken, cookieOptions);
};

/**
 * Remove refresh token to local storage
 */
const removeRefreshToken = () => {
    Cookies.remove('refreshToken');
};

const token = {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
};

export default token;
