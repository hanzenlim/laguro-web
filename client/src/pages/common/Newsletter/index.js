import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import { addEmailToWaitlistMutation } from './queries';
import _get from 'lodash/get';

import SubscribeView from './view';

class Newsletter extends PureComponent {
    render() {
        return (
            <Composed>
                {({ addEmailToWaitlistMutation }) => {
                    const onSuccess = async values => {
                        const input = {
                            email: values.email,
                        };

                        const result = await addEmailToWaitlistMutation({
                            variables: { input },
                        });

                        if (_get(result, 'data.addEmailToWaitlist.id')) {
                            return true;
                        } else {
                            return false;
                        }
                    };

                    return <SubscribeView onSuccess={onSuccess} />;
                }}
            </Composed>
        );
    }
}

const Composed = adopt({
    addEmailToWaitlistMutation: ({ render }) => (
        <Mutation mutation={addEmailToWaitlistMutation}>{render}</Mutation>
    ),
});

export default Newsletter;
