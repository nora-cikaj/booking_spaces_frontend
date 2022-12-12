#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BoothupFrontendStack } from '../lib/boothup-frontend-stack';
import { configFromEnv, generateResourceName } from '../lib/helpers';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: 'eu-central-1',
};
const config = configFromEnv();

new BoothupFrontendStack(app, generateResourceName(config, 'frontend'), {
  config,
});
