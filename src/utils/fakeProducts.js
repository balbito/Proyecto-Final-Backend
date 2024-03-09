import { faker } from "@faker-js/faker";

export const generateProducts = () => {
  let products = [];

  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }

  return products;
};

export const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.commerce.isbn(),
    price: faker.commerce.price(),
    status: faker.datatype.boolean(),
    stock: faker.number.int({ min: 5, max: 50 }),
    category: faker.commerce.department(),
    thumbnails: [
      faker.image.urlPicsumPhotos({ width: 500, height: 500 }),
      faker.image.urlPicsumPhotos({ width: 500, height: 500 }),
    ],
  };
};