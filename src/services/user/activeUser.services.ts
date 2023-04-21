import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const activeUserService = async (id: number): Promise<Response> => {
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

  return queryResult.rows[0];
};

export default activeUserService;
