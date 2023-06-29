# Yaml

This Github Action can be used to read, modify and write yaml files. Supports jsonpath to specify the paths to merge or set given data.

## Example Usage

### Modify a yaml file

```yml
jobs:
  modify-yaml:
    runs-on: ubuntu-latest
    name: Example job
    steps:
      - name: Checkout # checkout your sources
        uses: actions/checkout@v3
      - name: Modify yaml # use the action to modify yaml
        id: yaml-action
        uses: teunmooij/yaml@v1
        with:
          from-file: 'helm/values.yml'
          to-file: 'helm/values.yml'
          merge: { 'environment.secrets': { 'foo': 'bar', 'baz': 'qux' } }
```

### Read data from a yaml file

```yml
jobs:
  read-yaml:
    runs-on: ubuntu-latest
    name: Example job
    steps:
      - name: Checkout # checkout your sources file
        uses: actions/checkout@v3
      - name: Read yaml # use the action to read yaml
        id: yaml-action
        uses: teunmooij/yaml@v1
        with:
          from-file: 'helm/values.yml'
     - name: Use data
        run: echo "Data ${{ steps.yaml-action.outputs.data }}"
```

### Write data to a yaml file

```yml
jobs:
  read-yaml:
    runs-on: ubuntu-latest
    name: Example job
    steps:
      - name: Checkout # checkout your sources file
        uses: actions/checkout@v3
      - name: Write yaml # use the action to read yaml
        id: yaml-action
        uses: teunmooij/yaml@v1
        with:
          data: >-
            {
              "foo": "bar"
            }
          to-file: 'helm/values.yml'
```

## Input

| Argument  | Description                                                     | Required                               |
| --------- | --------------------------------------------------------------- | -------------------------------------- |
| from-file | Path to the file to read from                                   | `true`, if _data_ is not provided      |
| data      | The input data as JSON string                                   | `true`, if _from-file_ is not provided |
| to-file   | Path to the file to write to                                    | `false`                                |
| merge     | Recursively merge the given data with the input data            | `false`                                |
| set       | Overwrite the input data at the given paths with the given data | `false`                                |

## Output

| Argument | Description     |
| -------- | --------------- |
| data     | The output data |
