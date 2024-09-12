import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { dbClient, handleError, headers, tableName } from "./handlers";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const params = new ScanCommand({
            "TableName": tableName
        })

        const result = await dbClient.send(params);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: true,
                data: result.Items,
                message: "Records fetched successfully."
            })
        };

    } catch (e) {
        return handleError(e);
    }
};