const intro = `/**
  * Built: ${new Date()}
  */
`

const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const sourcemaps = require('rollup-plugin-sourcemaps')

let cache

const entries = [
  'src/main.js',
  'src/components/Header.js',
  'src/components/Boards.js',
  'src/components/TrelloRouter.js',
  'src/components/CreateNewBoard.js'
]

entries.forEach(entry =>
  rollup.rollup({
    entry,
    cache,
    plugins: [
      sourcemaps(),
      resolve({ jsnext: true }),
      commonjs(),
      babel()
    ]
  }).then(bundle => {
    cache = bundle
    bundle.write({
      intro,
      format: 'iife',
      dest: `dist/${entry}`,
      sourceMap: process.env !== 'production',
      sourceMapFile: `dist/${entry}`
    })
  })
  .catch(console.error)
)
