import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("Hello from the hello lambda handler");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `hello: ${event.body}`
    }),
  };
};

export { handler };
