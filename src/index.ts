import * as core from '@actions/core';
import path from 'path';
import fs from 'fs/promises';
import * as yaml from 'yaml';
import { transform } from './transform';

const readFromFile = async (fromPath: string) => {
  const content = await fs.readFile(fromPath, 'utf-8');
  return yaml.parse(content);
};

const readInput = async () => {
  const fromFile = core.getInput('from-file');
  const inputData = core.getInput('data');
  const toFile = core.getInput('to-file');
  const mergeData = core.getInput('merge');
  const setData = core.getInput('set');

  if (fromFile || toFile) {
    if (!process.env.GITHUB_WORKSPACE) throw new Error('Please checkout your repository first (see README)');
  }

  if (fromFile && inputData) throw new Error('Please provide either from-file or data, not both');
  if (!fromFile && !inputData) throw new Error('Please provide either from-file or data');

  return {
    data: inputData ? JSON.parse(inputData) : await readFromFile(path.join(process.env.GITHUB_WORKSPACE!, fromFile!)),
    merge: mergeData ? JSON.parse(mergeData) : {},
    set: setData ? JSON.parse(setData) : {},
    toFile: toFile ? path.join(process.env.GITHUB_WORKSPACE!, toFile) : null,
  };
};

const run = async (): Promise<void> => {
  try {
    const input = await readInput();
    const { data } = input;

    transform(data, input.merge, input.set);

    core.setOutput('data', data);
  } catch (error: any) {
    core.setFailed(error.message);
  }
};

run();
