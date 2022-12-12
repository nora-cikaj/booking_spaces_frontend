import * as path from 'path';
import { Stack, Construct, RemovalPolicy, CfnOutput, Fn } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
  ViewerProtocolPolicy,
} from '@aws-cdk/aws-cloudfront';
import { Props, generateResourceName, ENVIRONMENT } from './helpers';

export class BoothupFrontendStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { config } = props;

    const frontendBucket = new Bucket(
      this,
      generateResourceName(config, 'frontend-bucket'),
      {
        bucketName: generateResourceName(config, 'frontend-bucket'),
        removalPolicy:
          config.stage === ENVIRONMENT.DEV
            ? RemovalPolicy.DESTROY
            : RemovalPolicy.RETAIN,
      },
    );

    const accessIdentity = new OriginAccessIdentity(
      this,
      generateResourceName(config, 'origin-access-identity'),
      {
        comment: `${frontendBucket.bucketName} origin-access-identity for cloudfront.`,
      },
    );

    const distribution = new CloudFrontWebDistribution(
      this,
      generateResourceName(config, 'distribution'),
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: frontendBucket,
              originAccessIdentity: accessIdentity,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        errorConfigurations: [
          {
            errorCode: 403,
            responsePagePath: '/index.html',
            responseCode: 200,
          },
          {
            errorCode: 404,
            responsePagePath: '/index.html',
            responseCode: 200,
          },
        ],
        viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY,
      },
    );

    new BucketDeployment(
      this,
      generateResourceName(config, 'bucket-deployment'),
      {
        sources: [Source.asset(path.join('../frontend/build'))],
        destinationBucket: frontendBucket,
        distribution,
        distributionPaths: ['/*'],
      },
    );

    new CfnOutput(
      this,
      generateResourceName(config, 'cloudfront-distribution-domain'),
      {
        value: distribution.distributionDomainName,
      },
    );
  }
}
