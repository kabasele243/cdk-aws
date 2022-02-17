import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function as LambdaFunction, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway';


export class SpaceStack extends Stack{

    private api = new RestApi(this, 'SpaceApi');

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props)

        const helloLamba = new LambdaFunction(this, 'helloLamba', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'services')),
            handler: 'hello.main'
        })


        //Hello Api Lambda Integration
        const helloLambaIntegration = new LambdaIntegration(helloLamba);
        const helloLambdaRessource = this.api.root.addResource('hello');
        helloLambdaRessource.addMethod('GET',  helloLambaIntegration);
    }
}