# yaml

Github action to read, modify and write yaml

## Usage

This action can be used to modify yaml at a given path:

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

Or to read data from a yaml file:

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

Or write data to a yaml file:

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
