import React from 'react';
import { Icon as AntdIcon } from 'antd';
import styled from 'styled-components';
import {
    color,
    display,
    space,
    width,
    height,
    fontSize,
    fontWeight,
    left,
    top,
    bottom,
    right,
    position,
    lineHeight,
} from 'styled-system';

import LocationPin from './LocationPin';
import LocationPinWithFill from './LocationPinWithFill';
import LocationPinForMap from './LocationPinForMap';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import Plus from './Plus';
import Minus from './Minus';
import RightForwardArrow from './RightForwardArrow';
import UpArrow from './UpArrow';
import DownArrow from './DownArrow';
import Calendar from './Calendar';
import MacaroniPattern from './MacaroniPattern';
import Tooltip from './Tooltip';
import Close from './Close';
import LeftSearch from './LeftSearch';
import DefaultLogo from './DefaultLogo';
import WhiteLogo from './WhiteLogo';
import DentistLogo from './DentistLogo';
import CloseCircle from './CloseCircle';
import CloseCircleHover from './CloseCircleHover';
import Revert from './Revert';
import Exclamation from './Exclamation';
import Languages from './Languages';
import Insurance from './Insurance';
import LinkedIn from './LinkedIn';
import Medium from './Medium';
import Facebook from './Facebook';
import Instagram from './Instagram';
import Alert from './Alert';
import Filter from './Filter';
import BlueLeftArrow from './BlueLeftArrow';
import BlueRightArrow from './BlueRightArrow';
import Umbrella from './Umbrella';
import MedicalDocument from './MedicalDocument';
import DentalRecords from './DentalRecords';
import Clock from './Clock';
import FirstVisit from './FirstVisit';
import GeneralProcedures from './GeneralProcedures';
import Surgery from './Surgery';
import SpecialTreatment from './SpecialTreatment';
import Morning from './Morning';
import Afternoon from './Afternoon';
import Evening from './Evening';
import Anytime from './Anytime';
import Calculate from './Calculate';
import Searching from './Searching';
import Withdraw from './Withdraw';
import AddCredit from './AddCredit';

const Icon = props => {
    const { type, isButton, ...rest } = props;

    let ReturnIcon;
    switch (type) {
        case 'defaultLogo':
            ReturnIcon = DefaultLogo;
            break;
        case 'whiteLogo':
            ReturnIcon = WhiteLogo;
            break;
        case 'dentistLogo':
            ReturnIcon = DentistLogo;
            break;
        case 'tooltip':
            ReturnIcon = Tooltip;
            break;
        case 'calendar':
            ReturnIcon = Calendar;
            break;
        case 'upArrow':
            ReturnIcon = UpArrow;
            break;
        case 'downArrow':
            ReturnIcon = DownArrow;
            break;
        case 'leftArrow':
            ReturnIcon = LeftArrow;
            break;
        case 'rightArrow':
            ReturnIcon = RightArrow;
            break;
        case 'locationPin':
            ReturnIcon = LocationPin;
            break;
        case 'locationPinWithFill':
            ReturnIcon = LocationPinWithFill;
            break;
        case 'locationPinForMap':
            ReturnIcon = LocationPinForMap;
            break;
        case 'coloredPlus':
            ReturnIcon = Plus;
            break;
        case 'minus':
            ReturnIcon = Minus;
            break;
        case 'rightForwardArrow':
            ReturnIcon = RightForwardArrow;
            break;
        case 'macaroniPattern':
            ReturnIcon = MacaroniPattern;
            break;
        case 'close':
            ReturnIcon = Close;
            break;
        case 'leftSearch':
            ReturnIcon = LeftSearch;
            break;
        case 'closeCircle':
            ReturnIcon = CloseCircle;
            break;
        case 'closeCircleHover':
            ReturnIcon = CloseCircleHover;
            break;
        case 'revert':
            ReturnIcon = Revert;
            break;
        case 'exclamation':
            ReturnIcon = Exclamation;
            break;
        case 'languages':
            ReturnIcon = Languages;
            break;
        case 'insurance':
            ReturnIcon = Insurance;
            break;
        case 'medium':
            ReturnIcon = Medium;
            break;
        case 'facebook':
            ReturnIcon = Facebook;
            break;
        case 'instagram':
            ReturnIcon = Instagram;
            break;
        case 'linkedin':
            ReturnIcon = LinkedIn;
            break;
        case 'alert':
            ReturnIcon = Alert;
            break;
        case 'filter':
            ReturnIcon = Filter;
            break;
        case 'blueLeftArrow':
            ReturnIcon = BlueLeftArrow;
            break;
        case 'blueRightArrow':
            ReturnIcon = BlueRightArrow;
            break;
        case 'dentalRecords':
            ReturnIcon = DentalRecords;
            break;
        case 'umbrella':
            ReturnIcon = Umbrella;
            break;
        case 'medicalDocument':
            ReturnIcon = MedicalDocument;
            break;
        case 'clock':
            ReturnIcon = Clock;
            break;
        case 'FirstVisit':
            ReturnIcon = FirstVisit;
            break;
        case 'GeneralProcedures':
            ReturnIcon = GeneralProcedures;
            break;
        case 'Surgery':
            ReturnIcon = Surgery;
            break;
        case 'SpecialTreatment':
            ReturnIcon = SpecialTreatment;
            break;
        case 'Morning':
            ReturnIcon = Morning;
            break;
        case 'Afternoon':
            ReturnIcon = Afternoon;
            break;
        case 'Evening':
            ReturnIcon = Evening;
            break;
        case 'Anytime':
            ReturnIcon = Anytime;
            break;
        case 'Searching':
            ReturnIcon = Searching;
            break;
        case 'Calculate':
            ReturnIcon = Calculate;
            break;
        case 'Withdraw':
            ReturnIcon = Withdraw;
            break;
        case 'AddCredit':
            ReturnIcon = AddCredit;
            break;
        default:
            ReturnIcon = AntdIcon;
    }

    const StyledIcon = styled(ReturnIcon)`
        && {
            ${color};
            ${space};
            ${width};
            ${height};
            ${position};
            ${color};
            ${fontSize};
            ${left};
            ${top};
            ${bottom};
            ${right};
            ${fontWeight};
        }
    `;

    const StyledIconContainer = styled.span`
        &&&& {
            ${lineHeight};
            ${fontSize};
            ${height};
            ${display};
            ${!isButton &&
                (cssProps =>
                    cssProps.color
                        ? color
                        : `color: ${cssProps.theme.colors.icon.black}`)};
        }
    `;

    StyledIconContainer.defaultProps = {
        display: 'inline-block',
        lineHeight: 1,
    };

    StyledIcon.defaultProps = {};

    return (
        <StyledIconContainer {...rest}>
            <StyledIcon type={type} {...rest} />
        </StyledIconContainer>
    );
};

export default Icon;
