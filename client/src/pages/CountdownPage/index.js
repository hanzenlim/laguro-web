import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import moment from 'moment';
import { message } from 'antd';

import CountdownPage from './view';
import { RedirectErrorPage } from '../../pages/GeneralErrorPage';
import { addEmailToWaitlistMutation } from './queries';

class CountdownContainer extends PureComponent {
    state = {
        currentDate: moment().unix(),
        diffTime: null,
    };

    componentDidMount() {
        setInterval(() => {
            const eventDate = moment(
                '12-10-2018 00:00:00',
                'DD-MM-YYYY HH:mm:ss'
            ).unix();
            const currentDate = moment().unix();
            const diffTime = eventDate - currentDate;
            this.setState({ diffTime, currentDate });
        }, 1000);
    }

    render() {
        const duration = moment.duration(
            this.state.diffTime * 1000,
            'milliseconds'
        );
        const days = moment
            .duration(duration)
            .days()
            .toString();
        const hours = moment
            .duration(duration)
            .hours()
            .toString();
        const mins = moment
            .duration(duration)
            .minutes()
            .toString();
        const secs = moment
            .duration(duration)
            .seconds()
            .toString();
        return (
            <Mutation mutation={addEmailToWaitlistMutation}>
                {(addEmailToWaitlist, { data, loading, error }) => {
                    if (error) return <RedirectErrorPage />;

                    const onSuccess = async values => {
                        const input = {
                            email: values.email,
                        };

                        await addEmailToWaitlist({
                            variables: { input },
                        });

                        return message.success(
                            'Email successfully added to waitlist.'
                        );
                    };

                    return (
                        <CountdownPage
                            days={days}
                            hours={hours}
                            mins={mins}
                            secs={secs}
                            data={data}
                            loading={loading}
                            onSuccess={onSuccess}
                        />
                    );
                }}
            </Mutation>
        );
    }
}

export default CountdownContainer;
