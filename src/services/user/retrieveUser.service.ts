import { QueryConfig, QueryResult } from "pg";
import { TUser, TUserResponse } from "../../interfaces/users.interfaces";
import { responseUserSchema } from "../../schemas/users.schemas";
import { client } from "../../database";

const retrieveUserService = async (id: number): Promise<TUserResponse> => {

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
          id = $1;

    `
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id]
  }
  const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig);
  
  return queryResult.rows[0];
};
export default retrieveUserService;
