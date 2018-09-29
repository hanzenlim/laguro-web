import React, { Component } from 'react';
import styled from 'styled-components';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import {
    Box,
    Button,
    Flex,
    Form,
    Grid,
    Icon,
    Input,
    TextArea,
    Select,
    Text,
} from '../../../components';
import { renderPrice } from '../../../util/paymentUtil';
// import { addTooltip } from './sharedComponents';
const { FormItem } = Form;
const { Option } = Select;
const { GridItem } = Grid;

const StyledForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 0px;
    }
`;

const NUM_INITIAL_EQUIPMENT = 1;
const EQUIPMENT = 'equipment';
const EQUIPMENT_NAME = `${EQUIPMENT}Name`;
const EQUIPMENT_PRICE = `${EQUIPMENT}Price`;
const EQUIPMENT_LIST = [
    'Digital Xray sensors',
    'Panoramic',
    'Lateral Ceph',
    'CBCT',
    'Intraoral Camera',
    'Caries Detection Cameras',
    'Cerec CAD/CAM',
    'Digital Scanner',
    'Endodontic Microscope',
    'Endo Rotary Instruments',
    'Periodontic Scalers',
    'Cavitron/Piezo Unit and Tips',
    'Hard Tissue Laser',
    'Soft Tissue Laser',
    'Implant System',
    'Nitrous Oxide',
];

class AddOfficeEquipments extends Component {
    constructor(props) {
        super(props);

        const defaultEquipmentList = Array.from(EQUIPMENT_LIST)
            .splice(0, NUM_INITIAL_EQUIPMENT)
            .map((eq, index) => {
                const key = `${EQUIPMENT_NAME}${index}`;
                const price = `${EQUIPMENT_PRICE}${index}`;
                return {
                    [key]: eq,
                    [price]: '$0.00',
                };
            })
            .reduce((a, b) => ({ ...a, ...b }), {});

        const urlEquipment = pick(
            props,
            Object.keys(props).filter(key => key.startsWith(EQUIPMENT))
        );

        this.state = {
            defaultEquipmentList,
            equipment: !isEmpty(urlEquipment)
                ? urlEquipment
                : defaultEquipmentList,
        };
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
    }

    addEquipment = () => {
        const { equipment } = this.state;
        let newIndex;

        if (!isEmpty(equipment)) {
            const lastEquipmentIndex = Object.keys(equipment)
                .slice(-1)
                .pop()
                .slice(EQUIPMENT_PRICE.length);

            newIndex = Number(lastEquipmentIndex) + 1;
        } else {
            newIndex = 0;
        }

        const key1 = `${EQUIPMENT_NAME}${newIndex}`;
        const key2 = `${EQUIPMENT_PRICE}${newIndex}`;

        const newEquipment = {
            ...equipment,
            [key1]: EQUIPMENT_LIST[0],
            [key2]: 0,
        };

        this.setState({
            equipment: newEquipment,
        });
    };

    removeEquipment = e => {
        const { index } = e.target.dataset;
        const { form } = this.props;
        const { equipment } = this.state;

        this.setState({
            equipment: pick(
                equipment,
                Object.keys(equipment).filter(eq => !eq.endsWith(index))
            ),
        });

        const key = `${EQUIPMENT_PRICE}${index}`;
        form.setFieldsValue({ [key]: undefined });
    };

    renderEquipment = equipment => {
        const eqNameKeys = Object.keys(equipment).filter(eq =>
            eq.startsWith(EQUIPMENT_PRICE)
        );

        return eqNameKeys.map(key => [
            <FormItem
                name={`${EQUIPMENT_NAME}${key.slice(EQUIPMENT_PRICE.length)}`}
                rules={[
                    {
                        required: true,
                        message: 'Please select equipment',
                    },
                ]}
                initialValue={
                    equipment[
                        `${EQUIPMENT_NAME}${key.slice(EQUIPMENT_PRICE.length)}`
                    ]
                }
                input={
                    <Select height={50}>
                        {EQUIPMENT_LIST.map((eq2, index2) => (
                            <Option key={index2} value={eq2}>
                                {eq2}
                            </Option>
                        ))}
                    </Select>
                }
            />,
            <FormItem
                name={key}
                rules={[
                    {
                        required: true,
                        message: 'Please provide equipment price',
                    },
                ]}
                getValueFromEvent={e => {
                    if (!e || !e.target) {
                        return e;
                    }
                    const { target } = e;
                    return target.type === 'checkbox'
                        ? target.checked
                        : renderPrice(target.value);
                }}
                initialValue={renderPrice(equipment[key])}
                input={<Input textAlign="right" height="50px" />}
            />,
            <Button
                type="ghost"
                height={50}
                data-index={key.slice(EQUIPMENT_NAME.length)}
                onClick={this.removeEquipment}
            >
                <Icon
                    lineHeight="50px"
                    fontSize={3}
                    color="text.gray"
                    type="close-circle"
                />
            </Button>,
        ]);
    };

    render() {
        const { form, officeDescription, header } = this.props;
        const { equipment } = this.state;

        return (
            <Box maxWidth="620px">
                <StyledForm
                    form={form}
                    officeDescription={officeDescription}
                    onSuccess={this.onSubmit}
                    {...equipment}
                >
                    <Grid
                        gcg="8px"
                        gtc="430px 128px auto"
                        justifyItems="center"
                    >
                        <GridItem gc="all">
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
                        </GridItem>

                        <GridItem gc="all">
                            <Text
                                fontWeight="bold"
                                fontSize={5}
                                lineHeight="1"
                                letterSpacing="-0.6px"
                                color="text.trueBlack"
                                mb={54}
                            >
                                {header}
                            </Text>
                        </GridItem>
                        <GridItem gc="all">
                            <Text
                                fontWeight="bold"
                                fontSize={4}
                                lineHeight="1"
                                letterSpacing="0px"
                                color="text.blue"
                                mb={20}
                            >
                                Summary (up to 300 characters)
                            </Text>
                        </GridItem>
                        <GridItem gc="all">
                            <FormItem
                                name="officeDescription"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please describe your office',
                                    },
                                ]}
                                input={
                                    <TextArea
                                        height="180px"
                                        py={16}
                                        px={18}
                                        placeholder="Bell Dental Center is a premier Bay Area dental office…"
                                    />
                                }
                            />
                        </GridItem>
                        <GridItem gc="all">
                            <Text
                                fontWeight="bold"
                                fontSize={4}
                                lineHeight="1"
                                letterSpacing="0px"
                                color="text.blue"
                                mb={20}
                            >
                                Equipment &amp; Usage Fees
                            </Text>
                        </GridItem>

                        {this.renderEquipment(equipment)}

                        <Button type="ghost" width={115} height={18}>
                            <Flex onClick={this.addEquipment}>
                                <Icon
                                    mr={16}
                                    type="plus"
                                    fontSize="14px"
                                    color="icon.black"
                                />
                                <Text
                                    color="text.black"
                                    fontSize={3}
                                    letterSpacing="-0.5px"
                                >
                                    Add more
                                </Text>
                            </Flex>
                        </Button>
                    </Grid>
                </StyledForm>
            </Box>
        );
    }
}

export default AddOfficeEquipments;
