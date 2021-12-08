const { spawn } = require("child_process");
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import axios from "axios"
import { CodeRunnerReturn } from '../code-evaluator/code-runner-return';
import { CodeRunnerCaller } from '../code-runner-caller';
import { DockerContainerInformation } from './docker-container-information';
import { DockerContainerLoadBalancer } from './docker-container-load-balancer';

export class DockerContainerManager {

    static dockerComposeFile: Record<string, any>
    static dockerContainerMap: Map<string, Array<DockerContainerInformation>>
    static dockerContainerLoadBalancer: DockerContainerLoadBalancer
    static pathToDockerComposeFile: string
    static dockerContainerRestartMap: Map<string, number>

    public static init(pathToDockerComposeFile: string) {
        this.pathToDockerComposeFile = pathToDockerComposeFile
        this.dockerContainerMap = new Map<string, Array<DockerContainerInformation>>()
        this.dockerContainerRestartMap = new Map<string, number>()
        this.readDockerComposeFile()
        this.saveDockerContainerInformation()
        this.initDockerContainerLoadBalancer()
    }

    public static readDockerComposeFile(): void {
        this.dockerComposeFile = yaml.load(readFileSync(join(__dirname, this.pathToDockerComposeFile), 'utf8'),) as Record<string, any>
    }

    public static saveDockerContainerInformation(): void {
        for (let key in this.dockerComposeFile.services) {
            const language = this.getLanguageFromContainerInformation(this.dockerComposeFile.services[key]['environment'])
            const port = this.getPortFromContainerInformation(this.dockerComposeFile.services[key]['ports'])
            const containerName = this.dockerComposeFile.services[key]['container_name']
            this.addToDockerContainerMap(new DockerContainerInformation(port, containerName, language))
        }
    }

    private static getLanguageFromContainerInformation(languageArray: Array<string>): string {
        return languageArray[0].split("=")[1]
    }

    private static getPortFromContainerInformation(portsArray: Array<string>): number {
        return Number(portsArray[0].split(":")[0])
    }

    private static addToDockerContainerMap(dockerContainerInformation: DockerContainerInformation): void {
        if (this.doesContainerForLanguageAlreadyExist(dockerContainerInformation.language)) {
            this.dockerContainerMap.get(dockerContainerInformation.language).push(dockerContainerInformation)
        } else {
            let dockerContainerInformationArray = new Array<DockerContainerInformation>()
            dockerContainerInformationArray.push(dockerContainerInformation)
            this.dockerContainerMap.set(dockerContainerInformation.language, dockerContainerInformationArray)
        }
    }

    private static doesContainerForLanguageAlreadyExist(language: string): boolean {
        return this.dockerContainerMap.has(language)
    }

    public static initDockerContainerLoadBalancer(): void {
        this.dockerContainerLoadBalancer = new DockerContainerLoadBalancer(this.dockerContainerMap)
    }

    public static async sendRequest(language: string, functionDefintion: string, functionCall: string): Promise<CodeRunnerReturn> {
        let containerInformation = this.dockerContainerLoadBalancer.getContainerForLanguage(language)
        let numberOfTrys = 0;
        while (!(await this.isContainerHealthy(containerInformation))) {
            this.restartContainer(containerInformation)
            containerInformation = this.dockerContainerLoadBalancer.getContainerForLanguage(language)
            numberOfTrys++
            if (numberOfTrys > 9) {
                let codeRunnerReturn = new CodeRunnerReturn()
                codeRunnerReturn.returnValue = ''
                codeRunnerReturn.errorOutput = 'Internal Error'
                return codeRunnerReturn
            }
        }
        const codeRunnerCaller = new CodeRunnerCaller(containerInformation.port)
        return codeRunnerCaller.callCodeRunner(functionCall, functionDefintion)
    }

    private static async isContainerHealthy(containerInformation: DockerContainerInformation): Promise<boolean> {
        let response: any

        const instance = axios.create({
            baseURL: 'http://localhost:' + containerInformation.port,
            timeout: 500,
            headers: { 'Content-Type': 'text/html; charset=UTF-8' },
        })
        try {
            response = await instance.get('checkHealth')
        } catch (error) {
            return false
        }
        return response.status === 200
    }

    private static restartContainer(containerInformation: DockerContainerInformation): void {
        if (this.dockerContainerRestartMap.has(containerInformation.containerName)) {
            const lastRestart = this.dockerContainerRestartMap.get(containerInformation.containerName)
            if (this.isOlderThanThreeSeconds(lastRestart)) {
                spawn('docker', ['restart', containerInformation.containerName]);
            }
        } else {
            spawn('docker', ['restart', containerInformation.containerName]);
            this.dockerContainerRestartMap.set(containerInformation.containerName, Date.now())
        }
    }

    private static isOlderThanThreeSeconds(timestamp: number): boolean {
        return (Date.now() - timestamp) > 3000
    }
}