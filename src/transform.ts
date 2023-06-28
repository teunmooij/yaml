import jp from 'jsonpath';
import deepMerge from 'deepmerge';

const clone = (data: any) => JSON.parse(JSON.stringify(data));
const toPath = (path: string) => (path.startsWith('$') ? path : `$.${path}`);

type PathFn = (value: any) => (current: any) => any;

const mergePath: PathFn = value => current => {
  if (typeof current === 'object' && typeof value === 'object') {
    return deepMerge(current, value as any);
  }

  return value;
};

const setPath: PathFn = value => () => value;

const applyOrAdd = (data: any, path: string, value: any, apply: PathFn) => {
  const current = jp.value(data, path);

  if (current) {
    jp.apply(data, path, apply(value));
  } else {
    jp.value(data, path, value);
  }
};

export const transform = (inputData: any, mergeData: any, setData: any) => {
  const data = clone(inputData);

  for (const [path, value] of Object.entries(mergeData)) {
    applyOrAdd(data, toPath(path), value, mergePath);
  }

  for (const [path, value] of Object.entries(setData)) {
    applyOrAdd(data, toPath(path), value, setPath);
  }

  return data;
};
