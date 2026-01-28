import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { parseJwt } from '../auth/authService';

import { openModalFunc } from '../redux/generalSlice';

export const useSessionTimeout = (token, warningSeconds = 60) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) return;

        const payload = parseJwt(token);
        if (!payload) return;

        const expireAt = payload.exp * 1000;
        const warningAt = expireAt - warningSeconds * 1000;

        const timer = setTimeout(() => {
            dispatch(openModalFunc('SESSION_TIMEOUT'));
        }, Math.max(warningAt - Date.now(), 0));

        return () => clearTimeout(timer);
    }, [token, warningSeconds, dispatch]);
};
