import * as cdk from '@aws-cdk/core';

export enum ENVIRONMENT {
  DEV = 'dev',
  PROD = 'prod',
}

export interface Config {
  project: string;
  stage: ENVIRONMENT;
}

export const configFromEnv = () => {
  let stage = ENVIRONMENT.DEV;

  if (process.env.ENVIRONMENT === ENVIRONMENT.PROD) stage = ENVIRONMENT.PROD;

  const config: Config = {
    project: 'boothup',
    stage: stage,
  };
  console.log('CONFIG:', config);
  return config;
};

export interface Props extends cdk.StackProps {
  config: Config;
}

export const generateResourceName = (
  config: Config,
  resource: string,
): string => `${config.project}-${resource}-${config.stage}`;
