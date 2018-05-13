import React, { Component } from 'react';
import OfficeSearch from './OfficeSearch';
import DentistSearch from './DentistSearch';

class Landing extends Component {
    componentWillMount() {
        document.title = 'Laguro - Home';
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

    render() {
        return (
            <div>
                <div className="hero-search">
                    <div className="mission">
                        <h3 className="toggle active">No Empty Chairs.</h3>
                        <p className="grey-text toggle active">
							Search, discover and book a chair after-hours at a local clinic
							and see <strong>your</strong> patients on <strong>your</strong>{' '}
							terms.
                        </p>

                        <h3 className="toggle">No Waiting Rooms.</h3>
                        <p className="grey-text toggle">
							Find your next dentist or specialist and book an appointment in{' '}
                            <strong>your</strong> neighborhood on <strong>your</strong>{' '}
							schedule.
                        </p>
                    </div>
                    <div className="search">
                        <div className="search-tabs">
                            <div
                                className="tab active toggle"
                                id="office-tab"
                                onClick={this.tabChange}
                            >
                                <h5>Find an Office</h5>
                            </div>
                            <div
                                className="tab toggle"
                                id="dentist-tab"
                                onClick={this.tabChange}
                            >
                                <h5>Find a Dentist</h5>
                            </div>
                        </div>
                        <OfficeSearch />
                        <DentistSearch />
                    </div>
                </div>

                <div className="hero-img">
                    <img src="/img/hero1.jpg" alt="hero"/>
                </div>
            </div>
        );
    }
}

export default Landing;
