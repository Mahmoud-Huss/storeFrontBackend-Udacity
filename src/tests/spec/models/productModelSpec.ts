/* eslint-disable no-undef */
import { productModel, product } from "../../../models/productModel";

const productObj = new productModel();
let product_id: number;

describe("Product Model test", function () {
  describe("Check metheods to be defined", function () {
    it("should create a product", async () => {
      const p: product = {
          name: "phone",
          price: 20,
          category: "tech"
      }
      const result = await productObj.create(p);
      product_id = result.id as number;
      expect(result.name).toEqual("phone");
      expect(result.price).toEqual(20);
      expect(result.category).toEqual("tech");
    });

    it("should get all products", async () => {
      const products = await productObj.index()
      expect(products).toHaveSize(products.length);
    });

    it("should get top 5 products", async () => {
        const products = await productObj.topProducts()
        expect(products).toHaveSize(products.length);
      });

    it("should get a product by id", async () => {
      const result = await productObj.getProductById(product_id);
      expect(result.name).toEqual("phone");
      expect(result.price).toEqual(20);
      expect(result.category).toEqual("tech");
    });

    it("should get a product by category", async () => {
        const result = await productObj.getProductsByCategory("tech");
        expect(result[0].name).toEqual("phone");
        expect(result[0].price).toEqual(20);
        expect(result[0].category).toEqual("tech");
      });

    it("should delete a product by id", async () => {
      const result = await productObj.deleteProduct(product_id);
      expect(result.name).toEqual("phone");
      expect(result.price).toEqual(20);
      expect(result.category).toEqual("tech");
    });
  });
});
