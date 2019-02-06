import React, { Fragment } from 'react';
import { CheckInConfirmation } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';

const KioskCheckInPage = props => {
    return (
        <Flex justifyContent="center" mt="100px">
            <CheckInConfirmation
                date="Jan. 19. 2019"
                rating={4}
                time="5:15PM"
                doctorName="Dr. William Choi"
            />
        </Flex>
    );
};

export default KioskCheckInPage;
