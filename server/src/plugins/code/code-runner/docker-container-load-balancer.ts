import { DockerContainerInformation } from "./docker-container-information";

export class DockerContainerLoadBalancer {

    dockerContainerIndexMap: Map<string, number>
    dockerContainerMap: Map<string, Array<DockerContainerInformation>>

    constructor(dockerContainerMap: Map<string, Array<DockerContainerInformation>>) {
        this.dockerContainerMap = dockerContainerMap
        this.initDockerContainerIndexMap()
    }

    public initDockerContainerIndexMap(): void {
        this.dockerContainerIndexMap = new Map<string, number>()
        for (let language of this.dockerContainerMap.keys()) {
            this.dockerContainerIndexMap.set(language, 0)
        }
    }

    public getContainerForLanguage(language: string): DockerContainerInformation {
        let indexOfCurrentContainer = this.dockerContainerIndexMap.get(language)
        this.setIndexForNextContainer(language, indexOfCurrentContainer)
        return this.dockerContainerMap.get(language)[indexOfCurrentContainer]
    }

    public setIndexForNextContainer(language: string, indexOfCurrentContainer: number): void {
        const indexForNextContainer = (indexOfCurrentContainer + 1) % this.dockerContainerMap.get(language).length
        this.dockerContainerIndexMap.set(language, indexForNextContainer)
    }
}