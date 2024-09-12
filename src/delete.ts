import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dbClient, getTodoItemById, handleError, headers, tableName } from "./handlers";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const id = event.pathParameters?.id as string;

        await dbClient.send(new DeleteCommand({
            TableName: tableName,
            Key: {
                todoID: id,
            },
        }));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: true,
                message: "Records deleted successfully."
            })
        };

    } catch (e) {
        return handleError(e);
    }
};