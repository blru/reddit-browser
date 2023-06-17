<script setup lang="ts">
import { computed, ref } from "vue";
import { type GalleryImageData } from "@/interfaces/index";

const props = defineProps<{ galleryImages: GalleryImageData[] }>();
const selectedIndex = ref(0);
const selectedImage = computed(() => props.galleryImages[selectedIndex.value]);
const hasReachedEnd = computed(
    () => selectedIndex.value === props.galleryImages.length - 1
);

function cycleNext() {
    if (!hasReachedEnd.value) selectedIndex.value++;
}

function cyclePrevious() {
    if (selectedIndex.value !== 0) selectedIndex.value--;
}
</script>

<template>
    <div class="gallery">
        <div class="overlay">
            <button
                @click="cyclePrevious"
                class="cycle-button"
                :disabled="selectedIndex === 0"
            >
                <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>
            <button
                @click="cycleNext"
                class="cycle-button"
                :disabled="hasReachedEnd"
            >
                <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </button>
        </div>
        <figure>
            <img
                :src="selectedImage.url"
                alt="Gallery Image"
                :width="selectedImage?.width"
                :height="selectedImage?.height"
            />
            <figcaption>{{ selectedImage.caption }}</figcaption>
        </figure>
    </div>
</template>

<style scoped lang="scss">
.gallery {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;

    .overlay {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        padding: 2rem;
        align-items: center;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: transparent;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
    }

    figure {
        position: relative;
        margin: 0;

        img {
            width: auto;
            height: auto;
            max-height: 90vh;
            max-width: 100%;
            border-radius: 0.5rem;
        }

        figcaption {
            font-size: 1rem;
            position: absolute;
            bottom: 0.25rem;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.85);
            width: 100%;
            text-align: center;
            padding: 0.25rem;
        }
    }

    .cycle-button {
        all: unset;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        width: 3rem;
        height: 3rem;
        color: var(--text-primary);
        background-color: var(--primary-background);
        transition: background-color 0.3s;
        border-radius: 100%;
        opacity: 0.7;

        &:hover:not(:disabled) {
            background-color: #000;
        }

        &:disabled {
            opacity: 0.5;
        }
    }
}
</style>
