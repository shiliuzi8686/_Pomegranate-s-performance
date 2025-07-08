requestAnimationFrame
1. 为什么直接渲染大数据会卡？
假设我们有 10,000 条数据，如果一次性全部塞进 DOM：
```
const data = Array(10000).fill("我是数据项");  
const container = document.getElementById('list');  

data.forEach(item => {
  const div = document.createElement('div');
  div.textContent = item;
  container.appendChild(div);
});
```
问题来了：

JS 执行阻塞：一次性创建 10,000 个 DOM 节点，JS 引擎会卡住主线程。
渲染延迟：浏览器需要处理大量 DOM 插入，导致页面冻结，用户无法交互。
内存占用高：大量 DOM 节点堆积，内存飙升，甚至可能崩溃。

不能一次性渲染所有数据！

解决方案：分批渲染 + requestAnimationFrame
requestAnimationFrame 是浏览器提供的 API，它会在下一次重绘之前执行回调，通常是 16.6ms（60FPS）  执行一次，这样可以让渲染更流畅。

优化思路：
分批次渲染：每次只渲染一小部分数据（比如 50 条）。
利用 rAF 控制渲染时机，避免阻塞主线程。
滚动加载优化（可选）：结合 IntersectionObserver 实现懒加载。

代码实现：
```
function renderLargeData(data, chunkSize = 50) {
  const container = document.getElementById('list');
  let index = 0;

  function renderChunk() {
    // 每次渲染 chunkSize 条数据
    const chunkEnd = Math.min(index + chunkSize, data.length);
    
    for (; index < chunkEnd; index++) {
      const div = document.createElement('div');
      div.textContent = 我是.data[index];
      container.appendChild(div);
    }

    // 如果还有数据，继续渲染
    if (index < data.length) {
      requestAnimationFrame(renderChunk);
    }
  }

  // 开始渲染
  renderChunk();
}

// 测试
const bigData = Array(10000).fill("我是数据项");
renderLargeData(bigData);
```

优化效果：
✅ 页面不卡顿：每次只渲染少量 DOM，主线程不会被阻塞。
✅ 流畅渲染：rAF 确保在浏览器空闲时执行，不影响用户交互。
✅ 内存可控：不会一次性创建大量 DOM，减少内存压力。