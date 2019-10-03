import React, { PureComponent } from 'react';
import SuggestedDentistView from './view';

class SuggestedDentist extends PureComponent {
    handleFindAnotherMatch = async () => {
        if (this.props.onFindAnotherMatch) {
            await this.props.onFindAnotherMatch();
            this.props.onSelectTimeSlot(null);
        }
    };

    render() {
        const dentist = {
            id: this.props.suggestedDentist.id,
            imageUrl: this.props.suggestedDentist.imageUrl,
            specialty: this.props.suggestedDentist.specialty,
            name: `Dr. ${this.props.suggestedDentist.name}`,
            rating: this.props.suggestedDentist.averageRating,
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
