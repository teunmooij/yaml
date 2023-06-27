import * as jp from 'jsonpath';
import merge from 'deepmerge';

const toPath = (path: string) => (path.startsWith('$') ? path : `$${path}`);

export const transform = (data: any, mergeData: any, set: any) => {
  for (const [path, value] of Object.entries(mergeData)) {
    jp.apply(data, toPath(path), current => merge(current, value as any));
  }

  for (const [path, value] of Object.entries(set)) {
    jp.apply(data, toPath(path), () => value);
  }

  return data;
};
