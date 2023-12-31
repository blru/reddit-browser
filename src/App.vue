<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { debounce, fetchPosts } from "./utilities";
import RedditPost from "@/components/RedditPost.vue";
import SearchBar from "@/components/SearchBar.vue";
import TimelySelector from "./components/TimelySelector.vue";
import { useIntersectionObserver, useUrlSearchParams } from "@vueuse/core";

const params = useUrlSearchParams("history");

const query = ref(params.q?.toString() ?? "");
const timelyQuery = ref(params.t?.toString() ?? "day");
const searchResults = ref<any[]>([]);
const postRefs = ref([]);
const lastPost = computed(() => postRefs.value[postRefs.value.length - 1]);

const { stop } = useIntersectionObserver(
    lastPost,
    ([{ isIntersecting }]) => isIntersecting && getMorePosts(),
    { threshold: 0 }
);

async function getMorePosts() {
    const currentSearchResults = searchResults.value;

    const morePosts = await fetchPosts(
        query.value,
        timelyQuery.value,
        currentSearchResults[currentSearchResults.length - 1]?.name
    );

    searchResults.value = [...searchResults.value, ...morePosts];
}

watch(
    [query, timelyQuery],
    debounce(1000, async (newQuery, oldQuery) => {
        if (!newQuery) return;

        // handle u/
        if (query.value.startsWith("u/"))
            query.value = "user" + query.value.slice(1);

        params.q = query.value;
        params.t = timelyQuery.value;

        searchResults.value = await fetchPosts(query.value, timelyQuery.value);
    }),
    { immediate: true }
);
</script>

<template>
    <div class="view-container">
        <div class="query-container">
            <SearchBar v-model="query" />
            <TimelySelector v-model="timelyQuery" />
        </div>
        <TransitionGroup tag="div" name="post" class="post-container">
            <RedditPost
                v-for="(result, index) in searchResults"
                ref="postRefs"
                :key="result?.id"
                :data-index="index"
                :data="result"
            />
        </TransitionGroup>
        <p v-if="searchResults.length === 0">No search results</p>
        <p v-else>Loading...</p>
    </div>
</template>

<style scoped>
.view-container,
.post-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: nowrap;
    flex-grow: 1;
}

.query-container {
    width: min(95vw, 50rem);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.post-enter-active {
    animation: fade-move-in 0.3s;
}
.post-leave-active {
    animation: fade-move-in 0.3s reverse;
}
@keyframes fade-move-in {
    0% {
        transform: translateY(-1rem);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
