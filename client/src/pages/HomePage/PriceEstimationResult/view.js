import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Text } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import ResultCard from './ResultCard';
import { renderPriceWithoutZeros } from '../../../util/paymentUtil';

const Slider = styled(SlickSlider)`
    /* .slick-slide .white-box {
        transition: all 0.3s ease-in-out;
    } */

    .slick-slide.slick-active {
        .inactive-box-text {
            display: none;
        }

        .title-tag {
            display: block;
        }
    }

    .slick-slide:not(.slick-active) {
        .inactive-box-text {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            right: 0;
            z-index: 1;
            font-size: 11px;
            display: block;
        }

        .title-tag {
            display: none;
        }

        .white-box {
            transform: scale(0.9);
            height: 310px;
            overflow: hidden;

            > * {
                opacity: 0;
            }
        }
    }

    .slick-dots {
        position: static;
        margin-top: 16px;
    }

    .slick-dots li {
        height: 9px;
        width: 9px;
        margin: 0 4px;
        vertical-align: middle;
    }

    .slick-dots li button {
        width: 9px;
        height: 9px;
        padding: 0;
        margin: 0;
    }

    .slick-dots li button:before {
        position: relative;
        width: 9px;
        height: 9px;
        line-height: 9px;
        opacity: 0.5;
        color: ${props => props.theme.colors.text.white};
        font-size: 7px;
        vertical-align: middle;
    }

    .slick-dots li.slick-active button:before {
        opacity: 1;
        font-size: 9px;
        color: ${props => props.theme.colors.text.white};
    }
`;

const PriceEstimationResultView = ({ bundleGroupCoverageData, formValues }) => (
    <Box position="relative" zIndex={100} width="100%">
        {bundleGroupCoverageData.length && (
            <Box>
                <Text
                    color="text.white"
                    fontSize={[3, '', '24px']}
                    fontWeight="bold"
                    mt={50}
                    mb={[30, '', 45]}
                    px={25}
                    textAlign="center"
                >
                    Nice! Here is a breakdown of how much you’ll be saving.
                </Text>

                <Slider
                    centerMode
                    dots
                    focusOnSelect
                    variableWidth
                    infinite={false}
                    centerPadding={0}
                >
                    {bundleGroupCoverageData.map(
                        ({
                            id,
                            name,
                            group,
                            price,
                            proceduresDetail,
                            coverage,
                            deductibleRemaining,
                            annualMaximumRemaining,
                            outOfPocket,
                        }) => (
                            <ResultCard
                                key={id}
                                name={name}
                                group={group}
                                price={renderPriceWithoutZeros(price)}
                                proceduresDetail={proceduresDetail}
                                coverage={renderPriceWithoutZeros(coverage)}
                                deductibleRemaining={renderPriceWithoutZeros(
                                    deductibleRemaining
                                )}
                                annualMaximumRemaining={renderPriceWithoutZeros(
                                    annualMaximumRemaining
                                )}
                                outOfPocket={renderPriceWithoutZeros(
                                    outOfPocket
                                )}
                            />
                        )
                    )}
                </Slider>

                <Text color="text.white" mt={24} mb={4} textAlign="center">
                    {`Estimated for `}
                    {formValues.isPrimaryHolder
                        ? `${formValues.firstName} ${formValues.lastName}`
                        : `${formValues.holderFirstName} ${
                              formValues.holderLastName
                          }`}
                    {` (ID: ${formValues.memberId})`}
                </Text>
                {/* <Text color="text.white" textAlign="center" opacity={0.5}>
                    Last updated on : 12/31/2019
                </Text> */}
            </Box>
        )}
    </Box>
);

PriceEstimationResultView.propTypes = {
    bundleGroupCoverageData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    formValues: PropTypes.shape({}).isRequired,
};

export default withScreenSizes(PriceEstimationResultView);
