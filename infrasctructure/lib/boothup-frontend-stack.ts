import * as path from 'path';
import { Stack, Construct, RemovalPolicy } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { CloudFrontWebDistribution, OriginAccessIdentity, ViewerProtocolPolicy } from '@aws-cdk/aws-cloudfront';
import { Props, grn, ENVIRONMENT } from './helpers';

export class BoothupFrontendStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { config } = props;

    const frontendBucket = new Bucket(this, grn(config, 'frontend-bucket'), {
      bucketName: grn(config, 'frontend-bucket'),
      removalPolicy: config.stage === ENVIRONMENT.DEV ? RemovalPolicy.DESTROY : RemovalPolicy.RETAIN,
    });

    const accessIdentity = new OriginAccessIdentity(this, grn(config, 'origin-access-identity'), {
      comment: `${frontendBucket.bucketName} origin-access-identity for cloudfront.`,
    });

    const distribution = new CloudFrontWebDistribution(this, grn(config, 'distribution'), {
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
    });

    new BucketDeployment(this, grn(config, 'bucket-deployment'), {
      sources: [Source.asset(path.join('../frontend/build'))],
      destinationBucket: frontendBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
