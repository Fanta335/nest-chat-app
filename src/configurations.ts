import * as AWS from 'aws-sdk';

export const getSecretsValuesFromAwsSecretManager = async () => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'dev') {
    return {
      username: 'root',
      password: '',
      engine: 'mysql',
      host: 'localhost',
      port: 3306,
      dbname: 'test',
    };
  }
  const secretsManager = new AWS.SecretsManager({
    region: process.env.AWS_REGION || 'ap-northeast-1',
  });
  const response = await secretsManager
    .getSecretValue({
      SecretId: process.env.RDS_SECRET_NAME || 'nest-chat-app-db-secret',
    })
    .promise();

  const { username, password, engine, host, port, dbname } = JSON.parse(
    response.SecretString ?? '',
  );
  return { username, password, engine, host, port, dbname };
};
