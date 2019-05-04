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
    TextArea,
    Select,
    Text,
} from '../../../../components';

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

class AddOfficeEquipments extends Component {
    constructor(props) {
        super(props);

        const { equipment } = this.props;

        this.state = {
            equipment: isEmpty(equipment)
                ? []
                : equipment.reduce(
                      (acc, { name }, i) => ({
                          ...acc,
                          [`${EQUIPMENT_NAME}${i}`]: name,
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
                .slice(EQUIPMENT_NAME.length);

            newIndex = Number(lastEquipmentIndex) + 1;
        } else {
            newIndex = 0;
        }

        const key1 = `${EQUIPMENT_NAME}${newIndex}`;

        const newEquipment = {
            ...equipment,
            [key1]: undefined,
        };

        this.setState({
            equipment: newEquipment,
        });
    };

    removeEquipment = e => {
        const { index } = e.target.dataset;
        const { equipment } = this.state;

        this.setState({
            equipment: pick(
                equipment,
                Object.keys(equipment).filter(eq => !eq.endsWith(index))
            ),
        });

        const key = `${EQUIPMENT_NAME}${index}`;
        this.props.form.setFieldsValue({ [key]: undefined });
    };

    componentDidUpdate(prevProps) {
        const { officeDescription, equipment } = this.props;

        if (prevProps.officeDescription !== officeDescription) {
            this.props.form.setFieldsValue({
                officeDescription,
            });

            this.setState({
                equipment: equipment.reduce(
                    (acc, { name }, i) => ({
                        ...acc,
                        [`${EQUIPMENT_NAME}${i}`]: name,
                    }),
                    {}
                ),
            });
        }
    }

    renderEquipment = (equipment, form) => {
        const eqNameKeys = Object.keys(equipment).filter(eq =>
            eq.startsWith(EQUIPMENT_NAME)
        );

        const selectNameKeys = Object.keys(equipment).filter(eq =>
            eq.startsWith(EQUIPMENT_NAME)
        );

        const selectedEquipment = selectNameKeys.map(key =>
            form.getFieldValue(key)
        );

        const equipmentList = EQUIPMENT_LIST.filter(
            el => !selectedEquipment.includes(el)
        );

        return eqNameKeys.map(key => {
            const formItemName = `${EQUIPMENT_NAME}${key.slice(
                EQUIPMENT_NAME.length
            )}`;
            return (
                <Flex flexDirection={['column', '', 'row']}>
                    <Box mr={[0, '', 23]} width={['auto', '', '100%']}>
                        <FormItem
                            name={formItemName}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select equipment',
                                },
                            ]}
                            initialValue={equipment[formItemName]}
                            input={
                                <Select
                                    height={50}
                                    onSelect={this.handleEquipmentChange}
                                    placeholder="Select an equipment"
                                >
                                    {equipmentList.map((eq2, index2) => (
                                        <Option key={index2} value={eq2}>
                                            {eq2}
                                        </Option>
                                    ))}
                                </Select>
                            }
                        />
                    </Box>

                    <Flex>
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
            );
        });
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
                    <Grid gridTemplateColumns={'100%'}>
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
                                    Equipment offered in this office
                                </Text>
                            </Flex>
                        </GridItem>

                        <Flex flexDirection="column">
                            {this.renderEquipment(equipment, form)}

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
