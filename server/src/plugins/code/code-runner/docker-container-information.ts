export class DockerContainerInformation {
    readonly port: number
    readonly containerName: string
    readonly language: string

    constructor(port: number, containerName: string, language: string) {
        this.port = port
        this.containerName = containerName
        this.language = language
    }
}