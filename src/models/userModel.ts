import DB from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}
const { salt, pepper } = {
  salt: process.env.SALT_ROUNDS,
  pepper: process.env.BCRYPT_PASSWORD,
};

export class userModel {
  async index(): Promise<User[]> {
    try {
      const conn = await DB.connect();
      const sql = `SELECT * FROM users`;
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT * FROM users WHERE id=$1";
      const result = await conn.query(sql, [id]);
      conn.release();
      const { first_name, last_name, username, password } = result.rows[0];

      return {
        firstName: first_name,
        lastName: last_name,
        userName: username,
        password,
      };
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)  RETURNING *";
      const hashedPass = bcrypt.hashSync(
        user.password + pepper,
        parseInt(salt as string)
      );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        user.userName,
        hashedPass,
      ]);
      conn.release();
      const { id, first_name, last_name, username, password } = result.rows[0];

      return {
        id: id,
        firstName: first_name,
        lastName: last_name,
        userName: username,
        password,
      };
    } catch (err) {
      throw new Error(`Could not create user. ${err}`);
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const conn = await DB.connect();
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      const { first_name, last_name, username, password } = result.rows[0];

      return {
        firstName: first_name,
        lastName: last_name,
        userName: username,
        password,
      };
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await DB.connect();
      const sql = "SELECT password FROM users WHERE username=($1)";
      const result = await conn.query(sql, [username]);

      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
