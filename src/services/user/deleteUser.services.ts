import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const deleteUserService = async (id: number): Promise<Response> => {
  const queryString: string = `
    UPDATE 
        users 
    SET 
        active = 'false'
    WHERE 
        id = $1;
      `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

export default deleteUserService;
