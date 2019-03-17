import React from 'react';
import ReactResponsive from 'react-responsive';
import withSizes from 'react-sizes';

const sizes = {
    maxMobile: 767,
    minTablet: 768,
    maxTablet: 1024,
    minDesktop: 1025,
};

const Responsive = props => <ReactResponsive {...props} />;

Responsive.Desktop = props => (
    <ReactResponsive {...props} minWidth={sizes.minDesktop} />
);
Responsive.TabletMobile = props => (
    <ReactResponsive {...props} maxWidth={sizes.maxTablet} />
);
Responsive.Tablet = props => (
    <ReactResponsive
        {...props}
        minWidth={sizes.minTablet}
        maxWidth={sizes.maxTablet}
    />
);
Responsive.Mobile = props => (
    <ReactResponsive {...props} maxWidth={sizes.maxMobile} />
);

Responsive.TabletDesktop = props => (
    <ReactResponsive {...props} minWidth={sizes.minTablet} />
);

Responsive.sizes = sizes;

const withScreenSizes = withSizes(({ width }) => ({
    mobileOnly: width < sizes.minTablet,
    tabletOnly: width > sizes.maxMobile && width < sizes.minDesktop,
    desktopOnly: width > sizes.maxTablet,
    tabletMobileOnly: width < sizes.minDesktop,
    tabletDesktopOnly: width > sizes.maxMobile,
    screenWidth: width,
}));

Responsive.withScreenSizes = withScreenSizes;

export { sizes, withScreenSizes };

export default Responsive;
