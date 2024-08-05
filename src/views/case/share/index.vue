<template>
  <input type="file" ref="fileInput" @change="handleFileChange" />
  <el-button @click="shareFile">
    <i-ep-Share />
  </el-button>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
import { ElMessage } from "element-plus";

const fileInput = ref(null);

let file = ref(null);

const handleFileChange = () => {
  // 确保 input 元素存在
  if (fileInput.value) {
    // 获取用户选择的文件
    file.value = fileInput.value.files[0];
  }
};

const shareFile = () => {
  console.log(file.value);
  if (!file.value) {
    return;
  }
  navigator
    .share({
      title: file.value.name,
      // text: "分享文件",
      // url: window.location.href,
      files: [file.value],
    })
    .then((res) => {
      ElMessage.success("分享成功");
      console.log(res);
    })
    .catch((err) => {
      ElMessage.error("分享失败");
      console.log(err);
    });
};
</script>
<style scoped lang="scss"></style>
