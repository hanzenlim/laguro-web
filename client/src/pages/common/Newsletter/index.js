import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import { addEmailToWaitlistMutation } from './queries';
import { message } from 'antd';

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

                        await addEmailToWaitlistMutation({
                            variables: { input },
                        });

                        return message.success(
                            'Email successfully added to waitlist.'
                        );
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
