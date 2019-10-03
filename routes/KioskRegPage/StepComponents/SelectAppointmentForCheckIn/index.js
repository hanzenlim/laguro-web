import React, { useState } from 'react';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { adopt } from 'react-adopt';
import { GET_FAMILY_MEMBERS } from './queries';
import { getUser } from '~/util/authUtils';
import cookies from 'browser-cookies';
import SelectAppointmentForCheckInView from './view';
import { Loading } from '~/components';

const Composed = adopt({
    getAppointmentsOfFamilyMembers: ({ render, onCompleted, id }) => (
        <Query
            query={GET_FAMILY_MEMBERS}
            onCompleted={onCompleted}
            variables={{ id }}
        >
            {render}
        </Query>
    ),
});

const SelectAppointmentForCheckIn = props => {
    const loggedInUser = getUser();
    const [selectedUserId, setSelectedUserId] = useState('');

    const getFamilyMembers = user => {
        const familyMembers = _get(user, 'family.members') || [];
        const familyMembersWithAppointments = familyMembers.filter(
            member => !_isEmpty(member.appointments)
        );
        return familyMembersWithAppointments;
    };

    const handleSubmit = () => {
        cookies.set('kioskSelectedFamilyMember', selectedUserId, {
            expires: 0,
        });
        // Redirects to birthday step
        props.formikProps.submitForm();
    };

    const handleCompleted = data => {
        const user = _get(data, 'getUser');
        const familyMembersWithAppointments = getFamilyMembers(user);

        if (_isEmpty(familyMembersWithAppointments)) {
            // Redirects to birthday step
            props.formikProps.submitForm();
        }
    };

    return (
        <Composed id={_get(loggedInUser, 'id')} onCompleted={handleCompleted}>
            {({ getAppointmentsOfFamilyMembers }) => {
                if (getAppointmentsOfFamilyMembers.loading) return <Loading />;
                const user = _get(
                    getAppointmentsOfFamilyMembers,
                    'data.getUser'
                );
                const familyMembersWithAppointments = getFamilyMembers(user);

                return (
                    <SelectAppointmentForCheckInView
                        familyMembers={familyMembersWithAppointments}
                        selectedUserId={selectedUserId}
                        setSelectedUserId={setSelectedUserId}
                        onSubmit={handleSubmit}
                    />
                );
            }}
        </Composed>
    );
};

export default SelectAppointmentForCheckIn;
