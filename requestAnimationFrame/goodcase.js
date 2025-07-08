function renderLargeData(data, chunkSize = 50) {
  const container = document.getElementById('list')
  let index = 0

  function renderChunk() {
    // 每次渲染 chunkSize 条数据
    const chunkEnd = Math.min(index + chunkSize, data.length)
    for (; index < chunkEnd; index++) {
      const div = document.createElement('div')
      div.textContent = '我是数据项'+ index + '条'
      container.appendChild(div)
    }

    // 如果还有数据，继续渲染
    if (index < data.length) {
      requestAnimationFrame(renderChunk)
    }
  }

  // 开始渲染
  renderChunk()
}
const data = Array(1000000).fill('数据项')
renderLargeData(data)