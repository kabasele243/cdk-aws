import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function as LambdaFunction, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';


export class SpaceStack extends Stack{

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props)

        const helloLamba = new LambdaFunction(this, 'helloLamba', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'services')),
            handler: 'hello.main'
        })
    }
}