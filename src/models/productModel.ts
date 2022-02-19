import DB from "../database";

export type product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class productModel {
  async index(): Promise<product[]> {
    try {
      const conn = await DB.connect();
      const sql = `SELECT * FROM products`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }
  async getProductById(id: number): Promise<product> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM products WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(b: product): Promise<product> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3)  RETURNING *";
      const result = await conn.query(sql, [b.name, b.price, b.category]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get products. ${err}`);
    }
  }

  async getProductsByCategory(category: string): Promise<product[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM products WHERE category = $1";
      const result = await conn.query(sql, [category]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get prodcuts of category: ${category}. Error: ${err} `
      );
    }
  }
  async topProducts(): Promise<product[]> {
    try {
      const conn = await DB.connect();
      const sql =
        "SELECT product_id, COUNT(*) FROM order_products GROUP BY product_id ORDER BY COUNT(*) DESC LIMIT 5";
      const result = await conn.query(sql);

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }
  async deleteProduct(id: number): Promise<product> {
    try {
      const conn = await DB.connect();
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }
}
