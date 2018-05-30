import React, { Component } from 'react';
import styled from "styled-components";
import Search from "./Search";

import HeroImg from './images/hero-img.png';
import HeroImgMobile from './images/cta-img-mobile.png';
import PhotoGrid from './PhotoGrid'
import Icon from './Icon';

import './css/Landing.css'

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            height: window.innerHeight,
            width: window.innerWidth
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        document.title = 'Laguro - Home';
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }

    tabChange(event) {
        const id = event.target.parentNode.id;
        const element = document.getElementById(id);

        const elementsToToggle = document.getElementsByClassName('toggle');

        if (element && !element.classList.value.includes('active')) {
            for (const el of elementsToToggle) {
                el.classList.toggle('active');
            }
        }
    }

    cta() {
        if (!(window.innerWidth <= 540)) {
            return (
                <img id="cta" src={HeroImg} alt='cta' />
            );
        } else {
            return (
                <img id="cta" src={HeroImgMobile} alt='cta' />
            );
        }
    }

    render() {
        const SearchTabH5 = styled.h5`
            padding: 1.1rem 0 .66rem 0;
            margin: 0;
            cursor: pointer;
            font-size: 1.40rem;
        `;

        const IconWithMargin = styled(Icon)`
            @media screen and (min-width : 541px) {
                margin-top: 5%;
            }
        `;

        const mainIconWidth = (window.innerWidth >= 541)? "81px" : "45px";

        return (
            <div>
                <div className="landing">
                    <div className="hero-search">
                        <IconWithMargin width={mainIconWidth} icon="logo" background="#FFFFFF" tooth="#0AD5B1" />
                        <div className="mission">
                            <h3 className="toggle active headline"> No Waiting Rooms.</h3>
                            <p className="toggle active explanation"> Find your next dentist or specialist and book an appointment in your neighborhood on your schedule.
                            </p>
                            <h3 className="toggle headline"> No Empty Chairs.</h3>
                            <p className="toggle explanation"> Search, discover and book a chair after-hours at a local clinic and see your patients on your terms. </p>
                        </div>
                        <div className="search">
                            <div className="search-tabs">
                                <div
                                    className="tab active toggle"
                                    id="dentist-tab"
                                    onClick={this.tabChange}
                                >
                                    <SearchTabH5 className="search-tab">Find a Dentist</SearchTabH5>
                                </div>
                                <div
                                    className="tab toggle"
                                    id="office-tab"
                                    onClick={this.tabChange}
                                >
                                    <SearchTabH5 className="search-tab">Rent an Office</SearchTabH5>
                                </div>
                            </div>
                            <div className="searchModule toggle active">
                                <Search search="dentist" />
                            </div>
                            <div className="searchModule toggle">
                                <Search search="office" />
                            </div>
                        </div>
                    </div>
                </div>

                <PhotoGrid numRow="2" page="landing"/>

                <div id="cta-container">
                    {this.cta()}
                    <div id="cta-text">
                        <h2 className="cta-text-header"> Rent your Office </h2>
                        <h4 className="cta-text-blurb"> Have free space to share or have an open office? Rent your dental office with Laguro. </h4>

                        <a id="get-started" className="login waves-effect btn white-text">Get Started</a>
                    </div>
                </div>


            </div>
        );
    }
}

export default Landing;
