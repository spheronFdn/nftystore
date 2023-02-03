import { IProject } from "./project-interface";

export default interface IDeployment {
  _id: string;
  project: IProject;
  protocol: string;
  status: DeploymentStatusEnum;
}

export enum DeploymentStatusEnum {
  PRE_QUEUE = "PreQueue",
  QUEUED = "Queued",
  PENDING = "Pending",
  CANCELED = "Canceled",
  DEPLOYED = "Deployed",
  FAILED = "Failed",
  AUTHORIZATION_NEEDED = "AuthorizationNeeded",
  KILLING = "Killing",
  TIMED_OUT = "TimedOut",
}
