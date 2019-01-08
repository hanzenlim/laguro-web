import faker from 'faker';

export function registerForm() {
    const onlyPassword = faker.internet.password(8);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return Object.assign({
        firstName,
        lastName,
        password: onlyPassword,
        confirmPassword: onlyPassword,
        email: faker.internet.email(firstName, lastName),
    });
}
