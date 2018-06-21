import crypto from 'crypto';
import multer from 'multer';

// External Packages
const serverDataLoader = require('../util/serverDataLoader');

const makeMutation = serverDataLoader.makeMutation;
const updatePatientDocumentSignatureQuery = serverDataLoader.updatePatientDocumentSignatureQuery;
const updatePatientDocumentSignatureVariable = serverDataLoader.updatePatientDocumentSignatureVariable;

const upload = multer();

const hellosignRoutes = app => {
    app.post('/api/hellosign', upload.any(), (req, res) => {
        const event = JSON.parse(req.body.json);

        const { event_time, event_type, event_hash } = event.event;

        const hash = crypto
            .createHmac(
                'sha256',
                process.env.HELLOSIGN_API_KEY,
            )
            .update(event_time + event_type)
            .digest('hex')
            .toString();

        if (event_hash === hash) {
            if (event_type === 'signature_request_all_signed') {
                const signatureRequestId = event.signature_request.signature_request_id;

                makeMutation(
                    updatePatientDocumentSignatureQuery,
                    updatePatientDocumentSignatureVariable(signatureRequestId)
                );
            }
            res.send('Hello API Event Received');
        } else {
            res.sendStatus(401);
        }
    });
};

export default hellosignRoutes;
