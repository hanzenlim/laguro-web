import React from 'react';
import { shallow } from 'enzyme';
import { AddPhoneNumber } from '../../forms/AddPhoneNumber';

describe('<AddPhoneNumber />', () => {
    it('should throw an error because phone number is invalid', async () => {
        const component = shallow(
            <AddPhoneNumber
                updateUserProfile={jest.fn()}
                closeModal={jest.fn()}
                handleSubmit={jest.fn()}
                auth={{ id: 'user113' }}
            />
        );
        const values = { phoneNumber: '123' };

        expect(() => component.instance().onSubmit(values)).toThrowError();
    });

    it('should use default notification settings', async () => {
        const updateUserProfile = jest.fn();
        const userId = 'user113';
        const component = shallow(
            <AddPhoneNumber
                updateUserProfile={updateUserProfile}
                closeModal={jest.fn()}
                handleSubmit={jest.fn()}
                auth={{ id: userId }}
            />
        );
        const values = { phoneNumber: '1234567890' };
        component.instance().onSubmit(values);
        expect(updateUserProfile).toHaveBeenCalledWith(
            userId,
            expect.objectContaining({
                notificationSettings: { general: { email: true, sms: true } }
            })
        );
    });

    it('should use general notification settings', async () => {
        const updateUserProfile = jest.fn();
        const userId = 'user113';
        const component = shallow(
            <AddPhoneNumber
                updateUserProfile={updateUserProfile}
                closeModal={jest.fn()}
                handleSubmit={jest.fn()}
                auth={{ id: userId, notificationSettings: {} }}
            />
        );
        const values = { phoneNumber: '1234567890' };
        component.instance().onSubmit(values);
        expect(updateUserProfile).toHaveBeenCalledWith(
            userId,
            expect.objectContaining({
                notificationSettings: { general: { email: true, sms: true } }
            })
        );
    });

    it('should specifically enable sms', async () => {
        const updateUserProfile = jest.fn();
        const userId = 'user113';
        const component = shallow(
            <AddPhoneNumber
                updateUserProfile={updateUserProfile}
                closeModal={jest.fn()}
                handleSubmit={jest.fn()}
                auth={{
                    id: userId,
                    notificationSettings: { general: { email: false } }
                }}
            />
        );
        const values = { phoneNumber: '1234567890' };
        component.instance().onSubmit(values);
        expect(updateUserProfile).toHaveBeenCalledWith(
            userId,
            expect.objectContaining({
                notificationSettings: { general: { email: false, sms: true } }
            })
        );
    });
});
