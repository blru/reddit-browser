import type { BaseMediaData } from "./base-media";

export interface VideoData extends BaseMediaData {
    hlsUrl: string;
    fallbackUrl: string;
    posterUrl?: string;
}
