import { createContext, useState } from 'react';

export const AppContext = createContext({ isAuth: false, mounted: false });
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

export const useLogin = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [customRedirect, setCustomRedirect] = useState(null);
    const [sideEffect, setSideEffect] = useState(() => {});
    const [mode, setMode] = useState('signIn');

    const openLoginModal = ({
        redirectPath = null,
        sideEffect: updatedSideEffect = () => {},
        mode: updatedMode = 'signIn',
    } = {}) => {
        setLoginModalOpen(true);
        setCustomRedirect(redirectPath);
        setSideEffect(updatedSideEffect);
        setMode(updatedMode);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
        setMode('signIn');
    };

    const toggleLoginModal = () => {
        setLoginModalOpen(!isLoginModalOpen);
        setMode('signIn');
    };

    return {
        isLoginModalOpen,
        customRedirect,
        sideEffect,
        mode,
        openLoginModal,
        closeLoginModal,
        toggleLoginModal,
    };
};

export const LoginContext = createContext();
export const LoginContextProvider = LoginContext.Provider;
