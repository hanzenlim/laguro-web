import React from 'react';
import { Alert as AntdAlert } from 'antd';
import styled from 'styled-components';
import { space, borderRadius } from 'styled-system';

import { Box, Link, Text } from '../../components';

const Alert = styled(AntdAlert)`
    &.ant-alert {
        ${space};
        ${borderRadius};
        box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.09);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        opacity: 0.88;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            position: relative;
            bottom: unset;
            left: unset;
            right: unset;
            opacity: 1;
        }

        &.ant-alert-no-icon {
            padding: 10px;
            padding-right: 42px;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                padding: 18px;
            }
        }

        &.ant-alert-error {
            border: none;
            background-color: #ff7373;
        }

        .ant-alert-close-icon {
            overflow: visible;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;

const QuizPrompt = () => (
    <Box width="100%" maxWidth={726} mx="auto">
        <Alert
            message={
                <Text
                    color="text.white"
                    fontSize={[1, '', 2]}
                    fontWeight="medium"
                >
                    {`See how much you can save with your insurance coverage. `}
                    <Link to="/" ml={6}>
                        <Text
                            is="span"
                            color="text.white"
                            fontSize={[1, '', 2]}
                            fontWeight="bold"
                            style={{ textDecoration: 'underline' }}
                        >
                            Take the quiz
                        </Text>
                    </Link>
                </Text>
            }
            type="error"
            closeText={
                <Text
                    color="#ff7373"
                    lineHeight="24px"
                    width={24}
                    bg="background.white"
                    textAlign="center"
                    fontSize={3}
                    borderRadius="50%"
                    style={{ boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)' }}
                >
                    &times;
                </Text>
            }
            my={[0, '', 16]}
            borderRadius={[0, '', 8]}
        />
    </Box>
);

QuizPrompt.propTypes = {};

export default QuizPrompt;
