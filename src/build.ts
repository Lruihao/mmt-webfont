import fs from 'node:fs'
import { fontSplit } from 'cn-font-split'

async function split() {
  const inputBuffer = new Uint8Array(
    fs.readFileSync('./src/MMT.ttf').buffer,
  )
  await fontSplit({
    input: inputBuffer,
    outDir: './dist',
    css: {
      fontFamily: 'MMT',
      compress: true,
      localFamily: [
        'MMT',
        '沐目体',
      ],
    },
  })
  console.log('Font split completed.')
}

split()
