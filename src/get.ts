import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { getTodoItemById, handleError, headers, tableName } from "./handlers";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const item = await getTodoItemById(event.pathParameters?.id as string);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: true,
                data: item,
                message: "Records fetched successfully."
            })
        };

    } catch (e) {
        return handleError(e);
    }
};