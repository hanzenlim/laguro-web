import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Text, Flex, Button, Box } from '~/components';

const StyledContainer = styled(Box)`
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
`;

const SelectAppointmentView = props => {
    const { appointments, selected, onSelect } = props;
    return (
        <Fragment>
            {appointments.length ? (
                <StyledContainer mt={20}>
                    {appointments.map((item, i) => (
                        <Button
                            key={i}
                            data-key={i}
                            type="ghost"
                            onClick={onSelect}
                            height="auto"
                        >
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height={[46, '', 48]}
                                borderRadius="2px"
                                border="1px solid"
                                borderColor="divider.blue"
                                bg={
                                    selected.key === item.key
                                        ? 'background.blue'
                                        : 'background.white'
                                }
                            >
                                <Text
                                    fontSize={[1, '', 3]}
                                    letterSpacing="-0.4px"
                                    color={
                                        selected.key === item.key
                                            ? 'background.white'
                                            : 'background.blue'
                                    }
                                >
                                    {item.key}
                                </Text>
                            </Flex>
                        </Button>
                    ))}
                </StyledContainer>
            ) : null}
        </Fragment>
    );
};

SelectAppointmentView.propTypes = {
    appointments: PropTypes.array,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
};

SelectAppointmentView.defaultProps = {
    appointments: [],
    selected: null,
    onSelect: () => {},
};

export default SelectAppointmentView;
