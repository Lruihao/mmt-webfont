import fs from 'node:fs'
import { fontSplit } from 'cn-font-split'

async function split() {
  const inputBuffer = new Uint8Array(
    fs.readFileSync('./package/MMT.ttf').buffer,
  )
  await fontSplit({
    input: inputBuffer,
    outDir: './dist',
    css: {
      fontFamily: 'MMT',
      fontWeight: '400',
      compress: true,
      localFamily: [
        '沐目体',
      ],
    },
  })
  // eslint-disable-next-line no-console
  console.log('Font split completed.')
}

split()
