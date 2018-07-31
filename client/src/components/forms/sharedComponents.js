import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import MaskedInput from 'react-text-mask';
import { Field } from 'redux-form';

import {
    Input,
    Grid,
    Option,
    Select,
    Checkbox,
    Typography,
    Flex,
    Button,
    Box
} from '../common';
import { Padding } from '../common/Spacing';
import { renderPrice, removeSpecialChars } from '../../util/paymentUtil';
import { required, dollarMinimum } from './formValidation';
import exitSVG from '../icons/exit.svg';
import equipmentList from '../../staticData/equipmentList';
import procedureList from '../../staticData/procedureList';

const StyledRemoveButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const StyledUl = styled.ul`
    margin: 0;
`;

export const addTooltip = (text, fontSize = '0.8rem') => {
    return (
        <Tooltip id="tooltip-right" title={text} placement="right">
            <i
                className="material-icons tiny"
                style={{
                    fontSize: `${fontSize}`,
                    marginLeft: '3px',
                    padding: '3px'
                }}
            >
                help_outline
            </i>
        </Tooltip>
    );
};

export const renderOptionsFromList = (list, selected = null) => {
    return list.map(object => {
        return (
            <Option
                value={object.name}
                key={object.id}
                disabled={checkIfAlreadySelected(object.name, selected)}
            >
                {object.name}
            </Option>
        );
    });
};

export const checkIfAlreadySelected = (objectName, selectedObjects) => {
    // get list of all currently selected equipment from the form reducer
    if (!selectedObjects) return false;
    // parse out a list of names
    let selectedNames = selectedObjects.map(obj => obj.name);
    // return true if that option is already selected, otherwise false
    return selectedNames.includes(objectName);
};

export const renderEquipmentSelector = ({
    fields,
    className,
    selected,
    meta: { error }
}) => {
    return (
        <ul className={className}>
            {fields.map((equipment, index) => (
                <li key={index}>
                    <Grid container alignItems="flex-end">
                        <Grid item xs={4}>
                            <Field
                                name={`${equipment}.name`}
                                component={renderSelect}
                                validate={required}
                            >
                                {renderOptionsFromList(equipmentList, selected)}
                            </Field>

                            <Padding bottom="16" />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            <Field
                                name={`${equipment}.price`}
                                type="text"
                                placeholder="15"
                                component={renderField}
                                label="Usage Price"
                                tooltip="How much do you want to charge dentists to use this equipment? (one-time charge)"
                                validate={[required, dollarMinimum]}
                                format={value => renderPrice(value)}
                                normalize={value => removeSpecialChars(value)}
                            />
                            <Padding bottom="16" />
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={2}>
                            <StyledRemoveButton
                                type="button"
                                title="Remove Equipment"
                                onClick={() => fields.remove(index)}
                            >
                                <img src={exitSVG} alt="Remove Equipment" />
                            </StyledRemoveButton>
                            <Padding bottom="16" />
                        </Grid>
                    </Grid>
                </li>
            ))}
            <li>
                <Button
                    type="button"
                    color="primary"
                    onClick={() => fields.push({ name: '', price: 2000 })}
                >
                    Add Equipment
                </Button>
            </li>
            {error && <span>{error}</span>}
            <Padding bottom="16" />
        </ul>
    );
};

export const renderProcedureSelector = ({ fields, className, selected }) => (
    <div>
        <StyledUl className={className}>
            <label>
                {'Procedures Offered'}
                {addTooltip(
                    'List all the procedures you want patients to be able to book with you and the estimated time it takes you to complete each.'
                )}
            </label>
            {fields.map((procedure, index) => (
                <Flex width={500} p={2} key={index}>
                    <Box m={2} width={200}>
                        <Field
                            name={`${procedure}.name`}
                            component={renderSelect}
                            validate={required}
                        >
                            {renderOptionsFromList(procedureList, selected)}
                        </Field>
                    </Box>
                    <Box m={2} width={200}>
                        <Field
                            name={`${procedure}.duration`}
                            component={renderSelect}
                            children={durationOptions}
                        />
                    </Box>
                    <Box m={2} width={28}>
                        {index !== 0 && (
                            <StyledRemoveButton
                                type="button"
                                title="Remove Equipment"
                                onClick={() => {
                                    fields.remove(index);
                                }}
                            >
                                <img src={exitSVG} alt="Remove Equipment" />
                            </StyledRemoveButton>
                        )}
                    </Box>
                </Flex>
            ))}
            <li>
                <Flex mt={1}>
                    <button
                        type="button"
                        className="waves-effect btn light-blue lighten-2"
                        onClick={() => {
                            fields.push({ name: '', duration: 60 });
                        }}
                    >
                        Add Procedure
                    </button>
                </Flex>
            </li>
        </StyledUl>
        <Box pb={1} />
    </div>
);

export const durationOptions = [
    <option value={15} key={15}>
        15 minutes
    </option>,
    <option value={30} key={30}>
        30 minutes
    </option>,
    <option value={60} key={60}>
        60 minutes
    </option>,
    <option value={90} key={90}>
        90 minutes
    </option>
];

export const generateListItems = set => {
    if (!set || set.length === 0) {
        return (
            <ListItem>
                <ListItemText secondary="None Selected" />
            </ListItem>
        );
    }
    return set.map((item, index) => (
        <ListItem key={index}>
            <ListItemText primary={item} />
        </ListItem>
    ));
};

const getMinTime = (dateType, listing) => {
    if (!listing)
        return moment()
            .hours(0)
            .minutes(0);
    switch (dateType) {
    case 'startTime':
        return moment(listing.startTime);
    default:
        return moment()
            .hours(0)
            .minutes(0);
    }
};

const getMaxTime = (dateType, listing) => {
    if (!listing)
        return moment()
            .hours(23)
            .minutes(59);
    switch (dateType) {
    case 'startTime':
        return moment(listing.endTime).subtract(1, 'hours');
    default:
        return moment()
            .hours(23)
            .minutes(59);
    }
};

export const renderDatePicker = ({
    input,
    label,
    className,
    tooltip,
    dateType,
    listing,
    meta: { touched, error }
}) => (
    <div className={className}>
        <label>
            {label && `${label} `}
            {tooltip && addTooltip(tooltip)}
        </label>
        <DatePicker
            customInput={<Input />}
            selected={input.value}
            onChange={input.onChange.bind(this)}
            dateFormat="LLL"
            placeholderText={moment().format('LLL')}
            minDate={listing ? moment(listing.startTime) : moment()}
            maxDate={
                listing ? moment(listing.endTime) : moment().add(1, 'years')
            }
            minTime={getMinTime(dateType, listing)}
            maxTime={getMaxTime(dateType, listing)}
            showTimeSelect
            timeFormat="h:mma"
            timeIntervals={30}
            timeCaption="Time"
        />
        {touched && error && <span className="red-text">{error}</span>}
    </div>
);

export const renderField = ({
    input,
    className,
    tooltip,
    label,
    meta: { touched, error },
    ...custom
}) => {
    return (
        <Grid className={className} container direction="column">
            <label>
                {label && `${label} `}
                {tooltip && addTooltip(tooltip)}
            </label>
            <Input {...input} {...custom} />
            {touched && error && <span className="red-text">{error}</span>}
        </Grid>
    );
};

export const renderMaskedField = props => {
    const {
        input,
        className,
        label,
        tooltip,
        meta: { touched, error },
        ...custom
    } = props;

    return (
        <Grid className={className} container direction="column">
            <label>
                {label && `${label} `}
                {tooltip && addTooltip(tooltip)}
            </label>
            <MaskedInput {...input} {...custom} />
            {touched && error && <span className="red-text">{error}</span>}
        </Grid>
    );
};

export const renderOptions = (maxAvail, minAvail = 1, label = '') => {
    const options = [];
    for (let i = minAvail; i <= maxAvail; i++) {
        options.push(
            <Option value={Number(i)} key={i}>
                {`${i} ${label}`}
            </Option>
        );
    }
    return options;
};

export const renderOfficeOptions = offices => {
    if (offices.length) {
        return offices.map((office, index) => (
            <Option
                value={JSON.stringify({
                    id: office.id,
                    office_name: office.name,
                    chairs: office.numChairs
                })}
                key={index}
            >
                {office.name} - {office.location}
            </Option>
        ));
    }
    return null;
};

export const renderSelect = props => {
    const {
        input,
        label,
        disabled,
        tooltip,
        meta: { touched, error },
        children
    } = props;

    return (
        <Grid container>
            <label>
                {label && `${label} `}
                {tooltip && addTooltip(tooltip)}
            </label>
            <Select {...input} disabled={disabled}>
                {children}
            </Select>
            {touched && (error && <span className="red-text">{error}</span>)}
        </Grid>
    );
};

export const renderInput = ({ input, disabled }) => (
    <Grid container>
        <Input {...input} disabled={disabled} />
    </Grid>
);

export const renderCheckbox = ({
    label,
    tooltip,
    input: { onChange, value },
    meta: { touched, error }
}) => {
    return (
        <div>
            <Flex alignItems="center">
                <Checkbox
                    checked={value ? true : false}
                    onClick={() => {
                        onChange(value ? false : true);
                    }}
                />
                <Typography pl={2}>
                    {label} {tooltip && addTooltip(tooltip, '16px')}
                </Typography>
            </Flex>
            {touched && (error && <Typography color="red">{error}</Typography>)}
        </div>
    );
};

export const charCount = (numChar, total) => {
    const StyledCharCountBox = styled(Box)`
        float: right;
        && {
            margin: 0;
        }
    `;

    return (
        <StyledCharCountBox color="lightGrey" fontSize={1}>
            {numChar} / {total}
        </StyledCharCountBox>
    );
};
