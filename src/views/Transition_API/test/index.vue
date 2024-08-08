<template>
  <div
    class="transition-api"
    :class="selectIndex !== -1 ? 'popup-visible' : ''"
  >
    <div id="content" class="content">
      <div
        class="list-item"
        v-for="(item, index) in Options"
        :key="index"
        :style="
          selectIndex === index
            ? { viewTransitionName: 'popup-transition' }
            : null
        "
        @click="handleClick(index)"
      >
        <div class="list-icon">
          <img class="list-icon-image" :src="item.icon" />
        </div>
        <div class="list-name">
          <div class="key">Name:</div>
          <div class="value">{{ item.name }}</div>
        </div>
        <div class="list-type">
          <div class="key">Type:</div>
          <div class="value">{{ item.type }}</div>
        </div>
        <div class="list-version">
          <div class="key">Vue:</div>
          <div class="value">{{ item.version }}</div>
        </div>
        <div class="list-docs">
          <div class="key">Docs:</div>
          <div class="value">{{ item.docs }}</div>
        </div>

        <div class="list-line"></div>
        <div class="list-stars">{{ item.stars }}</div>
      </div>
    </div>

    <div
      class="popup"
      :style="{
        background: `linear-gradient(${Options[selectIndex]?.backgroundColor}, ${Options[selectIndex]?.backgroundColor})`,
      }"
    >
      <div id="close" class="close" @click="closePopup">×</div>
      <div class="list-icon">
        <img
          id="list-icon-image"
          class="list-icon-image"
          :src="Options[selectIndex]?.icon"
        />
      </div>
      <div class="list-name">
        <div class="key">Name:</div>
        <div id="list-name-value" class="value">
          {{ Options[selectIndex]?.name }}
        </div>
      </div>
      <div class="list-type">
        <div class="key">Type:</div>
        <div id="list-type-value" class="value">
          {{ Options[selectIndex]?.type }}
        </div>
      </div>
      <div class="list-version">
        <div class="key">Vue:</div>
        <div id="list-version-value" class="value">
          {{ Options[selectIndex]?.version }}
        </div>
      </div>
      <div class="list-docs">
        <div class="key">Docs:</div>
        <div id="list-docs-value" class="value">
          {{ Options[selectIndex]?.docs }}
        </div>
      </div>
      <div class="list-descript">
        <div class="key">Info:</div>
        <div id="list-descript-value" class="value">
          {{ Options[selectIndex]?.info }}
        </div>
      </div>

      <div id="list-line" class="list-line"></div>
      <div id="list-stars" class="list-stars">
        {{ Options[selectIndex]?.stars }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
const Options = [
  {
    icon: "https://linpengteng.github.io/resource/vue-library/ant-design-vue.svg",
    name: "Ant-Design-Vue",
    type: "Desktop",
    version: "Vue3.x",
    backgroundColor: "#e5cdff",
    docs: "https://antdv.com/docs/vue/introduce-cn",
    info: "Following the Ant Design specification, we developed a Vue UI library antd for building rich interactive user interfaces.",
    stars: "★★★★★",
  },
  {
    icon: "https://linpengteng.github.io/resource/vue-library/varlet.png",
    name: "Varlet",
    type: "Mobile",
    version: "Vue3.x",
    backgroundColor: "#e6c796",
    docs: "https://varlet.gitee.io/varlet-ui/#/zh-CN/index",
    info: "Varlet is a Material design mobile component library developed based on Vue3 by partners in the community.",
    stars: "★★★★",
  },
  {
    icon: "https://linpengteng.github.io/resource/vue-library/vant.png",
    name: "Vant",
    type: "Mobile",
    version: "Vue3.x",
    backgroundColor: "#85ccd5",
    docs: "https://vant-ui.github.io/vant/#/zh-CN",
    info: "A lightweight, customizable Vue UI library for mobile web apps.",
    stars: "★★★★★",
  },
];

const selectIndex = ref(-1);

const handleClick = (index: number) => {
  // @ts-ignore
  document.startViewTransition(() => {
    selectIndex.value = index;
  });
};

const closePopup = () => {
  // @ts-ignore
  document.startViewTransition(() => {
    selectIndex.value = -1;
  });
};
</script>

<style scoped lang="scss">
::view-transition-image-pair(root) {
  isolation: auto;
}

::view-transition-image-pair(popup-transition) {
  isolation: auto;
}

::view-transition-old(popup-transition),
::view-transition-new(popup-transition) {
  animation-duration: 0.15s;
}

.transition-api {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding: 5px 35px 0;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  user-select: none;
}

.content {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 960px;
  margin: 20px auto 0;
  position: relative;
  overflow: auto;
  contain: paint;

  .list-item {
    flex: 0 0 auto;
    width: calc(33.3% - 30px);
    min-width: 192px;
    max-width: 250px;
    padding: 15px 0 10px;
    margin: 5px 15px 15px;
    background-color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease;
    transform-origin: 20% 45%;
    &::marker {
      content: none;
    }
    .light & {
      box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.35);
    }

    .dark & {
      box-shadow: 3px 3px 8px rgba(255, 255, 255, 0.35);
    }

    &:nth-child(1) {
      background-color: #e5cdff;
    }

    &:nth-child(2) {
      background-color: #e6c796;
    }

    &:nth-child(3) {
      background-color: #85ccd5;
    }

    .list-icon {
      width: 44px;
      height: 44px;
      padding: 5px;
      margin: 0 0 15px 12px;
      box-sizing: border-box;
      background-color: #ffffff;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .list-name,
    .list-version,
    .list-type,
    .list-docs {
      display: flex;
      flex-flow: row nowrap;
      width: 100%;
      padding: 0 15px;
      line-height: 1.2;
      box-sizing: border-box;

      .key {
        flex: 0 0 auto;
        width: 54px;
        padding: 3px 0;
        font-size: 14px;
        font-weight: bold;
      }

      .value {
        flex: 1 1 auto;
        font-size: 13px;
        padding: 3px 0;
        font-weight: normal;
        white-space: normal;
        word-break: break-all;
        word-wrap: break-word;
      }
    }

    .list-line {
      margin: 12px 0 7px;
      border-top: dashed 1px #f9f9f9;
    }

    .list-stars {
      padding-right: 8px;
      text-align: right;
      letter-spacing: 5px;
      color: #ff9800;
    }
  }

  .list-item:hover {
    transform: translateY(3px) scale(1.03) rotate(5deg);
  }
}

.popup {
  display: none;
  width: 52%;
  min-width: 280px;
  max-width: 455px;
  padding: 20px 0 14px;
  margin: 20px auto 0;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  view-transition-name: popup-transition;

  .light & {
    box-shadow: 3px 2px 5px rgba(0, 0, 0, 0.35);
  }

  .dark & {
    box-shadow: 3px 2px 5px rgba(255, 255, 255, 0.35);
  }

  .close {
    width: 24px;
    height: 24px;
    padding: 5px;
    color: #606266;
    font-size: 20px;
    line-height: 11px;
    text-align: center;
    background-color: #ffffff;
    box-sizing: border-box;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: -11px;
    left: -11px;
  }

  .list-icon {
    width: 72px;
    height: 72px;
    padding: 8px;
    margin: 0 0 18px 22px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .list-name,
  .list-version,
  .list-type,
  .list-docs,
  .list-descript {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    padding: 0 30px;
    line-height: 1.2;
    box-sizing: border-box;

    .key {
      flex: 0 0 auto;
      width: 64px;
      padding: 5px 0;
      font-size: 16px;
      font-weight: bold;
    }

    .value {
      flex: 1 1 auto;
      font-size: 15px;
      padding: 5px 0;
      font-weight: normal;
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;
    }
  }

  .list-line {
    margin: 20px 0 10px;
    border-top: dashed 1px #f9f9f9;
  }

  .list-stars {
    font-size: 18px;
    padding-right: 12px;
    text-align: right;
    letter-spacing: 5px;
    color: #ff9800;
  }
}

.popup-visible {
  .content {
    display: none;
  }

  .popup {
    display: block;
  }
}
</style>
