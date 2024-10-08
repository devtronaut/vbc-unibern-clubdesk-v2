// Add the teamId variable to globalThis: https://stackoverflow.com/a/75671004
// Notice the file has to be announced in tsconfig's file property

type Tables = {
  teamId: number,
  teamName: string,
  referenceElement: string
}

export declare global {
  var tables: Tables
}