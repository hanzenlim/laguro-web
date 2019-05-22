import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import _get from 'lodash/get';
import { addEmailToWaitlistMutation } from './queries';
import { trackNewsletterSignup } from '../../../util/trackingUtils';

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
                            if (trackNewsletterSignup) {
                                trackNewsletterSignup();
                            }
                            return true;
                        }
                        return false;
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
