<script setup lang="ts">
import { ref } from "vue";
import Hls from "hls.js";
import { onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import type { VideoData } from "@/interfaces";

const props = defineProps<{ data: VideoData }>();
const video = ref<HTMLVideoElement>();
const isHlsSupported = Hls.isSupported();

const { stop } = useIntersectionObserver(
    video,
    ([{ isIntersecting }]) =>
        isIntersecting ? video.value?.play() : video.value?.pause(),
    { threshold: 0.9 }
);

onMounted(() => {
    if (!video.value) return;

    let hls = new Hls();
    hls.loadSource(props.data.hlsUrl);
    hls.attachMedia(video.value);
});
</script>

<template>
    <video
        :width="data?.width"
        :height="data?.height"
        class="video"
        controls
        ref="video"
        playsinline
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
    max-height: min(90vh, 40rem);
    max-width: 100%;
    border-radius: 0.5rem;
}
</style>
