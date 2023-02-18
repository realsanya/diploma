import aws from './aws.config';

const client = new aws.S3({
  endpoint: 'https://storage.yandexcloud.net',
});

// export const getSignedUrl = async ({ type }: GetSignedUrlInput): Promise<GetSignedUrlResponse> => {
//   const action = 'putObject';
//   let objectKey = cuid();

//   let params = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `${objectKey}.${mime.extension(type)}`,
//     ContentType: type,
//     Expires: Number(SIGN_URL_EXPIRES),
//     ACL: 'public-read',
//   };

//   const signedURL: string = await new Promise((resolve, reject) => {
//     client.getSignedUrl(action, params, (err, url) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(url);
//       }
//     });
//   });

//   return { signedURL, objectURL: `https://${AWS_BUCKET_NAME}.storage.yandexcloud.net/${params.Key}`, expensive: params.Expires };
// };