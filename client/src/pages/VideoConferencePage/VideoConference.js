import React, { useRef, useEffect } from 'react';
import get from 'lodash/get';
import qs from 'query-string';

import { Box } from '../../components';
import history from '../../history';
import { getUser } from '../../util/authUtils';

function VideoConference() {
    const meetElement = useRef(null);
    const pathname = get(history, 'location.pathname', '');
    const dentistId = pathname.split('/')[1];
    const { firstName, lastName } = getUser();

    useEffect(() => {
        if (
            window &&
            typeof window !== 'undefined' &&
            window.JitsiMeetExternalAPI &&
            meetElement &&
            dentistId
        ) {
            window.scrollTo(0, meetElement.current.offsetTop);

            const domain = 'meet.jit.si';
            const options = {
                roomName: dentistId,
                height: '100%',
                parentNode: meetElement.current,
            };

            const api = new window.JitsiMeetExternalAPI(domain, options);

            api.executeCommand(
                'displayName',
                firstName || lastName
                    ? `${firstName || ''} ${lastName || ''}`
                    : 'User'
            );
        }
    }, [meetElement, dentistId]);

    return (
        <Box height="100vh">
            <Box height="100%" ref={meetElement} />
        </Box>
    );
}

export default VideoConference;
