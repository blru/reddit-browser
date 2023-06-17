<script setup lang="ts">
import { ref } from "vue";
import Hls from "hls.js";
import { onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import type { VideoData } from "@/interfaces";

const props = defineProps<{ data: VideoData }>();
const video = ref<HTMLVideoElement>();
const isHlsSupported = Hls.isSupported();

async function onIntersectionChange(isIntersecting: boolean) {
    if (isIntersecting && isHlsSupported && !video?.value?.src && video.value) {
        const hls = new Hls({
            backBufferLength: 10,
            maxBufferSize: 1,
            maxBufferLength: 10,
        });
        hls.loadSource(props.data?.hlsUrl);
        hls.attachMedia(video.value);
    }

    try {
        if (isIntersecting) await video.value?.play();
        else await video.value?.pause();
    } catch (err) {}
}

const { stop } = useIntersectionObserver(
    video,
    ([{ isIntersecting }]) => onIntersectionChange(isIntersecting),
    { threshold: 0.9 }
);
</script>

<template>
    <video
        :width="data?.width"
        :height="data?.height"
        class="video"
        controls
        ref="video"
        playsinline
        preload="none"
        :poster="props.data?.posterUrl"
    >
        <source
            v-if="!isHlsSupported"
            :src="data?.fallbackUrl"
            type="video/mp4"
        />
        <b>Your browser does not support videos.</b>
    </video>
</template>

<style scoped>
.video {
    width: auto;
    height: auto;
    max-height: 90vh;
    max-width: 100%;
    border-radius: 0.5rem;
}
</style>
