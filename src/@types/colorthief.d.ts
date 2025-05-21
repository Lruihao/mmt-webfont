// 解决报错：类型 "typeof import("colorthief/dist/color-thief.mjs")" 没有构造签名。

declare module 'colorthief/dist/color-thief.mjs' {
  export class ColorThief {
    constructor()
    getColor(image: HTMLImageElement, quality?: number): [number, number, number]
    getPalette(image: HTMLImageElement, colorCount?: number, quality?: number): [number, number, number][]
  }
  export default ColorThief
}
