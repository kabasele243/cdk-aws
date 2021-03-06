import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function as LambdaFunction, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import {NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';


export class SpaceStack extends Stack{

    private api = new RestApi(this, 'SpaceApi');
    private spacesTable = new GenericTable(
        'SpacesTable',
        'spaceId',
        this
    )

    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props)

        const helloLamba = new LambdaFunction(this, 'helloLamba', {
            runtime: Runtime.NODEJS_14_X,
            code: Code.fromAsset(join(__dirname, '..', 'services')),
            handler: 'hello.main'
        })

        const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
            entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
            handler: 'handler'
        });


        //Hello Api Lambda Integration
        const helloLambaIntegration = new LambdaIntegration(helloLamba);
        const helloLambdaRessource = this.api.root.addResource('hello');
        helloLambdaRessource.addMethod('GET',  helloLambaIntegration);
    }
}