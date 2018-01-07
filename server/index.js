const path = require('path')
const express = require('express')
const app = express()

const PATH = path.join(__dirname, '..', 'dist')
const PORT = process.env.PORT || 3000

app.use(express.static(PATH))
app.get('*', (req, res) => {
  res.sendFile(path.join(PATH, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
