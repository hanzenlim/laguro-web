import ReactFilestack from 'filestack-react';
import * as React from 'react';

const UploadView = props => {
    const options = {
        accept: ['image/*'],
        fromSources: ['local_file_system', 'url', 'imagesearch', 'facebook', 'instagram'],
        imageMin: [300, 300],
        storeTo: { container: 'user-photos' },
        transformations: {
            crop: {
                // TODO: Make aspectRatio dynamic
                aspectRatio: 1 / 1,
                force: true
            }
        },
        uploadInBackground: false
    };

    return (
        <ReactFilestack
            // TODO: Move API key
            apikey={'A7cEn4GqsRuGqoNkM7cSTz'}
            options={options}
            onSuccess={props.onSuccess}
            render={renderProps => {
                if (props.render) {
                    return props.render(renderProps);
                }

                return <button onClick={renderProps.onPick}>Upload</button>;
            }}
            value={props.value}
        />
    );
};

export default UploadView;
