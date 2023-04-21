import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";

const ensureActiveUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {id} = req.params
    
    const queryString: string = `
        SELECT
            *
        FROM 
            users
        WHERE
            active = 'false' AND id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }
    
    const queryResult: QueryResult = await client.query(queryConfig)

    console.log(queryResult.rowCount)

    if(queryResult.rowCount === 0){
        throw new AppError("User already active", 400)
    }
    return next()
   
}
export default ensureActiveUser