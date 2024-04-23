import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("Echo from the echo lambda handler");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `echo: ${event.body}`
    }),
    isBase64Encoded: false,
    headers: {'Content-Type': 'application/json'}
  };
};

export { handler };
