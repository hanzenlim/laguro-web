import React, { PureComponent } from 'react';
import SuggestedDentistView from './view';

class SuggestedDentist extends PureComponent {
    handleFindAnotherMatch = () => {
        if (this.props.onFindAnotherMatch) {
            this.props.onFindAnotherMatch();
        }
    };

    render() {
        const dentist = {
            imageUrl: this.props.suggestedDentist.imageUrl,
            specialty: this.props.suggestedDentist.specialty,
            name: `Dr. ${this.props.suggestedDentist.name}`,
            rating: this.props.suggestedDentist.totalRating,
            reviewCount: this.props.suggestedDentist.numReviews,
            insurance: this.props.suggestedDentist.acceptedInsurances,
            languages: this.props.suggestedDentist.languages,
        };

        return (
            <SuggestedDentistView
                dentist={dentist}
                isFindAnotherMatchDisabled={
                    this.props.isFindAnotherMatchDisabled
                }
                onFindAnotherMatch={this.handleFindAnotherMatch}
            />
        );
    }
}

SuggestedDentist.propTypes = {};

export default SuggestedDentist;
