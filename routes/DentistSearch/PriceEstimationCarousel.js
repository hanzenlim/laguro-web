import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import SlickSlider from 'react-slick';
import styled from 'styled-components';
import _get from 'lodash/get';
import _keyBy from 'lodash/keyBy';
import { useRouter } from 'next/router';

import { Container, Box, Icon, Text } from '~/components';
import CarouselCard from './CarouselCard';
import { GET_ANON_BUNDLE_GROUP_COVERAGE } from './queries';
import { renderPriceWithoutZeros } from '~/util/paymentUtil';
import { allInsuranceList } from '~/data';
import { selection as bundleGroups } from '../HomePage/PriceEstimationQuiz/BundleGroupSelection';
import { DentistSearchFilterContext } from '../../pages/dentist-search';

// Slider Custom Styles
const Slider = styled(SlickSlider)`
    .slick-track {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: stretch;

        .slick-slide {
            float: none;
            height: auto;

            & > * {
                height: 100%;
            }
        }
    }

    .slick-arrow {
        width: 44px;
        height: 44px;
        background-color: ${({ theme }) => theme.colors.background.white};
        box-shadow: -1px -1px 4px 0 rgba(0, 0, 0, 0.06),
            1px 1px 12px 0 rgba(0, 0, 0, 0.06);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        transition: all 0.3s ease-in-out;

        &.slick-disabled {
            visibility: hidden;
        }

        &:hover {
            background-color: ${({ theme }) =>
                theme.colors.background.whiteDarkSmoke};
        }

        &:before {
            display: none;
        }
    }
`;

const NextArrow = ({ onClick, className }) => (
    <Box onClick={onClick} className={className}>
        <Icon type="right" color="text.blue" fontSize={4} />
    </Box>
);

const PrevArrow = ({ onClick, className }) => (
    <Box onClick={onClick} className={className}>
        <Icon type="left" color="text.blue" fontSize={4} />
    </Box>
);

// Normalized Static Values
const normalizedInsuranceList = _keyBy(allInsuranceList, 'id');
const normalizedBundleGroups = _keyBy(bundleGroups, 'value');

// Main Component
const PriceEstimationCarousel = () => {
    const { urlParams } = useContext(DentistSearchFilterContext);

    const bundleGroup = _get(urlParams, 'bundleGroup', '');
    const age = _get(urlParams, 'age', '');
    const insuranceProvider = _get(urlParams, 'insuranceProvider', '');

    const hasFinishedSurvey = !!_get(urlParams, 'hasFinishedSurvey', false);

    const shouldRenderCarousel =
        hasFinishedSurvey &&
        insuranceProvider &&
        insuranceProvider !== 'All insurances' &&
        bundleGroup &&
        bundleGroup !== 'All procedures';

    if (!shouldRenderCarousel) return null;

    return (
        <Query
            query={GET_ANON_BUNDLE_GROUP_COVERAGE}
            variables={{
                input: {
                    bundleGroup,
                    anonPatient: {
                        age: Number(age),
                    },
                    anonPatientInsurance: {
                        insuranceProvider,
                        insuranceProviderId: insuranceProvider,
                    },
                },
            }}
            context={{ clientName: 'pricing' }}
            fetchPolicy="cache-and-network"
        >
            {({ loading, data }) => {
                const insuranceProviderId = insuranceProvider;
                const bundleGroupId = bundleGroup;

                const insuranceName = insuranceProviderId ? (
                    <Text
                        is="span"
                        fontSize={[1, '', 4]}
                        fontWeight="bold"
                        color="text.blue"
                    >
                        {_get(
                            normalizedInsuranceList,
                            `${insuranceProviderId}.name`,
                            ''
                        )}
                    </Text>
                ) : null;

                const bundleGroupName = (
                    <Text
                        is="span"
                        fontSize={[1, '', 4]}
                        fontWeight="bold"
                        color="text.blue"
                    >
                        {_get(
                            normalizedBundleGroups,
                            `${bundleGroupId}.title`,
                            ''
                        )}
                    </Text>
                );

                if (loading) {
                    return (
                        <Container>
                            <Text
                                fontSize={[1, '', 4]}
                                fontWeight="bold"
                                color="#626770"
                                mb={[16, '', 24]}
                                textAlign="center"
                            >
                                {`Calculating price estimation for `}
                                {bundleGroupName}
                                {` with `}
                                {insuranceName}
                                {` ...`}
                            </Text>
                        </Container>
                    );
                }

                const bundleGroupCoverageData = _get(
                    data,
                    'getAnonBundleGroupCoverage',
                    []
                );

                return (
                    <Container>
                        <Text
                            fontSize={[1, '', 4]}
                            fontWeight="bold"
                            color="#626770"
                            mb={[16, '', 24]}
                            textAlign="center"
                        >
                            {`Insurance coverage estimation for `}
                            {bundleGroupName}
                            {` with `}
                            {insuranceName}
                            {!bundleGroupCoverageData.length &&
                                ` is not yet available.`}
                        </Text>

                        {bundleGroupCoverageData.length ? (
                            <Slider
                                slidesToShow={3}
                                slidesToScroll={3}
                                infinite={false}
                                responsive={[
                                    {
                                        breakpoint: 1025,
                                        settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 2,
                                        },
                                    },
                                    {
                                        breakpoint: 767,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                            adaptiveHeight: true,
                                        },
                                    },
                                ]}
                                nextArrow={<NextArrow />}
                                prevArrow={<PrevArrow />}
                            >
                                {bundleGroupCoverageData.map(
                                    ({
                                        id,
                                        name,
                                        group,
                                        price,
                                        proceduresDetail,
                                        coverage,
                                        outOfPocket,
                                    }) => (
                                        <CarouselCard
                                            key={id}
                                            name={name}
                                            group={group}
                                            price={renderPriceWithoutZeros(
                                                price
                                            )}
                                            proceduresDetail={proceduresDetail}
                                            coverage={renderPriceWithoutZeros(
                                                coverage
                                            )}
                                            outOfPocket={renderPriceWithoutZeros(
                                                outOfPocket
                                            )}
                                        />
                                    )
                                )}
                            </Slider>
                        ) : null}
                    </Container>
                );
            }}
        </Query>
    );
};

PriceEstimationCarousel.propTypes = {};

export default PriceEstimationCarousel;
