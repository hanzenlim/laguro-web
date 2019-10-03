import _capitalize from 'lodash/capitalize';
import get from 'lodash/get';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { Mutation, Query } from 'react-apollo';
import isEmpty from 'lodash/isEmpty';
import { Loading } from '~/components';
import { RedirectErrorPage } from '~/routes/GeneralErrorPage';
import { getUser, setUser } from '~/util/authUtils';
import { execute } from '~/util/gqlUtils';
import {
    ABBREVIATED_DAYS,
    WEEK_DAYS_INDEX,
    UPPERCASE_DAYS,
} from '~/util/timeUtil';
import { getUserQuery, updateDentistMutation } from './queries';
import DentistAvailabilityFormView from './view';

class DentistAvailabilityForm extends PureComponent {
    getMappedUserData = userData => {
        const { dentist } = userData;

        if (!dentist) return {};

        const {
            setHasPreferredDays,
            hasPreferredDaysFromAPI,
            setHasPreferredDaysFromAPI,
        } = this.props;

        return {
            dentistId: dentist.id,
            availabilityList: !isEmpty(dentist.preferredAvailability)
                ? dentist.preferredAvailability.map(availability => {
                      const days = {};

                      if (
                          !isEmpty(availability.days) &&
                          !hasPreferredDaysFromAPI
                      ) {
                          setHasPreferredDays(true);
                          setHasPreferredDaysFromAPI(true);
                      }

                      if (availability.days) {
                          availability.days.forEach(day => {
                              const dayIndex =
                                  WEEK_DAYS_INDEX[_capitalize(day)];
                              days[ABBREVIATED_DAYS[dayIndex]] = true;
                          });
                      }

                      return {
                          startTime: moment(
                              `${availability.startDay} ${availability.startTime}`
                          ),
                          endTime: moment(
                              `${availability.endDay} ${availability.endTime}`
                          ),
                          range: [
                              moment(availability.startDay),
                              moment(availability.endDay),
                          ],
                          days,
                          selectedLocations: JSON.stringify(
                              availability.preferredLocationIndices
                          ),
                          isOpen: true,
                      };
                  })
                : [
                      {
                          startTime: moment()
                              .startOf('hour')
                              .hour(8),
                          endTime: moment()
                              .startOf('hour')
                              .hour(15),
                          range: [
                              moment()
                                  .startOf('day')
                                  .add(1, 'day'),
                              null,
                          ],
                          days: {},
                          selectedLocations: '',
                          isOpen: true,
                      },
                  ],
        };
    };

    render() {
        const user = getUser();

        const { hasPreferredDays, setHasPreferredDays } = this.props;

        return (
            <Query query={getUserQuery} variables={{ id: get(user, 'id') }}>
                {({ loading, error, data: userData }) => {
                    if (error) return <RedirectErrorPage />;
                    if (loading) return <Loading />;

                    return (
                        <Mutation mutation={updateDentistMutation}>
                            {updateDentist => {
                                const data = get(userData, 'getUser');
                                const mappedData = this.getMappedUserData(data);

                                const onSuccess = async values => {
                                    const { availabilityList } = values;

                                    const input = {
                                        id: mappedData.dentistId,
                                        preferredAvailability: availabilityList.map(
                                            availability => {
                                                const days = Object.keys(
                                                    availability.days
                                                )
                                                    .filter(
                                                        key =>
                                                            availability.days[
                                                                key
                                                            ]
                                                    )
                                                    .map(day => {
                                                        const dayIndex = ABBREVIATED_DAYS.indexOf(
                                                            day
                                                        );
                                                        return UPPERCASE_DAYS[
                                                            dayIndex
                                                        ];
                                                    });

                                                const endDay =
                                                    availability.range[1] ||
                                                    moment().add(5, 'years');

                                                return {
                                                    days,
                                                    preferredLocationIndices: JSON.parse(
                                                        availability.selectedLocations
                                                    ),
                                                    startTime: availability.startTime
                                                        .startOf('hour')
                                                        .format()
                                                        .split('T')[1]
                                                        .split('+')[0]
                                                        .split('-')[0],
                                                    endTime: availability.endTime
                                                        .startOf('hour')
                                                        .format()
                                                        .split('T')[1]
                                                        .split('+')[0]
                                                        .split('-')[0],
                                                    startDay: availability.range[0]
                                                        .format()
                                                        .split('T')[0],
                                                    endDay: endDay
                                                        .format()
                                                        .split('T')[0],
                                                };
                                            }
                                        ),
                                    };

                                    const result = await execute({
                                        action: async () => {
                                            const {
                                                data: _updateDentistData,
                                            } = await updateDentist({
                                                variables: { input },
                                            });

                                            if (_updateDentistData) {
                                                setUser({
                                                    ..._updateDentistData.updateUser,
                                                });
                                            }
                                        },
                                    });

                                    return result;
                                };

                                return (
                                    <DentistAvailabilityFormView
                                        data={mappedData}
                                        onSuccess={onSuccess}
                                        hasPreferredDays={hasPreferredDays}
                                        setHasPreferredDays={
                                            setHasPreferredDays
                                        }
                                    />
                                );
                            }}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default DentistAvailabilityForm;
