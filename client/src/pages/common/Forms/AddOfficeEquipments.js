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
    Tooltip,
} from '../../../components';
import { renderPrice } from '../../../util/paymentUtil';

const { FormItem } = Form;
const { Option } = Select;
const { GridItem } = Grid;

const StyledForm = styled(Form)`
    .ant-form-item {
        margin-bottom: 0px;
    }
`;

const EQUIPMENT = 'equipment';
const EQUIPMENT_NAME = `${EQUIPMENT}Name`;
const EQUIPMENT_PRICE = `${EQUIPMENT}Price`;
const EQUIPMENT_LIST = [
    'Digital Xray Sensors',
    'Panoramic',
    'Lateral Ceph',
    'CBCT',
    'Intraoral Camera',
    'Caries Detection Cameras',
    'Cerec CAD/CAM',
    'Digital Scanner',
    'Endodontic Microscope',
    'Endo Rotary Instruments (Motor and New Files)',
    'Periodontic Scalers',
    'Cavitron/Piezo Unit and Tips',
    'Hard Tissue Laser',
    'Soft Tissue Laser',
    'Implant System',
    'Implant System 2',
    'Implant System 3',
    'Nitrous Oxide',
    'Composite set up',
    'Crown and bridge set up',
    'Removable set up',
    'Extraction set up',
];

const PRICE_MAP = {
    'Digital Xray Sensors': '$20.00',
    Panoramic: '$20.00',
    'Lateral Ceph': '$20.00',
    CBCT: '$100.00',
    'Intraoral Camera': '$20.00',
    'Caries Detection Cameras': '$20.00',
    'Cerec CAD/CAM': '$200.00',
    'Digital Scanner': '$75.00',
    'Endodontic Microscope': '$50.00',
    'Endo Rotary Instruments (Motor and New Files)': '$100.00',
    'Periodontic Scalers': '$10.00',
    'Cavitron/Piezo Unit and Tips': '$25.00',
    'Hard Tissue Laser': '$50.00',
    'Soft Tissue Laser': '$50.00',
    'Implant System': '$200.00',
    'Implant System 2': '$400.00',
    'Implant System 3': '$600.00',
    'Nitrous Oxide': '$50.00',
    'Composite set up': '$25.00',
    'Crown and bridge set up': '$25.00',
    'Removable set up': '$25.00',
    'Extraction set up': '$25.00',
};

class AddOfficeEquipments extends Component {
    constructor(props) {
        super(props);

        const { equipment } = this.props;

        this.state = {
            equipment: isEmpty(equipment)
                ? []
                : equipment.reduce(
                      (acc, { name, price }, i) => ({
                          ...acc,
                          [`${EQUIPMENT_NAME}${i}`]: name,
                          [`${EQUIPMENT_PRICE}${i}`]: price,
                      }),
                      {}
                  ),
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
            [key2]: PRICE_MAP[EQUIPMENT_LIST[0]],
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

    handleEquipmentChange = (value, options) => {
        const { form } = this.props;
        form.setFieldsValue({
            [options.props['data-price-key']]: PRICE_MAP[value],
        });
    };

    componentDidUpdate(prevProps) {
        const { officeDescription, equipment } = this.props;

        if (prevProps.officeDescription !== officeDescription) {
            this.props.form.setFieldsValue({
                officeDescription,
            });

            this.setState({
                equipment: equipment.reduce(
                    (acc, { name, price }, i) => ({
                        ...acc,
                        [`${EQUIPMENT_NAME}${i}`]: name,
                        [`${EQUIPMENT_PRICE}${i}`]: price,
                    }),
                    {}
                ),
            });
        }
    }

    renderEquipment = equipment => {
        const eqNameKeys = Object.keys(equipment).filter(eq =>
            eq.startsWith(EQUIPMENT_PRICE)
        );

        return eqNameKeys.map(key => (
            <Flex flexDirection={['column', '', 'row']}>
                <Box mr={[0, '', 23]} width={['auto', '', 431]}>
                    <FormItem
                        name={`${EQUIPMENT_NAME}${key.slice(
                            EQUIPMENT_PRICE.length
                        )}`}
                        rules={[
                            {
                                required: true,
                                message: 'Please select equipment',
                            },
                        ]}
                        initialValue={
                            equipment[
                                `${EQUIPMENT_NAME}${key.slice(
                                    EQUIPMENT_PRICE.length
                                )}`
                            ]
                        }
                        input={
                            <Select
                                height={50}
                                onSelect={this.handleEquipmentChange}
                            >
                                {EQUIPMENT_LIST.map((eq2, index2) => (
                                    <Option
                                        key={index2}
                                        data-price-key={key}
                                        value={eq2}
                                    >
                                        {eq2}
                                    </Option>
                                ))}
                            </Select>
                        }
                    />
                </Box>

                <Flex>
                    <Box
                        mr={[0, '', 17]}
                        width={['calc(100% - 48px)', '', '128px']}
                    >
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
                        />
                    </Box>
                    <Button
                        type="ghost"
                        width={[48, '', 'auto']}
                        mb={20}
                        height={[48, '', 'auto']}
                        data-index={key.slice(EQUIPMENT_NAME.length)}
                        onClick={this.removeEquipment}
                    >
                        <Icon
                            lineHeight="50px"
                            fontSize={[1, '', 3]}
                            color="text.gray"
                            type="close-circle"
                        />
                    </Button>
                </Flex>
            </Flex>
        ));
    };

    render() {
        const { form, officeDescription, header } = this.props;
        const { equipment } = this.state;

        return (
            <Box maxWidth="620px">
                <StyledForm
                    form={form}
                    onSuccess={this.onSubmit}
                    officeDescription={officeDescription}
                >
                    <Grid gridTemplateColumns={'100%'} justifyItems="center">
                        <GridItem gc="all">
                            <Text
                                fontWeight="bold"
                                fontSize={[2, '', 5]}
                                lineHeight={['1.88', '', '1']}
                                letterSpacing="-0.6px"
                                color="text.gray"
                                mt={['', '', 140]}
                                mb={[0, '', 18]}
                            >
                                Step 2
                            </Text>
                        </GridItem>

                        <GridItem gc="all">
                            <Text
                                fontWeight="bold"
                                fontSize={[2, '', 5]}
                                lineHeight="1"
                                letterSpacing="-0.6px"
                                color="text.trueBlack"
                                mb={[21, '', 54]}
                            >
                                {header}
                            </Text>
                        </GridItem>
                        <GridItem gc="all">
                            <Text
                                fontWeight="bold"
                                fontSize={[0, '', 4]}
                                lineHeight="1"
                                letterSpacing="0px"
                                color="text.blue"
                                mb={20}
                            >
                                Summary
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
                            <Flex alignItems="center" mb={20}>
                                <Text
                                    fontWeight="bold"
                                    fontSize={[0, '', 4]}
                                    lineHeight="1"
                                    letterSpacing="0px"
                                    color="text.blue"
                                >
                                    Equipment &amp; Usage Fees
                                </Text>
                                <Tooltip
                                    size={[18, '', 22]}
                                    text="The rates will vary at each dental office as the Host will set the prices for each equipment used."
                                />
                            </Flex>
                        </GridItem>

                        <Flex flexDirection="column">
                            {this.renderEquipment(equipment)}

                            <Button type="ghost" onClick={this.addEquipment}>
                                <Flex>
                                    <Icon
                                        mr={16}
                                        type="plus"
                                        fontSize="14px"
                                        color="icon.black"
                                    />
                                    <Text
                                        color="text.black"
                                        fontSize={[1, '', 3]}
                                        letterSpacing="-0.5px"
                                    >
                                        Add equipment
                                    </Text>
                                </Flex>
                            </Button>
                        </Flex>
                    </Grid>
                </StyledForm>
            </Box>
        );
    }
}

export default AddOfficeEquipments;
