import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';

import { Flex, Text, Image, Box } from '~/components';

import girlWithLaptop from '~/static/images/girlwithlaptop.svg';

class MountErrorPage extends PureComponent {
    componentDidMount() {
        if (this.props.history) {
            this.props.history.push('/error');
        }
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
            <Text fontSize={[5, '', 6]} fontWeight="bold" color="text.white">
                Oops...
            </Text>
            <Text fontSize={[5, '', 6]} color="text.white" mb={20}>
                I think something went wrong!{' '}
                <Text is="span" fontWeight="bold" color="text.white">
                    Sorry.
                </Text>
            </Text>
            <Image
                src="/static/images/girlwithlaptop.svg"
                alt="general-error"
                mx="auto"
                maxWidth="100%"
            />
        </Box>
    </Flex>
);

export { RedirectErrorPage };
export default GeneralErrorPage;
