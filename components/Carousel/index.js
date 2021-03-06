import React, { PureComponent } from 'react';
import styled from 'styled-components';
import NukaCarousel from 'nuka-carousel';
import { Icon, Button } from '~/components';

const StyledNukaCarousel = styled(NukaCarousel)``;

class Carousel extends PureComponent {
    render() {
        const { children, ...rest } = this.props;

        return (
            <StyledNukaCarousel
                {...rest}
                renderBottomCenterControls={() => <div />}
                renderCenterLeftControls={({ previousSlide }) => (
                    <Button
                        style={rest.controlsStyle}
                        type="ghost"
                        color="icon.white"
                        left="128px"
                        position="absolute"
                    >
                        <Icon
                            type="leftArrow"
                            isButton={true}
                            width="30px"
                            height="48px"
                            cursor="pointer"
                            onClick={previousSlide}
                        />
                    </Button>
                )}
                renderCenterRightControls={({ nextSlide }) => (
                    <Button
                        style={rest.controlsStyle}
                        type="ghost"
                        color="icon.white"
                        right="128px"
                        position="absolute"
                    >
                        <Icon
                            type="rightArrow"
                            isButton={true}
                            width="30px"
                            height="48px"
                            cursor="pointer"
                            onClick={nextSlide}
                        />
                    </Button>
                )}
            >
                {children}
            </StyledNukaCarousel>
        );
    }
}

export default Carousel;
