import React from 'react';
import KioskDentistProfilePage from '~/common/KioskDentistProfilePage';
import { usePrivateApp } from '../../util/authUtils';

function KioskDentistProfile() {
    const { isRouteAccessible } = usePrivateApp();

    return isRouteAccessible ? <KioskDentistProfilePage /> : null;
}

export default KioskDentistProfile;
