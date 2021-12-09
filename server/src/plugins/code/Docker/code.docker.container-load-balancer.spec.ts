import { DockerContainerInformation } from "./docker-container-information";
import { DockerContainerLoadBalancer } from "./docker-container-load-balancer";

describe('Docker container load balancer', () => {

    let dockerContainerLoadBalancer: DockerContainerLoadBalancer

    beforeEach(() => {
        let dockerContainerMap: Map<string, Array<DockerContainerInformation>> = new Map<string, Array<DockerContainerInformation>>()
        let javaScriptContainerArray = new Array<DockerContainerInformation>()
        javaScriptContainerArray.push(new DockerContainerInformation(10000, '8f536ddb4316', 'JavaScript'))
        javaScriptContainerArray.push(new DockerContainerInformation(10002, '8f536ddb4111', 'JavaScript'))
        let pythonContainerArray = new Array<DockerContainerInformation>()
        pythonContainerArray.push(new DockerContainerInformation(10001, '9f536ddb4316', 'Python'))
        pythonContainerArray.push(new DockerContainerInformation(10003, '9f536ddb4111', 'Python'))

        dockerContainerMap.set('JavaScript', javaScriptContainerArray)
        dockerContainerMap.set('Python', pythonContainerArray)
        dockerContainerLoadBalancer = new DockerContainerLoadBalancer(dockerContainerMap)
    });

    test('Test get container for language', async () => {
        let javaScriptContainer1 = dockerContainerLoadBalancer.getContainerForLanguage('JavaScript')
        let javaScriptContainer2 = dockerContainerLoadBalancer.getContainerForLanguage('JavaScript')
        let javaScriptContainer3 = dockerContainerLoadBalancer.getContainerForLanguage('JavaScript')

        let pythonContainer1 = dockerContainerLoadBalancer.getContainerForLanguage('Python')
        let pythonContainer2 = dockerContainerLoadBalancer.getContainerForLanguage('Python')
        let pythonContainer3 = dockerContainerLoadBalancer.getContainerForLanguage('Python')

        expect(javaScriptContainer1).toStrictEqual(javaScriptContainer3)
        expect(javaScriptContainer1).not.toStrictEqual(javaScriptContainer2)
        expect(pythonContainer1).toStrictEqual(pythonContainer3)
        expect(pythonContainer1).not.toStrictEqual(pythonContainer2)
    });
});