import React, { useContext } from 'react';
import _get from 'lodash/get';
import { useRouter } from 'next/router';

import { AppContext } from '../../appContext';
import HeaderView from './view';
import { withScreenSizes } from '~/components/Responsive';
import { onLogout, getUser } from '~/util/authUtils';

const HeaderContainer = ({
    isLoginModalOpen,
    customRedirect,
    sideEffect,
    mode,
    closeLoginModal,
    toggleLoginModal,
}) => {
    const router = useRouter();
    const { mounted } = useContext(AppContext);

    const handleLogout = () => {
        onLogout();
    };

    if (router.pathname.includes('kiosk')) {
        return null;
    }

    const user = mounted && getUser();

    return (
        <HeaderView
            auth={user}
            isDentist={_get(user, 'isDentist')}
            isHost={_get(user, 'isHost')}
            hasUpdatedDentistBio={!!_get(user, 'hasUpdatedDentistBio')}
            onLogout={handleLogout}
            toggleLoginModal={toggleLoginModal}
            closeLoginModal={closeLoginModal}
            isLoginModalOpen={isLoginModalOpen}
            pathname={router.asPath}
            customRedirect={customRedirect}
            sideEffect={sideEffect}
            mode={mode}
        />
    );
};

export default withScreenSizes(HeaderContainer);
