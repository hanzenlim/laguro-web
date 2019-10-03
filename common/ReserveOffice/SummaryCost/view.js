import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import styled from 'styled-components';
import { Box, Flex, Text } from '~/components';

const { Panel } = Collapse;

const StyledPanel = styled(Panel)`
    &&.ant-collapse-item .ant-collapse-content .ant-collapse-content-box {
        padding-right: 0;
    }
`;

const StyledCollapse = styled(Collapse)`
    &&.ant-collapse > .ant-collapse-item > .ant-collapse-header .arrow {
        left: 0;
    }
`;

const generateHeaderText = (headerText, amount) => (
    <Flex justifyContent="space-between">
        <Text
            fontSize={[1, '', 2]}
            fontWeight={['medium', '', 'bold']}
            color="text.black"
        >
            {headerText}
        </Text>
        <Text
            fontSize={[1, '', 2]}
            fontWeight={['medium', '', 'bold']}
            color="text.black"
        >
            ${(amount / 100).toFixed(2)}
        </Text>
    </Flex>
);

const getSubSectionDetails = summaryDetails => {
    const details = summaryDetails.map(value => (
        <Box ml="30px" pr="0px">
            <Flex justifyContent="space-between">
                <Text fontSize={[0, '', 1]} color="text.darkGray" pr={16}>
                    {value.description}
                </Text>
                <Text fontSize={[0, '', 1]} color="text.darkGrays">
                    ${(value.cost / 100).toFixed(2)}
                </Text>
            </Flex>
        </Box>
    ));

    return details;
};

const generatePanelView = list => {
    const listElement = list.map((value, index) => (
        <StyledPanel
            header={generateHeaderText(value.headerText, value.headerCost)}
            disabled={!value.summaryDetails}
            key={index}
        >
            {value.summaryDetails && getSubSectionDetails(value.summaryDetails)}
        </StyledPanel>
    ));

    return listElement;
};

const SummaryCostView = ({ summaryData, totalPrice }) => (
    <Fragment>
        <StyledCollapse bordered={false}>
            {generatePanelView(summaryData)}
        </StyledCollapse>
        <Flex justifyContent="space-between" mt={16} ml={[0, '', 5]}>
            <Text fontSize={2} color="text.black" fontWeight="bold">
                Total
            </Text>
            <Text fontSize={2} color="text.black" fontWeight="bold">
                {`$${(totalPrice / 100).toFixed(2)}`}
            </Text>
        </Flex>
    </Fragment>
);

SummaryCostView.propTypes = {
    summaryData: PropTypes.object.isRequired,
    totalPrice: PropTypes.number.isRequired,
};

export default SummaryCostView;
