<script setup lang="ts">
import { ref } from "vue";
import Hls from "hls.js";
import { onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

const props = defineProps<{ url: string; fallbackUrl: string }>();
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
    hls.loadSource(props.url);
    hls.attachMedia(video.value);
});
</script>

<template>
    <video class="video" controls ref="video" playsinline>
        <source v-if="!isHlsSupported" :src="fallbackUrl" type="video/mp4" />
        <b>Your browser does not support videos.</b>
    </video>
</template>

<style scoped>
.video {
    max-width: 100%;
    min-width: min(100%, 30rem);
    object-fit: stretch;
    border-radius: 0.5rem;
}
</style>
