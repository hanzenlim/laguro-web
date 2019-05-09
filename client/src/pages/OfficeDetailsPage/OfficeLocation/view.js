import React, { PureComponent } from 'react';
import Loadable from 'react-loadable';
import _get from 'lodash/get';

import { Box, Text } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';

const Map = Loadable({
    loader: () => import('../../common/Map' /* webpackChunkName: "map" */),
    loading: () => null,
});

class OfficeLocationView extends PureComponent {
    sideWidthRef = React.createRef();

    state = { sideWidth: 0 };

    componentDidMount() {
        window.addEventListener('resize', this.setSideWidth);
        this.setSideWidth();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setSideWidth);
    }

    setSideWidth = () => {
        this.setState(() => ({
            sideWidth: this.sideWidthRef.current.offsetWidth,
        }));
    };

    render() {
        const { sideWidth } = this.state;
        const { data, desktopOnly } = this.props;
        return (
            <Box mt={[27, '', 32]} mb={[0, '', 40]} ref={this.sideWidthRef}>
                <Text
                    fontWeight="bold"
                    fontSize={[1, '', 2]}
                    lineHeight="30px"
                    letterSpacing={['0.05px', '', '0.06px']}
                    mb={1}
                >
                    Office location
                </Text>
                <Text fontSize={0} lineHeight="14px" letterSpacing="-0.27px">
                    {data.address.name}
                </Text>

                <Box mt={[13, '', 22]}>
                    {this.sideWidthRef.current && (
                        <Map
                            height={desktopOnly ? 305 : 228}
                            width={sideWidth}
                            zoom={13}
                            center={[
                                data.address.geoPoint.lon,
                                data.address.geoPoint.lat,
                            ]}
                            data={[
                                {
                                    title: data.officeName,
                                    image: data.imageUrls[0],
                                    address: data.address.name,
                                    latitude: _get(
                                        data,
                                        'address.geoPoint.lat'
                                    ),
                                    longitude: _get(
                                        data,
                                        'address.geoPoint.lon'
                                    ),
                                },
                            ]}
                        />
                    )}
                </Box>
            </Box>
        );
    }
}

export default withScreenSizes(OfficeLocationView);
