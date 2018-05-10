import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import moment from "moment";


class LocationFilter extends Component {
	constructor(props) {
		super(props);
		this.state = { location: '' };
		this.onLocationChange = this.onLocationChange.bind(this);
	}

	onLocationChange(location) {
		const { input } = this.props;
		const { onChange } = input;
		this.setState({ location });
		onChange(location);
	}

	handleChange = (location) => {
		this.setState({ location })
	}

	handleSelect = (location) => {
		geocodeByAddress(location)
		.then(results => getLatLng(results[0]))
	}

	// replace updateFilters with searchOffices
	onSubmit(values) {
		const { reset } = this.props;
		this.props.updateFilters({location: this.state.location});
		reset();
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;

		const { classes } = this.props;
		const inputProps = {
			value: this.state.location,
			type: 'search',
			placeholder: 'Search Places...',
			onChange: this.onLocationChange,
		};

		return (
			<form
				className="searchModule toggle active"
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
				>
				<PlacesAutocomplete
					value={this.state.location}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
					>
					{({ getInputProps, suggestions, getSuggestionItemProps }) => (
						<div>
							<input
								{...getInputProps({
									placeholder: 'Search Places ...',
									className: 'location-search-input'
								})}
								/>
							<div className="autocomplete-dropdown-container">
								{suggestions.map(suggestion => {
									const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
									const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
									return (
										<div {...getSuggestionItemProps(suggestion, { className, style })}>
											<span>{suggestion.description}</span>
										</div>
									)
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
				<div className="form-buttons">
					<button
						className="waves-effect btn green lighten-2"
						type="submit"
						>
						Search
					</button>
				</div>
			</form>

		);

	}
}


export default reduxForm({
	form: "locationFilter"
})(connect(null, actions)(LocationFilter));
