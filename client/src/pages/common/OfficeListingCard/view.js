import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import _truncate from 'lodash/truncate';
import _get from 'lodash/get';
import {
    Box,
    Button,
    Card,
    Flex,
    Rating,
    Text,
} from '@laguro/basic-components';
import { FilestackImage } from '../../../components';
import { getIdFromFilestackUrl } from '../../../util/imageUtil';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const StyledCard = styled(Card)`
    && {
        .ant-card-body {
            padding: 0;
        }
    }

    && {
        height: ${({ showMap }) => (showMap ? '378px' : 'auto')};

        @media screen and (max-width: 1024px) {
            height: 378px;
        }
    }
`;

const ESTIMATED_IMAGE_WIDTH = 251;

class OfficeListingCard extends Component {
    state = {
        workingWidth: null,
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateWorkingWidth);

        this.updateWorkingWidth();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWorkingWidth);
    }

    componentDidUpdate(prevProps) {
        if (this.props.showMap !== prevProps.showMap) {
            this.updateWorkingWidth();
        }
    }

    updateWorkingWidth = () => {
        if (_get(this.cardRef, 'buttonNode.offsetWidth')) {
            this.setState({
                workingWidth: this.cardRef.buttonNode.offsetWidth,
            });
        }
    };

    renderEquipments({ equip = [] }) {
        const lines = this.state.workingWidth > 600 ? 1 : 2;
        let workingWidth = this.state.workingWidth;
        let workingWidthSecondLine = this.state.workingWidth;
        const equipments = [];

        if (lines === 1) {
            workingWidth -= ESTIMATED_IMAGE_WIDTH;
            equip.forEach(item => {
                const tagLength = item.name.length * 6 + 62;
                if (workingWidth > tagLength) {
                    equipments.push(item);
                    workingWidth -= tagLength;
                }
            });

            if (workingWidth > 96 && equipments.length < equip.length) {
                equipments.push({ name: '...', price: 0 });
            }
        }

        if (lines === 2) {
            equip.forEach(item => {
                const tagLength = item.name.length * 5 + 60;
                if (workingWidth > tagLength) {
                    equipments.push(item);
                    workingWidth -= tagLength;
                } else if (workingWidthSecondLine > tagLength) {
                    equipments.push(item);
                    workingWidthSecondLine -= tagLength;
                }
            });

            if (
                workingWidthSecondLine > 92 &&
                equipments.length < equip.length
            ) {
                equipments.push({ name: '...', price: 0 });
            }
        }

        return (
            <Flex flexWrap="wrap" mb={6} mt={10}>
                {equipments.map((item, index) => (
                    <Box
                        bg={TAG_COLORS[index % 4]}
                        px={16}
                        borderRadius="19.5px"
                        mr="6px"
                        mb="6px"
                    >
                        <Text
                            color="text.white"
                            lineHeight="20px"
                            fontSize={
                                this.props.showMap
                                    ? '10px'
                                    : ['10px', '10px', '12px']
                            }
                        >
                            {item.name}
                        </Text>
                    </Box>
                ))}
            </Flex>
        );
    }

    renderDescription = ({ description = '' }) => {
        const formatted = description.replace(/[\n\r]+/g, ' ');

        return _truncate(formatted, {
            length: 330,
            separator: ' ',
        });
    };

    render() {
        const { office, onRedirect, showMap } = this.props;
        const { workingWidth } = this.state;

        return (
            <Button
                type="ghost"
                height="auto"
                width="100%"
                onClick={onRedirect}
                ref={node => (this.cardRef = node)}
            >
                <StyledCard showMap={showMap}>
                    <Box>
                        <Flex
                            flexDirection={
                                showMap ? 'column' : ['column', 'column', 'row']
                            }
                            m={0}
                            height={showMap ? '100%' : ['100%', '100%', 215]}
                        >
                            <Box
                                display="block"
                                width={showMap ? '100%' : ['100%', '100%', 317]}
                                height={showMap ? 215 : [215, 215, '100%']}
                                position="relative"
                                overflow="hidden"
                            >
                                <FilestackImage
                                    handle={getIdFromFilestackUrl(office.image)}
                                    alt={office.title}
                                    sizes={{
                                        fallback: '250px',
                                    }}
                                    formats={['webp', 'pjpg']}
                                />
                            </Box>
                            <Box width="100%" ml={[0, 10]} p={[10, 12]}>
                                <Flex>
                                    <Flex
                                        flexDirection="column"
                                        alignItems="flex-start"
                                    >
                                        <Flex
                                            mb={4}
                                            alignItems={
                                                showMap
                                                    ? 'flex-start'
                                                    : [
                                                          'flex-start',
                                                          'flex-start',
                                                          'center',
                                                      ]
                                            }
                                            flexDirection={
                                                showMap
                                                    ? 'column'
                                                    : [
                                                          'column',
                                                          'column',
                                                          'row',
                                                      ]
                                            }
                                        >
                                            <Text
                                                fontWeight="bold"
                                                fontSize={
                                                    showMap
                                                        ? '14px'
                                                        : [
                                                              '14px',
                                                              '14px',
                                                              '20px',
                                                          ]
                                                }
                                                mr={14}
                                                color="#303449"
                                            >
                                                {office.title}
                                            </Text>
                                        </Flex>
                                        <Flex
                                            alignItems="flex-end"
                                            lineHeight="15px"
                                        >
                                            <Rating
                                                disabled={true}
                                                fontSize={
                                                    showMap
                                                        ? '12px'
                                                        : [
                                                              '12px',
                                                              '12px',
                                                              '15px',
                                                          ]
                                                }
                                                value={office.rating}
                                            />
                                            <Text ml={6} fontSize="12px">
                                                {office.numReviews &&
                                                office.numReviews !== 0
                                                    ? `(${office.numReviews})`
                                                    : ''}
                                            </Text>
                                        </Flex>
                                        <Text
                                            mb={8}
                                            fontSize="12px"
                                            color="#9b9b9b"
                                            fontWeight="normal"
                                            wordBreak="break-all"
                                        >
                                            {_truncate(office.address, {
                                                length: 43,
                                                separator: ' ',
                                            })}
                                        </Text>
                                    </Flex>
                                </Flex>

                                {!_isEmpty(office.equipment) &&
                                    workingWidth &&
                                    this.renderEquipments({
                                        equip: office.equipment,
                                    })}

                                <Text
                                    style={{ 'white-space': 'pre-line' }}
                                    fontSize={
                                        showMap
                                            ? '10px'
                                            : ['10px', '10px', '14px']
                                    }
                                    textAlign="left"
                                    fontWeight="300"
                                    display={
                                        showMap
                                            ? 'none'
                                            : ['none', 'none', 'block']
                                    }
                                >
                                    {office.subtitle
                                        ? this.renderDescription({
                                              description: office.subtitle,
                                          })
                                        : 'No available description'}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </StyledCard>
            </Button>
        );
    }
}

OfficeListingCard.propTypes = {
    office: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        address: PropTypes.string,
        rating: PropTypes.number,
        numReviews: PropTypes.number,
        equipment: PropTypes.array,
        subtitle: PropTypes.string,
    }),
    onRedirect: PropTypes.func,
};

export default OfficeListingCard;
