declare module 'shpjs' {
  export default function shpjs(buffer: ArrayBuffer): Promise<Record<string, unknown>>
}
