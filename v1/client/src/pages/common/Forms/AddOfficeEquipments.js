import React, { Component } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import history from '../../../history';
import {
    Box,
    Flex,
    Form,
    Icon,
    Input,
    TextArea,
    Select,
    Text,
} from '../../../components';
// import { addTooltip } from './sharedComponents';
const { FormItem, SubmitButton, BackButton } = Form;
const { Option } = Select;

const StyledContainer = styled(Box)`
    form {
        display: grid;
        grid-column-gap: 8px;
        grid-template-columns: 430px 128px auto;
        grid-template-rows: auto;
        grid-row-gap: 20px;
        justify-items: 'center';

        > :nth-child(-n + 5) {
            grid-column: 1 / 4;
        }
    }
`;

const StyledForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 0px;
    }
`;

class AddOfficeInfo extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);

        this.equipment = this.urlParams.equipment;

        this.equipment = this.equipment
            ? JSON.parse(this.equipment)
            : [
                  { name: 'Digital X-Ray', price: 2000 },
                  { name: 'CBCT', price: 2000 },
                  { name: 'Pano', price: 2000 },
              ];

        this.state = { fields: this.equipment };
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
    }

    onSubmit = values => {
        const params = queryString.stringify({
            ...this.urlParams,
            ...values,
            imageUrls: JSON.stringify(this.state.imageUrls),
        });

        history.push(`/host-onboarding/add-equipments?${params}`);
    };

    handleBack = values => {
        const params = queryString.stringify({
            ...this.urlParams,
            description: values.description,
            equipment: values.equipment ? JSON.stringify(values.equipment) : [],
        });

        history.push(`/host-onboarding/add-office?${params}`);
    };

    addEquipment = () => {
        this.setState({
            fields: this.state.fields.concat([{ name: '', price: '$20.00' }]),
        });
    };

    removeEquipment = e => {
        const { index } = e.target.dataset;
        const { fields } = this.state;

        this.setState({
            fields: fields.filter(
                (item, currIndex) => currIndex !== parseInt(index, 10)
            ),
        });
    };

    render() {
        const { fields } = this.state;

        return (
            <Box maxWidth="620px">
                <StyledContainer>
                    <StyledForm onSuccess={this.onSubmit}>
                        <Text
                            fontWeight="bold"
                            fontSize={5}
                            lineHeight="1"
                            letterSpacing="-0.6px"
                            color="text.gray"
                            mt={140}
                            mb={18}
                        >
                            Step 2
                        </Text>

                        <Text
                            fontWeight="bold"
                            fontSize={5}
                            lineHeight="1"
                            letterSpacing="-0.6px"
                            color="text.trueBlack"
                            mb={54}
                        >
                            tell us more about your office.
                        </Text>

                        <Text
                            fontWeight="bold"
                            fontSize={4}
                            lineHeight="1"
                            letterSpacing="0px"
                            color="text.green"
                            mb={20}
                        >
                            Summary
                        </Text>

                        <FormItem
                            name="name"
                            label="Office name"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input the name of your office',
                                },
                            ]}
                            input={
                                <TextArea
                                    height="180px"
                                    py={16}
                                    px={18}
                                    placeholder="describe your office"
                                />
                            }
                        />

                        <Text
                            fontWeight="bold"
                            fontSize={4}
                            lineHeight="1"
                            letterSpacing="0px"
                            color="text.green"
                            mb={20}
                        >
                            Equipment & Usage Fees
                        </Text>

                        {fields.map((equipment, index) => [
                            <FormItem
                                name={`equipment${index}`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'please select equipment',
                                    },
                                ]}
                                initialValue={'scanner'}
                                input={
                                    <Select height={50}>
                                        <Option value="xray">X-Ray</Option>
                                        <Option value="scanner">Scanner</Option>
                                        <Option value="cbtc">CBTC</Option>
                                    </Select>
                                }
                            />,
                            <FormItem
                                name={`equipmentPrice${index}`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'please select equipment',
                                    },
                                ]}
                                initialValue={'$20.00'}
                                input={
                                    <Input
                                        textAlign="right"
                                        height="50px"
                                        placeHolder="$20.00"
                                    />
                                }
                            />,
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                            >
                                <Icon
                                    fontSize="18px"
                                    data-index={index}
                                    color="icon.white"
                                    type="close-circle"
                                    onClick={this.removeEquipment}
                                    cursor="pointer"
                                />
                            </Flex>,
                        ])}

                        <Flex onClick={this.addEquipment} cursor="pointer">
                            <Icon
                                lineHeight="21px"
                                mr={16}
                                type="plus"
                                fontSize="14px"
                                color="icon.black"
                            />
                            <Box>Add more</Box>
                        </Flex>

                        <BackButton
                            ghost
                            position="absolute"
                            width={188}
                            height={60}
                            top={230}
                            right={650}
                            buttonText="Previous"
                        />

                        <SubmitButton
                            position="absolute"
                            width={188}
                            height={60}
                            top={230}
                            left={180}
                            buttonText="Next"
                        />

                        <Box height={300} />
                    </StyledForm>
                </StyledContainer>
            </Box>
        );
    }
}

export default AddOfficeInfo;
