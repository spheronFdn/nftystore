export interface NftMetadataRequest {
  description: string;
  name: string;
  image: string;
  attributes: Attribure[];
}

export interface Attribure {
  trait_type: string;
  display_type?: string;
  value: any;
}
