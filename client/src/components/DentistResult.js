import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';

class DentistResult extends Component {
    renderProcedures(procedures) {
        if (procedures.length) {
            return procedures.slice(0, 4).map(procedure => (
                <span
                    key={procedure.name}
                    className="badge white-text light-blue lighten-2"
                >
                    {procedure.name}
                </span>
            ));
        }
        return <div />;
    }

    imgUrl() {
        return this.props.img
            ? this.props.img
            : 'http://via.placeholder.com/200x200';
    }

    render() {
        return (
            <div className="searchResult hoverable">
                <Link
                    className="blue-text text-darken-2"
                    to={`/dentist/${this.props.dentist_id}`}
                >
                    <img
                        className="result-img"
                        src={this.imgUrl()}
                        alt="Doctor"
                    />
                </Link>
                <div className="content">
                    <div className="header">
                        <Link
                            className="blue-text text-darken-2"
                            to={`/dentist/${this.props.dentist_id}`}
                        >
                            <h5>
                                {this.props.index + 1}. {this.props.name}
                            </h5>
                        </Link>
                        <h6>
                            {this.props.specialty} - {this.props.location}
                        </h6>
                    </div>
                    <div className="rating">
                        <ReactStars
                            count={5}
                            edit={false}
                            value={this.props.rating_value}
                        />
                        <span className="rating_count grey-text text-darken-1">
                            {`${this.props.rating_count} Reviews`}
                        </span>
                    </div>
                    <div className="badges">
                        {this.renderProcedures(this.props.procedures)}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null)(DentistResult);
