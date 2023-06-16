<script setup lang="ts">
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
    <select
        class="timely-selector"
        :value="modelValue"
        @input="
            $emit(
                'update:modelValue',
                ($event.target as HTMLInputElement)?.value
            )
        "
    >
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
        <option value="month">Monthly</option>
        <option value="year">Yearly</option>
        <option value="all">All</option>
    </select>
</template>

<style scoped lang="scss">
.timely-selector {
    flex: 1;
}
</style>
