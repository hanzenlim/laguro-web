describe('onboard new host', () => {
    const OFFICE_NAME = 'Merge Sort Center';
    const LOCATION_INIT = 'SAN';
    const LOCATION_DETAIL = 'Big O Street';
    const SUMARY_TEXT = 'Good and Clean';
    const NEW_OFFICE_NAME = 'Quick Sort Center';
    const NEW_SUMMARY_TEXT = 'Nice';

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
                .uploadFile(
                    'input[id="fsp-fileUpload"]',
                    'images/macaroni.png',
                    'image/png'
                )
                .get('span[class="fsp-button fsp-button--primary"]')
                .first()
                .click()
                .get('span[class="fsp-button fsp-button--outline"]')
                .first()
                .click()
                .get('span[class="fsp-button fsp-button--primary"]')
                .first()
                .click()
                .get('span[class="fsp-button fsp-button--primary"]')
                .first()
                .click()
                .get('form[id="host_submit__form"]')
                .submit({ force: true })
                .get('textarea[id="officeDescription"]')
                .type(SUMARY_TEXT, { force: true })
                .get('form[id="host_submit__form"]')
                .submit({ force: true })
                .get('form[id="host_submit__form"]')
                .submit({ force: true })
                .addNewListing(
                    '7:00 a',
                    '8:00 a',
                    'February 10, 2019',
                    'February 15, 2019'
                )
                .wait(8000)
                .get('a[id="host_office__edit"]')
                .click()
                .get('input[id="officeName"]')
                .type(NEW_OFFICE_NAME)
                .get('button[id="addImageBtn"]')
                .click()
                .uploadFile(
                    'input[id="fsp-fileUpload"]',
                    'images/macaroni.png',
                    'image/png'
                )
                .get('span[class="fsp-button fsp-button--primary"]')
                .first()
                .click()
                .get('span[class="fsp-button fsp-button--outline"]')
                .first()
                .click()
                .get('span[class="fsp-button fsp-button--primary"]')
                .first()
                .click()
                .get('span[class="fsp-button fsp-button--primary"]')
                .first()
                .click()
                .get('form[id="host_submit__form"]')
                .submit({ force: true })
                .get('textarea[id="officeDescription"]')
                .type(NEW_SUMMARY_TEXT, { force: true })
                .get('form[id="host_submit__form"]')
                .submit({ force: true })
                .get('form[id="host_submit__form"]')
                .submit({ force: true })
                .get('form[id="host_submit__form"]')
                .submit({ force: true })
                .wait(8000)
                .get('a[id="add_new__listing"]')
                .click({ force: true })
                .addNewListing(
                    '9:00 p',
                    '10:00 p',
                    'January 22, 2019',
                    'January 25, 2019'
                )
                .logout();

            // .get('form[id="host_submit__form"]')
            // .submit({ force: true });
        });
    });
});
