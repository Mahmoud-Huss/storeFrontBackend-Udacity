import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

let host: string, database: string, user: string, password: string;

if (process.env.ENV == "test") {
  const {
    POSTGRES_TEST_HOST,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
    POSTGRES_TEST_PASSWORD,
  } = process.env;
  host = POSTGRES_TEST_HOST as string;
  database = POSTGRES_TEST_DB as string;
  user = POSTGRES_TEST_USER as string;
  password = POSTGRES_TEST_PASSWORD as string;
} else {
  const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
    process.env;
  host = POSTGRES_HOST as string;
  database = POSTGRES_DB as string;
  user = POSTGRES_USER as string;
  password = POSTGRES_PASSWORD as string;
}
const DB = new Pool({
  host,
  database,
  user,
  password,
});

export default DB;
