import { rejects } from 'assert';

export async function find(key: any, arr: any[], func = (e) => e) {
  const idx = await new Promise<number>((resolve) => {
    arr.forEach((e: any, idx: number) => {
      if (func(e) === key) resolve(idx);
    });
    resolve(-1);
  });
  return idx;
}
