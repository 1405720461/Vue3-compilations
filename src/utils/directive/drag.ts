import type { DirectiveBinding } from "vue";

type Vector = [number, number]; //向量
type DragRange = [number, number, number, number]; //拖拽范围

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<HTMLElement | null>) {
    // 确定外部元素（参照元素）
    let outerElement: HTMLElement = document.body; // 默认为body

    if (binding.value) {
      // 尝试获取由binding.arg指定的元素
      outerElement = document.querySelector(
        binding.value as any
      ) as HTMLElement;
      if (!outerElement) {
        // 如果找不到，则使用body作为参照元素
        outerElement = document.body;
      }
    }
    // 用于向量加法
    const addV = (v1: Vector, v2: Vector): Vector => {
      return [v1[0] + v2[0], v1[1] + v2[1]];
    };
    // 用于向量减法
    const minusV = (v1: Vector, v2: Vector): Vector => {
      return [v2[0] - v1[0], v2[1] - v1[1]];
    };
    // 用于格式化向量，确保它在指定的范围内
    const formatV = (v: Vector, range: DragRange): Vector => {
      let x = v[0];
      let y = v[1];
      x = Math.max(x, range[2]); // x 坐标的最小值
      x = Math.min(x, range[3]); // x 坐标的最大值
      y = Math.max(y, range[0]); // y 坐标的最小值
      y = Math.min(y, range[1]); // y 坐标的最大值
      return [x, y];
    };
    // 用于设置元素的 transform 属性，实现平移
    const setTranslatePosition = (transform: string, v: Vector) => {
      return `${transform} translate(${v[0]}px, ${v[1]}px)`;
    };
    // 用于获取鼠标或触摸事件的坐标位置
    const getPosition = (e: MouseEvent | TouchEvent): Vector => {
      if (e instanceof MouseEvent) {
        return [e.pageX, e.pageY];
      }
      const touch = e.touches[0];
      return [touch.pageX, touch.pageY];
    };

    // 用于启用元素的拖拽功能
    const enableDrag = (element: HTMLElement, outerElement: HTMLElement) => {
      let innerElement = element;
      // 存储初始 transform 属性值
      let startTransform = window.getComputedStyle(element).transform;
      // 存储拖拽开始和结束的位置
      let startPosition: Vector | null = null;
      let endPosition: Vector | null = null;
      // 存储拖拽移动向量的允许范围
      let draggingMoveVectorRange: DragRange | null = null;
      // 存储拖拽过程中的移动向量
      let draggedMoveVector: Vector = [0, 0];
      // 存储当前拖拽的移动向量
      let draggingMoveVector: Vector = [0, 0];
      // 定义鼠标按下时的事件处理函数
      const onMouseDown = (e: MouseEvent | TouchEvent) => {
        e.stopPropagation(); // 阻止事件冒泡
        startPosition = getPosition(e); // 记录起始位置
        // 如果外部元素和当前元素存在，计算拖拽范围
        if (outerElement && element) {
          // Element.getBoundingClientRect()方法，返回一个DOMRect对象
          const outerElementRect = outerElement.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          draggingMoveVectorRange = [
            outerElementRect.top - elementRect.top,
            outerElementRect.bottom - elementRect.bottom,
            outerElementRect.left - elementRect.left,
            outerElementRect.right - elementRect.right,
          ];
        }
      };
      // 定义鼠标移动时的事件处理函数
      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        // 如果起始位置和拖拽范围已记录，执行拖拽逻辑
        if (startPosition && draggingMoveVectorRange) {
          endPosition = getPosition(e); // 记录当前位置
          // 计算当前移动向量，并格式化以确保在允许范围内
          const currentMoveVector = formatV(
            minusV(startPosition, endPosition),
            draggingMoveVectorRange
          );
          // 更新拖拽过程中的移动向量
          draggingMoveVector = addV(draggedMoveVector, currentMoveVector);
          // 更新元素的 transform 属性以实现拖拽效果
          element.style.transform = setTranslatePosition(
            startTransform,
            draggingMoveVector
          );
        }
      };
      // 定义鼠标松开时的事件处理函数
      const onMouseUp = (e: MouseEvent | TouchEvent) => {
        // 如果起始位置和拖拽范围已记录，更新拖拽后的移动向量
        if (startPosition && draggingMoveVectorRange) {
          draggedMoveVector = draggingMoveVector;
        }
        startPosition = null; // 重置起始位置
      };
      // 定义添加事件监听器的函数
      const addEventListener = () => {
        if (innerElement) {
          innerElement.addEventListener("mousedown", onMouseDown);
          document.addEventListener("mousemove", onMouseMove);
          document.addEventListener("mouseup", onMouseUp);
        }
      };
      // 定义移除事件监听器的函数
      const removeEventListener = () => {
        if (innerElement) {
          innerElement.removeEventListener("mousedown", onMouseDown);
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        }
      };
      // 添加事件监听器
      addEventListener();
      // 返回一个函数，用于在需要时移除事件监听器
      return removeEventListener;
    };
    // 调用 enableDrag 函数，为当前元素启用拖拽功能
    enableDrag(el, outerElement);
  },
  // 这指令绑定的元素从 DOM 中移除时
  unmounted(el: HTMLElement, binding: DirectiveBinding) {
    // 清理逻辑，移除事件监听器
    const removeEventListener = binding.oldValue;
    if (removeEventListener) {
      removeEventListener();
    }
  },
};

//   <!-- 默认拖拽参照为body -->
//   <div v-drag>拖拽元素</div>

//   <!-- 指定参照元素为id为"container"的元素 -->
//   <div v-drag="'#container'">拖拽元素相对于容器</div>
