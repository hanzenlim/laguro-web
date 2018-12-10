import React from 'react';
import ReactResponsive from 'react-responsive';
import withSizes from 'react-sizes';

const sizes = {
    maxMobile: 767,
    minTablet: 768,
    maxTablet: 991,
    minDesktop: 992,
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
    mobileOnly: width < sizes.minTablet, // 767px and below
    tabletOnly: width > sizes.maxMobile && width < sizes.minDesktop, // 768px - 991px
    desktopOnly: width > sizes.maxTablet, // 992px and above
    tabletMobileOnly: width < sizes.minDesktop, // 991px and below
    tabletDesktopOnly: width > sizes.maxMobile, // 768px and above
    screenWidth: width,
}));

Responsive.withScreenSizes = withScreenSizes;

export { sizes, withScreenSizes };

export default Responsive;
