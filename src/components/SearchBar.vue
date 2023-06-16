<script setup lang="ts">
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
    <input
        class="search-bar"
        type="text"
        :value="modelValue"
        @input="
            $emit(
                'update:modelValue',
                ($event.target as HTMLInputElement)?.value
            )
        "
        placeholder="r/all"
    />
</template>

<style scoped lang="scss">
.search-bar {
    flex: 3;
    &::placeholder {
        color: var(--text-placeholder);
    }
}
</style>
