import * as core from '@actions/core';
import path from 'path';
import fs from 'fs/promises';
import * as yaml from 'yaml';

const readFromFile = async (fromPath: string) => {
  const content = await fs.readFile(fromPath, 'utf-8');
  return yaml.parse(content);
};

const readInput = async () => {
  const fromFile = core.getInput('from-file');
  const data = core.getInput('data');
  const toFile = core.getInput('to-file');
  const modiciations = core.getInput('modifications');

  if (fromFile || toFile) {
    if (!process.env.GITHUB_WORKSPACE) throw new Error('Please checkout your repository first (see README)');
  }

  if (fromFile && data) throw new Error('Please provide either from-file or data, not both');
  if (!fromFile && !data) throw new Error('Please provide either from-file or data');

  return {
    inputData: data ? JSON.parse(data) : await readFromFile(path.join(process.env.GITHUB_WORKSPACE!, fromFile!)),
    modifications: modiciations ? JSON.parse(modiciations) : null,
    toFile: toFile ? path.join(process.env.GITHUB_WORKSPACE!, toFile) : null,
  };
};

const run = async (): Promise<void> => {
  try {
    const { inputData, toFile } = await readInput();

    //TODO: modifications
    const data = inputData;

    if (toFile) {
      fs.writeFile(toFile, yaml.stringify(data));
    }

    core.setOutput('data', data);
  } catch (error: any) {
    core.setFailed(error.message);
  }
};

run();
