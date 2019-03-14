import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    Box,
    Text,
    Image,
    Flex,
    Radio,
    Responsive,
} from '../../../../../components';
import visa from '../../../../../components/Image/visa.svg';
import DeleteCardPaymentModal from '../../../Modals/DeleteCardPaymentModal';
import mastercard from '../../../../../components/Image/mastercard.svg';
import defaultPaymentcard from '../../../../../components/Image/defaultCardPayment.svg';
import { NEW_CARD_PAYMENT_METHOD } from '../../../../../util/strings';

const StyledDeleteButton = styled(Text)`
    && {
        position: absolute;
        right: 92px;
        margin-top: 10px;
    }
`;

const { Mobile, withScreenSizes } = Responsive;
const RadioGroup = Radio.Group;
const cardLogoMapping = {
    MasterCard: () => mastercard,
    Visa: () => visa,
    Default: () => defaultPaymentcard,
};
const getCardLogo = brand => {
    let source = cardLogoMapping[brand];

    if (!source) {
        source = cardLogoMapping.Default;
    }

    return (
        <Image
            display="inline-block"
            mt={-4}
            mr={9}
            width="22px"
            height="14px"
            src={source()}
            alt={brand}
        />
    );
};

class ExistingCardFormView extends PureComponent {
    state = {
        showDeletePaymentModal: false,
        selectedCardToBeDeleted: '',
    };

    toggleDeletePaymentModal = cardId => {
        this.setState({
            showDeletePaymentModal: !this.state.showDeletePaymentModal,
            selectedCardToBeDeleted: cardId,
        });
    };

    render() {
        const {
            selectedCard,
            onChangeCardMethod,
            paymentOptionsCards,
        } = this.props;

        return (
            <RadioGroup
                onChange={onChangeCardMethod}
                defaultValue={selectedCard}
            >
                {paymentOptionsCards.map(card => (
                    <Flex mt="5px" flexDirection="row" flex="1" key={card.id}>
                        <Radio value={card.id}>
                            <Flex
                                display="inline-flex"
                                justifyContent="space-between"
                                height={40}
                                pl={8}
                                borderRadius={4}
                                border="1px solid"
                                borderColor="divider.gray"
                                width="100%"
                                fontSize={2}
                            >
                                <Mobile>
                                    {isMobile => {
                                        if (isMobile) {
                                            return (
                                                <Box my={4} ml={8}>
                                                    ••• {card.last4}
                                                </Box>
                                            );
                                        }

                                        return (
                                            <Box my={4} ml={8}>
                                                •••••••••••• {card.last4}
                                            </Box>
                                        );
                                    }}
                                </Mobile>
                                <Box my={4} ml={10}>
                                    <Text display={'inline-block'} mr={14}>
                                        {card.exp_month}/{card.exp_year % 100}
                                    </Text>
                                    {getCardLogo(card.brand)}
                                </Box>
                            </Flex>
                        </Radio>
                        <StyledDeleteButton
                            onClick={() => {
                                this.toggleDeletePaymentModal(card.id);
                            }}
                            fontSize={1}
                            mr={8}
                            cursor="pointer"
                            display="inline-block"
                        >
                            delete
                        </StyledDeleteButton>
                    </Flex>
                ))}
                {this.state.showDeletePaymentModal && (
                    <DeleteCardPaymentModal
                        paymentToken={this.state.selectedCardToBeDeleted}
                        toggleModalState={this.toggleDeletePaymentModal}
                    />
                )}

                <Radio
                    value={NEW_CARD_PAYMENT_METHOD}
                    onClick={onChangeCardMethod} // when clicking on add a new card, call the onChange in order to display new card form for payment methods
                    className="existing-card-form-add-a-new-card-radio"
                >
                    <Text
                        is="span"
                        fontSize={2}
                        className="existing-card-form-add-a-new-card-text"
                    >
                        Add a new card
                    </Text>
                </Radio>
            </RadioGroup>
        );
    }
}

export default withScreenSizes(ExistingCardFormView);
