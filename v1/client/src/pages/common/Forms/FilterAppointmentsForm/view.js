import React, { PureComponent } from 'react';
import moment from 'moment';
import { Form, Select } from '../../../../components';

const { SubmitButton, FormItem } = Form;

const renderOptions = list => (
    <Select>
        {list.map(item => {
            if (item.key === 'Today')
                return (
                    <Select.Option value={item.key}>{'Today'}</Select.Option>
                );
            return (
                <Select.Option value={item.key}>
                    {moment(item.value).format('ddd, MM/DD/YYYY')}
                </Select.Option>
            );
        })}
    </Select>
);

class FilterAppointmentsFormView extends PureComponent {
    constructor(props) {
        super(props);

        this.form = null;
    }

    handleSelectLocation = async location => {
        await this.props.onSelectLocation(location);

        this.form.props.form.setFieldsValue({
            date:
                this.props.availableDateList[0] &&
                this.props.availableDateList[0].key,
        });
    };

    wrapComponentRef = form => {
        this.form = form;
    };

    render() {
        const {
            handleSubmit,
            availableDateList,
            locationList,
            hasTimeFilter,
        } = this.props;

        return (
            <Form
                onSuccess={handleSubmit}
                debounce="false"
                wrappedComponentRef={this.wrapComponentRef}
            >
                <FormItem
                    mb={20}
                    name="location"
                    label="location"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a Location',
                        },
                    ]}
                    initialValue={locationList[0]}
                    input={
                        <Select onSelect={this.handleSelectLocation}>
                            {locationList.map(location => (
                                <Select.Option value={location}>
                                    {location}
                                </Select.Option>
                            ))}
                        </Select>
                    }
                />
                {hasTimeFilter ? (
                    <FormItem
                        name="date"
                        label="date"
                        mb={20}
                        rules={[
                            {
                                required: true,
                                message: 'Please select a date',
                            },
                        ]}
                        initialValue={
                            availableDateList[0] && availableDateList[0].key
                        }
                        input={renderOptions(availableDateList)}
                    />
                ) : null}

                <SubmitButton
                    width="100%"
                    height="59px"
                    fontSize={3}
                    px={14}
                    buttonText="Find"
                />
            </Form>
        );
    }
}

FilterAppointmentsFormView.defaultProps = {
    hasTimeFilter: true,
};

export default FilterAppointmentsFormView;
