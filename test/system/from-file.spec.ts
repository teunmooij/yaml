import core from '@actions/core';
import fs from 'node:fs/promises';
import path from 'node:path';
import { run } from '../../src/action';
import yaml from 'yaml';

jest.mock('@actions/core', () => ({
  getInput: (name: string) => {
    switch (name) {
      case 'from-file':
        return 'input.yaml';
      case 'to-file':
        return 'from-file-output.yaml';
      case 'merge':
        return '{ "foo.bar": "baz" }';
      case 'set':
        return '{ "baz": "qux" }';
      default:
        return '';
    }
  },
  setOutput: jest.fn(),
  setFailed: jest.fn(),
}));

describe('action from file tests', () => {
  it('runs the action', async () => {
    process.env.GITHUB_WORKSPACE = __dirname;

    await run();

    const expected = {
      foo: { corge: 'grault', bar: 'baz' },
      baz: 'qux',
    };

    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.setOutput).toHaveBeenCalledWith('data', expected);

    const outputFile = await fs.readFile(path.join(__dirname, 'from-file-output.yaml'), 'utf-8');
    const outputData = yaml.parse(outputFile);
    expect(outputData).toEqual(expected);
  });
});
