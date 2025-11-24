import { app, beginAnimation } from "@js/index.js";
// 引入unocss
import "uno.css";

beginAnimation();

// 页面点击事件
document.addEventListener("click", () => {
  // app 是否包含animation-end 类名
  if (app.classList.contains("animation-end")) {
    beginAnimation();
  }
});
