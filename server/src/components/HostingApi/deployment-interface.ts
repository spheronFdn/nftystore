import { IProject } from "./project-interface";

export default interface IDeployment {
  _id: string;
  project: IProject;
}

export enum DeploymentStatusEnum {
  DEPLOYED = "Deployed",
  FAILED = "Failed",
}
