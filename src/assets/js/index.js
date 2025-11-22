import { getOffsetPath } from "@utils/index.js";

// 定义动画配置常量
const ANIMATION_CONFIG = {
  CUBE_ANIMATION_DELAY: 750,
  SVG_BOX_ANIMATION_DELAY: 850,
  KNIFE_ANGLE: 45,
  CUBE_SCALE_FACTOR: 2,
};

export const init = () => {
  console.log("init");

  // 获取主要DOM元素，缓存引用减少DOM查询
  const app = document.querySelector("#app");
  const svgBox = document.querySelector(".svg-box");
  const svgI = document.querySelector(".svg-box .letter-i");
  const pageKnife = document.querySelector("#pageKnife");
  const pageCube = document.querySelector("#pageCube");
  const pageCubeAngle = document.querySelectorAll("#pageCube .page-cube-angle");

  // 获取屏幕和元素尺寸，避免重复计算
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const centerX = screenWidth / 2;
  const centerY = screenHeight / 2;
  const svgBoxSize = svgBox.getBoundingClientRect();
  const svgISize = svgI.getBoundingClientRect();
  const { width: svgBoxWidth, height: svgBoxHeight } = svgBoxSize;

  // 构建屏幕数据，避免在getOffsetPath中重复DOM查询
  const screenData = {
    screenWidth,
    screenHeight,
    centerX,
    centerY,
    svgI: svgI,
  };

  // 立方体尺寸计算
  const cubeWidth = svgBoxWidth / ANIMATION_CONFIG.CUBE_SCALE_FACTOR;
  const cubeHeight = svgBoxHeight / ANIMATION_CONFIG.CUBE_SCALE_FACTOR;

  // 设置初始状态的立方体
  pageCube.classList.add("shrink");
  pageCube.style.cssText = `
    width: ${cubeHeight}px;
    height: ${cubeHeight}px;
  `;
  pageCube.classList.add("active");

  // 计算路径
  const path = getOffsetPath(
    ANIMATION_CONFIG.KNIFE_ANGLE,
    svgISize.width / 2,
    screenData
  );
  console.log("路径:", path);

  // 设置页面刀片和路径
  pageKnife.style.cssText = `
    width: ${svgISize.width}px;
    height: ${svgISize.height}px;
    offset-path: path('${path}');
  `;
  pageKnife.classList.add("active");

  // 立方体展开动画
  setTimeout(() => {
    app.classList.add("active");
    pageCube.classList.remove("shrink");
    pageCube.classList.add("show");
    pageCube.style.cssText = `
      width: ${svgBoxWidth}px;
      height: ${svgBoxHeight}px;
    `;

    // 为所有立方体角添加样式
    pageCubeAngle.forEach((item) => {
      item.style.cssText = `
        width: ${cubeHeight}px;
        height: ${cubeHeight}px;
      `;
    });
  }, ANIMATION_CONFIG.CUBE_ANIMATION_DELAY);

  // SVG盒显示动画
  setTimeout(() => {
    app.classList.remove("active");
    svgBox.classList.add("show");
  }, ANIMATION_CONFIG.SVG_BOX_ANIMATION_DELAY);
};
