import React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Modal } from '~/components';

const StyledModal = styled(Modal)`
    &&.ant-modal {
        top: 0;
        bottom: 0;
        height: 100vh;
        max-width: 100%;
        margin: 0;
    }

    && .ant-modal-content {
        bottom: 0;
        position: absolute;
        width: 100%;
    }

    && .ant-modal-body {
        height: 300px;
        overflow: scroll;
    }

    && .ant-menu-inline,
    && .ant-menu-vertical,
    && .ant-menu-vertical-left {
        border-right: none;
    }

    @media (min-width: ${props => props.theme.breakpoints[0]}) {
        &&.ant-modal {
            top: 100px;
            height: auto;
            max-width: 500px;
            margin: 0 auto;
        }

        && .ant-modal-content {
            bottom: unset;
            position: relative;
            width: 100%;
        }

        && .ant-modal-body {
            height: 500px;
            overflow: scroll;
        }
    }
`;

const SelectProcedureModal = ({
    procedureList = [],
    isModalVisible = false,
    onToggleModal = () => {},
    onSelectBundle = () => {},
}) => (
    <StyledModal
        closable
        title="Select Procedure"
        visible={isModalVisible}
        onCancel={onToggleModal}
    >
        <Menu onClick={onSelectBundle}>
            {Object.entries(procedureList).map(procedure => (
                <Menu.ItemGroup key={procedure[0]} title={procedure[0]}>
                    {procedure[1].map(item => (
                        <Menu.Item key={item.name}>{item.name}</Menu.Item>
                    ))}
                </Menu.ItemGroup>
            ))}
        </Menu>
    </StyledModal>
);

export default SelectProcedureModal;
