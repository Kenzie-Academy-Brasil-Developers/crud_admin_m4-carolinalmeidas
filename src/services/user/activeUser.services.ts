import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { responseUserSchema } from "../../schemas/users.schemas";
import { TUserResponse } from "../../interfaces/users.interfaces";

const activeUserService = async (id: number): Promise<TUserResponse> => {
  const queryString: string = `
    UPDATE 
        users 
    SET 
        active = 'true'
    WHERE 
        id = $1
    RETURNING
        *;
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult = await client.query(queryConfig);
  const user = responseUserSchema.parse(queryResult.rows[0])
  return user;
};

export default activeUserService;
