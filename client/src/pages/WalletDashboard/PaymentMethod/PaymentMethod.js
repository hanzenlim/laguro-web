import React, { Fragment, useState, useCallback } from 'react';

import { Text, Button } from '../../../components';
import PaymentMethodModal from './PaymentMethodModal';

const PaymentMethod = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModalVisibility = useCallback(
        () => setModalOpen(!isModalOpen),
        [isModalOpen]
    );

    return (
        <Fragment>
            <Button type="ghost" height="auto" onClick={toggleModalVisibility}>
                <Text fontSize={1} fontWeight="medium" color="text.blue">
                    Payment method
                </Text>
            </Button>

            <PaymentMethodModal
                visible={isModalOpen}
                toggleModalVisibility={toggleModalVisibility}
            />
        </Fragment>
    );
};

export default PaymentMethod;
