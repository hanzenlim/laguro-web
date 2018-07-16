import React from 'react';
import { shallow } from 'enzyme';
import ReactFilestack from 'filestack-react';
import { UploadHealthInsurance } from '../UploadDocuments/UploadHealthInsurance';

describe('<UploadDocuments />', () => {
    let component = '';
    

    beforeEach(() => {
        // spy = jest.fn();
        component = shallow(<UploadHealthInsurance 
            auth={null}
        />);
    });

    afterEach(() => {
        component = null;
    });

    it('should have isLoading state set to true by default', () => {
        expect(component.state('isLoading')).toBe(true);
    });

    it('should render ReactFileStack uploader when it finish loading the data', () => {
        component.setState({ isLoading: false });
        const result = component.find(ReactFilestack);
        expect(result).toHaveLength(1);
    });

    it('should set signedUrl when calling extractUrlToState uploadPolicySignature state when isLoading is set to false', () => {
        component.setState({ isLoading: false });

        const expectedSignedUrl = 'https://dummy-website.com?policy=123&signature=abcd'; 
        component.instance().generateImageSignature = jest.fn().mockReturnValue(expectedSignedUrl);

        const result = {  
            'filesUploaded':[  
                {  
                    'filename':'myAwesomeImage.png',
                    'handle':'UoozRgYHTLSgqhtvBNZv',
                    'mimetype':'image/png',
                    'originalPath':'Screen Shot 2018-06-14 at 10.36.36 AM.png',
                    'size':133941,
                    'source':'local_file_system',
                    'url':'https://cdn.filestackcontent.com/UoozRgYHTLSgqhtvBNZv',
                    'uploadId':'662dba5a7bf566931ad9a13c1b9c6344',
                    'originalFile':{  
                        'name':'myAwesomeImage.png',
                        'type':'image/png',
                        'size':133941
                    },
                    'status':'Stored'
                }
            ],
            'filesFailed':[  
            ]
        }

        component.instance().extractUrlToState(result).then(() => {
            expect(component.state('signedUrlArr')).toEqual(expect.arrayContaining([expectedSignedUrl]));
        });
    });
});