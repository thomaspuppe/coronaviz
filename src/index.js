console.time('🚀 Build')

const fs = require('fs')
const nunjucks = require('nunjucks')

const VERBOSE = false
const LOG = str => {
  if (VERBOSE) console.log(str)
}

const CONTENT_DIR = 'src/data'

const ALL_ITEMS = new Array()
const ALL_TAGS = new Set()

fs.readdirSync(CONTENT_DIR)
  .forEach(filename => {
    const filePath = `${CONTENT_DIR}/${filename}`
    LOG('- ' + filePath)
    ALL_ITEMS.push(JSON.parse(fs.readFileSync(filePath, 'utf-8')))
  });

ALL_ITEMS.forEach( item => {
    item.tags.forEach(tag => {
        ALL_TAGS.add(tag)
    })
})

LOG(ALL_ITEMS)
LOG(ALL_TAGS)

nunjucks.configure('src/templates')
var res = nunjucks.render('index.njk', { 
    ALL_TAGS,
    ALL_ITEMS
});
fs.writeFileSync('dist/index.html', res)

console.timeEnd('🚀 Build')
