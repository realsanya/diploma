import AWS from 'aws-sdk';

const accessKeyId = process.env.AWS_USER_KEY;
const secretAccessKey = process.env.AWS_USER_SECRET_KEY;

AWS.config.update({ region: process.env.AWS_REGION, accessKeyId, secretAccessKey });

export default AWS;