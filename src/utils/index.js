/**
 * 计算斜边角度
 * @param {number} width - 矩形宽度
 * @param {number} height - 矩形高度
 * @returns {number} 斜边角度（单位：度）
 */
export function getAngle(width, height) {
  const radians = Math.atan(height / (width * 0.4));
  const degrees = radians * (180 / Math.PI);
  return degrees;
}

/**
 * 根据Y坐标计算X坐标
 * @param {number} y - 屏幕纵坐标
 * @param {number} angle - 直角三角形斜边与底边的夹角（单位：度）
 * @param {Object} screenData - 屏幕数据（可选，包含screenWidth和screenHeight）
 * @returns {Object} 计算出的坐标 {x, y}
 */
export function getXYByY(y, angle, screenData = {}) {
  const screenWidth = screenData.screenWidth || window.innerWidth;
  const screenHeight = screenData.screenHeight || window.innerHeight;
  // 以屏幕中心为顶点
  const centerX =
    screenData.centerX !== undefined ? screenData.centerX : screenWidth / 2;
  const centerY =
    screenData.centerY !== undefined ? screenData.centerY : screenHeight / 2;

  if (y === centerY) {
    return { x: centerX, y };
  }

  // 计算斜边角度
  const tanValue = Math.tan(angle * (Math.PI / 180));

  // 计算底边长度
  const baseWidth = (centerY - y) / tanValue;

  // 计算X坐标
  const x = centerX + baseWidth;
  return { x, y };
}

/**
 * 计算路径
 * @param {number} angle - 直角三角形斜边与底边的夹角（单位：度）
 * @param {number} offsetX - 水平偏移量（可选，默认值为0）
 * @param {Object} screenData - 屏幕数据（可选，包含screenWidth、screenHeight、centerX、centerY和svgI）
 * @returns {string} 计算出的路径
 */
export function getOffsetPath(angle, offsetX = 0, screenData = {}) {
  // 优先使用外部传入的屏幕数据，避免重复查询 DOM
  const screenHeight = screenData.screenHeight || window.innerHeight;
  const centerY =
    screenData.centerY !== undefined ? screenData.centerY : screenHeight / 2;
  const svgI = screenData.svgI || document.querySelector(".svg-box .letter-i");
  const svgISize = svgI.getBoundingClientRect();

  // 计算开始位置
  const begin = getXYByY(screenHeight, angle, screenData);
  // 计算直线终点
  const lineEnd = getXYByY(centerY - svgISize.height * 2, angle, screenData);
  // 计算曲线控制点1
  const turn1 = { x: lineEnd.x * 1.7, y: -150 };
  // 计算曲线控制点2
  const turn2 = { x: svgISize.left - 20, y: centerY / 10 };
  // 计算曲线终点
  const turn = { x: svgISize.left, y: centerY - svgISize.height };
  // 计算终点
  const end = { x: svgISize.left, y: svgISize.top };

  return `
    M${begin.x + offsetX} ${begin.y} 
    L${lineEnd.x} ${lineEnd.y}
    C${turn1.x} ${turn1.y} ${turn2.x} ${turn2.y} ${turn.x} ${turn.y}
    L${end.x} ${end.y + svgISize.height / 2}
  `.replace(/\n+/g, "");
}
