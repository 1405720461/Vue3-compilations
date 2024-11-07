<template>
  <div class="flex justify-center items-center w-full select-none">
    <ul
      class="flex flex-wrap justify-evenly gap-[40px] w-full max-w-screen-lg relative"
      v-show="!cardVisible"
    >
      <li
        class="px-0 py-[15px] min-w-[192px] w-[30%] rounded-lg cursor-pointer transition-transform duration-200 ease-in-out origin-[20%_45%] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] dark:shadow-[3px_3px_8px_rgba(255,255,255,0.3)] hover:translate-y-[3px] hover:scale-[1.03] hover:-rotate-3"
        v-for="(item, index) in Options"
        :key="index"
        :style="{
          ...(selectIndex === index
            ? { viewTransitionName: 'popup-transition' }
            : null),
          backgroundColor: item.backgroundColor,
        }"
        @click="handleClick(index)"
      >
        <div
          class="w-[44px] h-[44px] p-[5px] mb-[15px] ml-[12px] bg-white dark:bg-slate-700 rounded-full"
        >
          <img class="w-full h-full" :src="item.icon" />
        </div>
        <div
          class="flex flex-nowrap px-[15px] leading-normal"
          v-for="(value, key) in item.property"
          :key="key"
          :class="key === 'Info' ? 'hidden' : ''"
        >
          <div
            class="flex-[0_0_auto] w-[54px] px-[3px] text-[14px] font-bold dark:drop-shadow-[3px_3px_5px_rgba(0,0,0,0.5)]"
          >
            {{ key }}:
          </div>
          <div
            class="flex-auto text-[13px] px-[3px] whitespace-normal break-all dark:drop-shadow-[3px_3px_5px_rgba(0,0,0,0.5)]"
          >
            {{ value }}
          </div>
        </div>
        <div
          class="my-[7px] border-t-[1px] border-dashed border-[#f9f9f9]"
        ></div>
        <div class="mr-[8px] text-right tracking-[5px] text-[#ff9800]">
          {{ item.stars }}
        </div>
      </li>
    </ul>
    <Card v-show="cardVisible" :option="option" @close="closePopup"> </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "../common/Card.vue";
import Options from "../common/Options.json";

const selectIndex = ref(-1);
const cardVisible = ref(false);
const option = ref({});

//选中卡片
const handleClick = (index: number) => {
  selectIndex.value = index;
  option.value = Options[index];
  // @ts-ignore
  const transition = document.startViewTransition(() => {
    cardVisible.value = true;
  });
};

//关闭卡片
const closePopup = () => {
  // @ts-ignore
  const transition = document.startViewTransition(() => {
    cardVisible.value = false;
  });
  transition.finished.then(() => {
    selectIndex.value = -1;
    option.value = {};
  });
};
</script>

<style scoped>
::view-transition-image-pair(root) {
  isolation: auto;
}

::view-transition-image-pair(popup-transition) {
  isolation: auto;
}

::view-transition-old(popup-transition),
::view-transition-new(popup-transition) {
  animation-duration: 0.1s;
}
</style>

<style scoped lang="scss"></style>
