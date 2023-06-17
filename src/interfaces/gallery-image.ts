import type { BaseMediaData } from "./base-media";

export interface GalleryImageData extends BaseMediaData {
    caption?: string;
    url: string;
    id: string;
}
