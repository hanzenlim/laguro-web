describe('onboard new host', () => {
    const OFFICE_NAME = 'Merge Sort Center';
    const LOCATION_INIT = 'SAN';
    const LOCATION_DETAIL = 'Big O Street';

    const dropEvent = {
        dataTransfer: {
            files: [],
        },
    };

    it('success', () => {
        cy.registerNewUser().then(user => {
            cy.visit('/')
                .contains('Become a Host')
                .click()
                .get('input[id="officeName"]')
                .type(OFFICE_NAME)
                .get('div[id="location"]')
                .click()
                .get('input[class="ant-input ant-select-search__field"]')
                .last()
                .type(LOCATION_INIT, { force: true })
                .wait(3000)
                .get('li[class="ant-select-dropdown-menu-item"]')
                .first()
                .click()
                .get('input[id="addressDetail"]')
                .type(LOCATION_DETAIL)
                .get('button[id="addImageBtn"]')
                .click()
                .get('div[class="fsp-drop-area"]')
                .first()
                .click();
            // .fixture('images/image.jpeg')
            // .then(image => {
            //     return Cypress.Blob.base64StringToBlob(
            //         image,
            //         'image/jpg'
            //     ).then(blob => {
            //         dropEvent.dataTransfer.files.push(blob);
            //     });
            // })
            // .get('div[class="fsp-drop-area"]')
            // .first()
            // .trigger('drop', dropEvent);
            // .get('span[class="fsp-button fsp-button--primary"]')
            // .first()
            // .click();
        });
    });
});
