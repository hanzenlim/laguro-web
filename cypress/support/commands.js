import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { registerForm } from '../utils';

const cache = new InMemoryCache();
const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache,
});

Cypress.Commands.add('registerNewUser', () => {
    const user = registerForm();
    const authUrl = 'http://localhost:3000/api/signup';

    return cy
        .log('resigter a test new user', user)
        .request('POST', authUrl, user)
        .then(({ body }) => {
            client.writeData({
                data: {
                    activeUser: {
                        ...body.user,
                        __typename: 'ActiveUser',
                    },
                    visibleModal: null,
                },
            });
            return Object.assign({}, body.user);
        });
});

Cypress.Commands.add('uploadFile', (selector, fileUrl, type = '') => {
    return cy.get(selector).then(subject => {
        return cy
            .fixture(fileUrl, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                return cy.window().then(win => {
                    const el = subject[0];
                    const nameSegments = fileUrl.split('/');
                    const name = nameSegments[nameSegments.length - 1];
                    const testFile = new win.File([blob], name, { type });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(testFile);
                    el.files = dataTransfer.files;
                    return subject;
                });
            });
    });
});

Cypress.Commands.add('addNewListing', (start, end, dateStart, dateEnd) => {
    return cy
        .get('input[id="startTime0"]')
        .click({ force: true })
        .get('input[class="ant-time-picker-panel-input  "]')
        .first()
        .type(start, { force: true, timeout: 1000 })
        .get('input[id="endTime0"]')
        .click({ force: true })
        .get('input[class="ant-time-picker-panel-input  "]')
        .last()
        .type(end, { force: true, timeout: 1000 })
        .get('div[class="sc-csuQGl jttbwb"]')
        .first()
        .click({ force: true })
        .get(`td[title="${dateStart}"]`)
        .click()
        .get(`td[title="${dateEnd}"]`)
        .click()
        .get('input[id="hourlyChairPrice0"]')
        .type('1000', { force: true })
        .get('input[id="cleaningFee0"]')
        .type('1000', { force: true })
        .get('[data-cy=host-submit]')
        .submit({ force: true })
        .get('[data-cy=host-submit]')
        .submit({ force: true });
});

Cypress.Commands.add('logout', () => {
    return cy
        .get('[data-cy=profile-button]')
        .trigger('mouseover')
        .get('[data-cy=logout-link]')
        .click({ force: true });
});
