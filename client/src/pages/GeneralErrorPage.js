import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

import { Flex, Text, Image, Box } from '../components';

import girlWithLaptop from '../images/girlwithlaptop.svg';

class MountErrorPage extends PureComponent {
    componentDidMount() {
        this.props.history.push('/error');
    }
    render() {
        return null;
    }
}

const RedirectErrorPage = withRouter(MountErrorPage);

const GeneralErrorPage = () => (
    <Flex
        width="100%"
        minHeight="100vh"
        bg="#313647"
        alignItems="center"
        justifyContent="center"
    >
        <Box px={15} py={80} textAlign="center">
            <Text fontSize={6} fontWeight="bold" color="text.white">
                Oops...
            </Text>
            <Text fontSize={6} color="text.white" mb={20}>
                I think something went wrong!{' '}
                <Text is="span" fontWeight="bold" color="text.white">
                    Sorry.
                </Text>
            </Text>
            <Image src={girlWithLaptop} alt="general-error" mx="auto" />
        </Box>
    </Flex>
);

export { RedirectErrorPage };
export default GeneralErrorPage;
