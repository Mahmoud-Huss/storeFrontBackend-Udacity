import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
<<<<<<< HEAD

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;
if (process.env.ENV == 'test'){
  console.log('hello there')
}
=======
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } =
  process.env;
>>>>>>> f7c390b8ea4fe9397da1539e62c929559162251f
const DB = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default DB;
