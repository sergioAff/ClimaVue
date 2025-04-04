export interface IRequiredQueryBg {
  query: string;
}

export interface IExecuteResponse {
  photos: IPhoto[];
}

export interface IPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: IPhotoSrc;
  liked: boolean;
  alt: string;
}

interface IPhotoSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}
