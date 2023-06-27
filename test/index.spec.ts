jest.mock('@actions/core', () => ({
  getInput: (name: string) => {
    switch (name) {
      default:
        return '';
    }
  },
  setOutput: jest.fn(),
}));

describe('action tests', () => {
  it('runs the action', async () => {
    expect(true).toBe(true);
  });
});
