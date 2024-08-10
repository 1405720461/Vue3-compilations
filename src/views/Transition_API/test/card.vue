<template>
  <div
    class="popup w-[54%] min-w-[80px] max-w-[465px] relative rounded-lg pt-[20px] pb-[14px] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] dark:shadow-[3px_3px_8px_rgba(255,255,255,0.3)]"
    v-show="cardVisible"
    :style="{
      background: `linear-gradient(${option?.backgroundColor}, ${option?.backgroundColor})`,
    }"
    @click="closePopup"
  >
    <div
      class="w-[72px] h-[72px] p-[8px] mb-[18px] ml-[22px] bg-white dark:bg-slate-700 rounded-full"
    >
      <img class="w-full h-full" :src="option?.icon" />
    </div>
    <div
      class="list-name flex flex-nowrap px-[30px] leading-tight"
      v-for="(value, key) in option?.property"
      :key="key"
    >
      <div class="flex-[0_0_auto] w-[64px] px-[5px] text-[16px] font-bold">
        {{ key }}:
      </div>
      <div class="flex-auto text-[15px] px-[5px] whitespace-normal break-all">
        {{ value }}
      </div>
    </div>

    <div
      class="mt-[20px] mb-[10px] border-t-[1px] border-dashed border-[#f9f9f9]"
    ></div>
    <div class="text-[18px] mr-[12px] text-right tracking-[5px] text-[#ff9800]">
      {{ option?.stars }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cardVisible: Boolean,
  option: Object,
});
const emit = defineEmits(["close"]);

const closePopup = () => {
  emit("close");
};
</script>

<style scoped lang="scss">
.popup {
  view-transition-name: popup-transition;
}
</style>
