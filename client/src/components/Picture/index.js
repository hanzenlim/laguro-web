import React, { Component } from 'react';
import { makePictureTree } from 'filestack-adaptive';

class Picture extends Component {
    renderSources(sources) {
        return sources.map(sourceObj => {
            return <source {...sourceObj} />;
        });
    }
    renderImage(imageObj) {
        return <img {...imageObj} />;
    }
    render() {
        const tree = makePictureTree(this.props.handle, this.props);
        return (
            <picture>
                {tree.sources && this.renderSources(tree.sources)}
                {this.renderImage(tree.img)}
            </picture>
        );
    }
}

export default Picture;
