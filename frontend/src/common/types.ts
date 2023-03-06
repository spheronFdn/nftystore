export interface IUploadFilePayloadDto {
  images: File[];
  metadata: File[];
}

export interface IUploadResponse {
  uploadId: string;
  fileNames: string[];
  baseUrl: string;
  spheronUrl: string;
}

export interface IUploadMetadataResponse {
  spheronUrl: string;
  uploadId: string;
  url: string;
}
