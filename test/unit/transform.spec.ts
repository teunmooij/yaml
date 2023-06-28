import { transform } from '../../src/transform';

describe('transform tests', () => {
  it('sets data', () => {
    const data = {
      foo: { bar: 'baz' },
      qux: { quux: 'quuz' },
      corge: 'grault',
    };

    const set = {
      'foo.bar': 'qux',
      qux: { grault: 'garply' },
      other: 'side',
      new: { key: 'value' },
      corge: 'waldo',
    };

    const result = transform(data, {}, set);

    expect(result).toEqual({
      foo: { bar: 'qux' },
      qux: { grault: 'garply' },
      other: 'side',
      new: { key: 'value' },
      corge: 'waldo',
    });
  });

  it('merges data', () => {
    const data = {
      foo: { bar: 'baz' },
      qux: { quux: 'quuz' },
      corge: 'grault',
      list: [1, 2, 3],
    };

    const mergeData = {
      'foo.bar': 'qux',
      qux: { grault: 'garply' },
      corge: 'waldo',
      other: 'side',
      new: { key: 'value' },
      list: [4, 5, 6],
    };

    const result = transform(data, mergeData, {});

    expect(result).toEqual({
      foo: { bar: 'qux' },
      qux: { quux: 'quuz', grault: 'garply' },
      corge: 'waldo',
      other: 'side',
      new: { key: 'value' },
      list: [1, 2, 3, 4, 5, 6],
    });
  });
});
