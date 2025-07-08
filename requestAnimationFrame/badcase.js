const data = Array(1000000).fill('数据项')
const container = document.getElementById('list')

data.forEach(item => {
  const div = document.createElement('div')
  div.textContent = item
  container.appendChild(div)
})