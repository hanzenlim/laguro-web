import React from 'react';
import ReactResponsive from 'react-responsive';

const Responsive = props => <ReactResponsive {...props} />;

Responsive.Desktop = props => <ReactResponsive {...props} minWidth={992} />;
Responsive.TabletMobile = props => (
    <ReactResponsive {...props} maxWidth={991} />
);
Responsive.Tablet = props => (
    <ReactResponsive {...props} minWidth={768} maxWidth={991} />
);
Responsive.Mobile = props => <ReactResponsive {...props} maxWidth={767} />;

export default Responsive;
