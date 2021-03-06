import React, { Component } from 'react';
import styled from 'styled-components';
import { makePictureTree } from 'filestack-adaptive';

const StyledPicture = styled.picture`
    > img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
`;

class FilestackImage extends Component {
    renderSources(sources) {
        return sources.map(sourceObj => <source {...sourceObj} />);
    }

    renderImage(imageObj) {
        const { alt, ...rest } = imageObj;
        return <img alt={alt} {...rest} onClick={this.props.onClick} />;
    }

    render() {
        const tree = makePictureTree(this.props.handle, {
            ...this.props,
            useValidator: false,
        });

        return (
            <StyledPicture>
                {tree.sources && this.renderSources(tree.sources)}
                {this.renderImage(tree.img)}
            </StyledPicture>
        );
    }
}

export default FilestackImage;
