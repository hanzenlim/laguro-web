import React, { Component } from 'react';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Icon, Button } from '../../components';

const PrevArrow = props => (
    <Button
        type="ghost"
        color="icon.white"
        className={`${props.className} leftArrow`}
        position="absolute"
        style={{ ...props.style, display: 'block' }}
        onClick={props.onClick}
        width="40px"
        left="-80px"
        top="50%"
    >
        <Icon
            type="leftArrow"
            isButton={true}
            width="30px"
            height="48px"
            cursor="pointer"
        />
    </Button>
);

const NextArrow = props => (
    <Button
        type="ghost"
        color="icon.white"
        className={`${props.className} rightArrow`}
        position="absolute"
        style={{ ...props.style, display: 'block' }}
        onClick={props.onClick}
        width="40px"
        right="-80px"
        top="50%"
    >
        <Icon
            type="rightArrow"
            isButton={true}
            width="30px"
            height="48px"
            cursor="pointer"
        />
    </Button>
);

class Carousel extends Component {
    render() {
        const { children, ...rest } = this.props;
        const settings = {
            dots: false,
            speed: 500,
            swipe: true,
            swipeToSlide: true,
            draggable: false,
        };

        return (
            <SlickSlider
                {...settings}
                {...rest}
                prevArrow={<PrevArrow />}
                nextArrow={<NextArrow />}
            >
                {children}
            </SlickSlider>
        );
    }
}

export default Carousel;
