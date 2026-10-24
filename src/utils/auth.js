const TOKEN_KEY = "token";
const LEGACY_TOKEN_KEY = "user_token";

export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
};

export const getToken = () => {
    const token = localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
    if (token && !localStorage.getItem(TOKEN_KEY)) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.removeItem(LEGACY_TOKEN_KEY);
    }
    return token;
};

export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
};
