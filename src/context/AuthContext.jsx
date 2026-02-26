import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe, logout as apiLogout } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);       // { id, email, wechat_openid, membership }
    const [loading, setLoading] = useState(true);  // True while we check if user is logged in

    // On app mount, check if there is an active session
    useEffect(() => {
        getMe()
            .then(data => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const refreshUser = async () => {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch { setUser(null); }
    };

    const logout = async () => {
        await apiLogout().catch(() => { });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
