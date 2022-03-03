# CxJS Diagrams

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

Please refer to [the documentation](https://diagrams.cxjs.io) and [the GitHub repository](https://github.com/codaxy/cx-diagrams) for more information and usage examples.

## License

This package is available under [the MIT license](./LICENSE.md).
