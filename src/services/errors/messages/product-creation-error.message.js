export const generateProductErrorInfo = (product) => {
    return `Invalid property. One or more than one property incomplete or invalid.
      List of required properties:
      - title: type String, recived: ${product.title}
      - description: type String, recived: ${product.description}
      - code: type String, recived: ${product.code}
      - price: type Number, recived: ${product.price}
      - stock: type Number, recived: ${product.stock}
      - category: type String, recived: ${product.category}
      - tthumbnails: type Array, recived: ${product.thumbnails}
      `;
  };