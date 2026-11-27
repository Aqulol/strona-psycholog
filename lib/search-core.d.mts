export type SearchRow = {href:string;title:string;group:string;terms:string;aliases?:string[]};
export function fold(value:string):string;
export function tokens(value:string):string[];
export function findContent(rows:SearchRow[],query:string):(SearchRow & {score:number})[];
