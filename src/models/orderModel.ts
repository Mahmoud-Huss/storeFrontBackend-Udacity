import DB from "../database";

export type order = {
  id?: number;
  status: string;
  user_id: number;
};
export type orderProduct = {
  id?: number;
  product_id: number;
  order_id: number;
  quantity: number;
};
export class orderModel {
  async getAllOrders(userId: number): Promise<order[]> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const result = await conn.query(sql, [userId]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all orders of user. Error: ${err}`);
    }
  }
  async getLastOrder(user_id: number): Promise<order> {
    try {
      const conn = await DB.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC LIMIT 1";
      const result = conn.query(sql, [user_id]);
      conn.release();

      return (await result).rows[0];
    } catch (err) {
      throw new Error(`could not get current order. Error: ${err}`);
    }
  }

  async create(order: order): Promise<order> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get create your order. Error: ${err}`);
    }
  }
  async getCompletedOrders(user_id: number): Promise<order[]> {
    try {
      const conn = await DB.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'complete'";
      const result = await conn.query(sql, [user_id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get completed orders. Error: ${err}`);
    }
  }
  async addProduct(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<orderProduct> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [order_id, product_id, quantity]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product to your order. Error: ${err}`);
    }
  }
  async updateOrderStatus(status: string, order_Id: number): Promise<order> {
    try {
      const conn = await DB.connect();
      const sql = `UPDATE orders SET status=$1 WHERE id=$2 RETURNING *`;
      const result = await conn.query(sql, [status, order_Id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order status. Error: ${err}`);
    }
  }
  async deleteOrder(order_id: number): Promise<order> {
    try {
      const conn = await DB.connect();
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [order_id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete your order. Error: ${err}`);
    }
  }
}
