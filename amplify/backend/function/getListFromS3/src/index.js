
/* Amplify Params - DO NOT EDIT
	API_AMPLIFYAPP_BOARDTABLE_ARN
	API_AMPLIFYAPP_BOARDTABLE_NAME
	API_AMPLIFYAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_AMPLIFYAPP_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYAPP_GRAPHQLAPIKEYOUTPUT
	API_AMPLIFYAPP_PERSONTABLE_ARN
	API_AMPLIFYAPP_PERSONTABLE_NAME
	ENV
	REGION
	STORAGE_AMPDEV_BUCKETNAME
Amplify Params - DO NOT EDIT */


const AWS = require("@aws-sdk");
const backet  = "amplifyappcc2e9b028c7242c29b9d5b02189fad26e0bad-dev";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    var s3= new AWS.S3();
    let param = {Bucket : backet };
    const res = await s3.listObjects(param).promise();
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(res),
    };
};
