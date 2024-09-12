import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dbClient, getTodoItemById, handleError, headers, schema, tableName } from "./handlers";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const id = event.pathParameters?.id as string

        // const item = await getTodoItemById(event.pathParameters?.id as string);

        const reqBody = JSON.parse(event.body as string);

        await schema.validate(reqBody, {abortEarly: false});

        const item = {
            todoID: id,
           ...reqBody
        }

        await dbClient.send(new PutCommand({
            TableName: tableName,
            Item: item,
        }));

        return {
            statusCode: 204,
            headers,  
            body: JSON.stringify({
                status: true,
                message: "Records updated successfully."
            })
        };

    } catch (e) {
        return handleError(e);
    }
};