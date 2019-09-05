import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import SlickSlider from 'react-slick';
import styled from 'styled-components';
import _get from 'lodash/get';
import queryString from 'query-string';
import _keyBy from 'lodash/keyBy';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Loading, Container, Box, Icon, Text } from '../../components';
import CarouselCard from './CarouselCard';
import {
    GET_ANON_BUNDLE_GROUP_COVERAGE,
    GET_BUNDLE_GROUP_COVERAGE,
} from './queries';
import { pricingClient } from '../../util/apolloClients';
import { renderPriceWithoutZeros } from '../../util/paymentUtil';
import history from '../../history';
import { allInsuranceList } from '../../staticData';
import { selection as bundleGroups } from '../HomePage/PriceEstimationQuiz/BundleGroupSelection';
import { AuthContext } from '../../App';
import { getUser } from '../../util/authUtils';

// Slider Custom Styles
const Slider = styled(SlickSlider)`
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
    const { isAuth } = useContext(AuthContext);

    let queryProps = {};

    if (isAuth) {
        const { id: patientId } = getUser();
        const { bundleGroup } = queryString.parse(history.location.search);
        queryProps = {
            query: GET_BUNDLE_GROUP_COVERAGE,
            input: { patientId, bundleGroup },
        };
    } else {
        const { bundleGroup, age, insuranceProvider } = queryString.parse(
            history.location.search
        );

        queryProps = {
            query: GET_ANON_BUNDLE_GROUP_COVERAGE,
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
        };
    }

    return (
        <Query
            query={queryProps.query}
            variables={{
                input: queryProps.input,
            }}
            client={pricingClient}
            fetchPolicy="cache-and-network"
        >
            {({ loading, data }) => {
                if (loading) return <Loading />;

                const bundleGroupCoverageData = _get(
                    data,
                    isAuth
                        ? 'getBundleGroupCoverage'
                        : 'getAnonBundleGroupCoverage',
                    []
                );

                const {
                    insuranceProvider: insuranceProviderId,
                    bundleGroup: bundleGroupId,
                } = queryString.parse(history.location.search);

                const insuranceName = insuranceProviderId ? (
                    <Text
                        is="span"
                        fontSize={[1, '', 4]}
                        fontWeight="bold"
                        color="text.blue"
                    >
                        {normalizedInsuranceList[insuranceProviderId].name}
                    </Text>
                ) : null;

                const bundleGroupName = (
                    <Text
                        is="span"
                        fontSize={[1, '', 4]}
                        fontWeight="bold"
                        color="text.blue"
                    >
                        {normalizedBundleGroups[bundleGroupId].title}
                    </Text>
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
                            {!isAuth && ` with `}
                            {!isAuth && insuranceName}
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
                        ) : (
                            <Text textAlign="center">Not yet available.</Text>
                        )}
                    </Container>
                );
            }}
        </Query>
    );
};

PriceEstimationCarousel.propTypes = {};

export default PriceEstimationCarousel;
