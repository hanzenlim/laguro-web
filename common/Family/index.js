import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { getFamilyQuery } from './queries';
import { Query } from 'react-apollo';
import { adopt } from 'react-adopt';
import { getUser } from '~/util/authUtils';
import { Loading } from '~/components';
import FamilyView from './view';

const Composed = adopt({
    getUser: ({ render }) => (
        <Query
            variables={{ id: _get(getUser(), 'id') }}
            query={getFamilyQuery}
            fetchPolicy="network-only"
        >
            {render}
        </Query>
    ),
});

class Family extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeModal: '',
            userId: '',
        };
    }

    closeModal = async () => {
        await this.setState({ activeModal: '', userId: '' });
    };

    openModal = ({ modal = '', userId = '' }) => {
        this.setState({ activeModal: modal, userId });
    };

    getFamilyMembersfromUser = ({ user }) => {
        const familyMembers = _get(user, 'family.members') || [];
        const primaryUserId = _get(user, 'family.primaryUser.id');
        const familyMembersWithoutPrimaryUser = familyMembers.filter(
            member => primaryUserId !== member.id
        );
        return familyMembersWithoutPrimaryUser;
    };

    getSelectedUserFullName = ({ familyMembers = [], userId = '' }) => {
        let filteredFamilyMembers = [];
        if (familyMembers && familyMembers.length) {
            filteredFamilyMembers = familyMembers.filter(m => m.id === userId);
        }
        const selectedUser = filteredFamilyMembers[0];
        return `${selectedUser.firstName} ${selectedUser.lastName}`;
    };

    render() {
        const { activeModal = '', userId = '' } = this.state;
        const { hideDentalRecords, hideAppointments } = this.props;

        return (
            <Composed>
                {({ getUser }) => {
                    const user = _get(getUser, 'data.getUser');
                    if (!user) return <Loading />;
                    const familyMembers = this.getFamilyMembersfromUser({
                        user,
                    });
                    const currentFamilyMember = _find(familyMembers, [
                        'id',
                        userId,
                    ]);

                    return (
                        <FamilyView
                            refetch={getUser.refetch}
                            userId={userId}
                            primaryUser={user}
                            familyMembers={familyMembers}
                            activeModal={activeModal}
                            openModal={this.openModal}
                            closeModal={this.closeModal}
                            currentFamilyMember={currentFamilyMember}
                            hideDentalRecords={hideDentalRecords}
                            hideAppointments={hideAppointments}
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default Family;
