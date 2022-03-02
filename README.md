<br />

<p align="center">
  <a href="https://diagrams.cxjs.io">
    <img src="./docs/assets/img/logo.svg" height="142" alt="logo">
  </a>
</p>

<p align="center" style="font-weight: bold; font-size: 24px">
CxJS Diagrams
</p>

<p align="center">
    <img src="https://img.shields.io/npm/v/cx-diagrams" alt="version" /> 
</p>

<br />

This is a simple library that allows you to create diagrams within CxJS applications.

```js
import { Diagram, Flow, Cell, Shape } from "cx-diagrams";

<Svg class="w-auto h-full bg-white">
  <Diagram unitSize={32} showGrid center>
    <Flow gap={1}>
      <Cell width={2}>
        <Shape stroke="red" fill="white" text="Red" />
      </Cell>
      <Cell width={2}>
        <Shape stroke="blue" fill="white" text="Blue" />
      </Cell>
    </Flow>
  </Diagram>
</Svg>;
```

## Links

- [Documentation](https://diagrams.cxjs.io)
- [NPM](https://www.npmjs.com/package/cx-diagrams)

## Repository

This is a mono repo containing the source code for the package and the documentation. Please use the `yarn` package manager as this repo uses its workspace features.

To start the documentation locally.

```
cd docs
yarn start
```

## License

This project is available under the terms of [the MIT license](LICENSE.md).
