<script setup lang="ts">
import { computed, ref } from "vue";
import { relativeTime, decodeHTMLEntities } from "@/utilities/index";
import VideoPlayer from "@/components/VideoPlayer.vue";
import ImageGallery from "./ImageGallery.vue";
import {
    type ImageData,
    type GalleryImageData,
    type VideoData,
} from "@/interfaces";

const props = defineProps<{ data: any }>();

// used
const formattedDate = computed(() =>
    relativeTime(Math.abs(props.data?.created_utc - Date.now() / 1000))
);
const isTextOnly = computed(() => props.data?.is_self);
const isText = computed(() => props.data?.selftext?.length !== 0);
const isVideo = computed(() => props.data?.is_video);
const isGif = computed(() => props.data?.preview?.reddit_video_preview?.is_gif);
const isGallery = computed(() => props.data?.is_gallery);
const url = computed(() => "http:\/\/reddit.com" + props.data?.permalink);
const image = computed<ImageData>(() => {
    const imageData = props.data?.preview?.images[0]?.source;

    return {
        width: imageData?.width,
        height: imageData?.height,
        url: decodeHTMLEntities(imageData?.url),
    };
});
const video = computed<VideoData>(() => {
    const videoData = isVideo.value
        ? props.data?.media?.reddit_video
        : props.data?.preview?.reddit_video_preview;

    return {
        hlsUrl: videoData?.hls_url,
        fallbackUrl: videoData?.fallback_url,
        width: videoData?.width,
        height: videoData?.height,
    };
});
const galleryImages = computed<GalleryImageData[]>(() => {
    if (!isGallery) return [];

    return (
        props.data?.gallery_data?.items?.map((image: any) => {
            const imageData = props.data?.media_metadata[image?.media_id]?.s;

            return {
                caption: image?.caption,
                url: decodeHTMLEntities(imageData?.u),
                height: imageData?.y,
                width: imageData?.x,
                id: image?.media_id,
            };
        }) ?? []
    );
});
const title = computed(() => decodeHTMLEntities(props.data?.title));
const content = computed(() => decodeHTMLEntities(props.data?.selftext_html));
const subredditName = computed(() => props.data?.subreddit);
const authorName = computed(() => props.data?.author);
const score = computed(() => props.data?.score);
const numberOfComments = computed(() => props.data?.num_comments);
</script>

<template>
    <div class="post">
        <div class="mini-info-container">
            <span class="subreddit-name text-small">r/{{ subredditName }}</span>
            <span class="author-name text-small">
                Posted by u/{{ authorName }} {{ formattedDate }}
            </span>
        </div>
        <h3 class="title">
            <a :href="url" target="_blank">{{ title }}</a>
        </h3>
        <p v-if="isText" class="content md" v-html="content"></p>
        <VideoPlayer v-if="isVideo || isGif" :data="video" />
        <ImageGallery v-else-if="isGallery" :galleryImages="galleryImages" />
        <a v-else-if="image != undefined" :href="image?.url" target="_blank">
            <img
                :src="image?.url"
                :width="image?.width"
                :height="image?.height"
                class="image"
                alt="Post image"
            />
        </a>
        <div class="stats-container">
            <span class="score">
                <font-awesome-icon icon="fa-regular fa-heart" />
                {{ score }}
            </span>
            <span class="number-of-comments">
                <font-awesome-icon icon="fa-regular fa-comments" />
                {{ numberOfComments }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.post {
    container-type: inline-size;
    width: min(95vw, 50rem);
    background-color: var(--secondary-background);
    border-radius: 0.5em;
    padding: 1rem 2rem;
    border: 1px solid var(--outline-primary);

    .mini-info-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;

        .subreddit-name {
            font-weight: 700;
        }

        .author-name {
            color: var(--text-tertiary);
        }
    }

    .stats-container {
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        gap: 1.25rem;

        span {
            color: var(--text-tertiary);
            font-weight: 500;
        }
    }

    .title {
        margin: 0.5rem 0 1rem;

        a {
            color: var(--accent);
            text-decoration: none;
        }
    }

    .content {
        color: var(--text-primary);
    }

    .image {
        width: auto;
        height: auto;
        max-height: min(90vh, 40rem);
        max-width: 100%;
        border-radius: 0.5rem;
    }
}

@container (max-width: 600px) {
    .post {
        .title {
            font-size: 1.5em;
        }
    }
}
</style>
