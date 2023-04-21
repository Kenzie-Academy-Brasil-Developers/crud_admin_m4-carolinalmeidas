import { QueryResult } from "pg";

import "dotenv/config"
import { TUserResponse } from "../../interfaces/users.interfaces";
import { client } from "../../database";

const listUserService = async (): Promise<Array<TUserResponse>> => {
 
  const queryString: string = `
        SELECT
            "name",
            "email",
            "admin",
            "active"
        FROM
            users;
    `;
  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );

  return queryResult.rows;
};
export default listUserService;
