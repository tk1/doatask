import { DockerContainerManager } from "./docker-container-manager";

describe('Docker Container Manager', () => {

    beforeAll(() => {
        DockerContainerManager.init('docker-compose.yml')
    });

    test('Read Docker compose file', async () => {
        expect(() => DockerContainerManager.readDockerComposeFile()).not.toThrowError()
    });

    test('Save Docker container information', async () => {
        DockerContainerManager.readDockerComposeFile()
        expect(() => DockerContainerManager.saveDockerContainerInformation()).not.toThrowError()
    });

    test('Save Docker container information', async () => {
        DockerContainerManager.readDockerComposeFile()
        DockerContainerManager.saveDockerContainerInformation()
        expect(() => DockerContainerManager.initDockerContainerLoadBalancer()).not.toThrowError()
    });
});