import { faker } from "@faker-js/faker";

export const fakeUser = (req, res) => {
  let first_name = faker.person.firstName();
  let last_name = faker.person.lastName();
  let email = faker.internet.email();
  let age = faker.number.int({ min: 18, max: 68 });
  let password = faker.internet.password();
  res.send({ first_name, last_name, email, age, password });
};