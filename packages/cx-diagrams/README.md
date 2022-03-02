<br />

<p align="center">
  <a href="https://diagrams.cxjs.io">
    <svg width="142" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#a)">
               <path d="M25 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" fill="#3B82F6" />
               <g filter="url(#b)">
                  <path
                     fill-rule="evenodd"
                     clip-rule="evenodd"
                     d="M17.876 30C25.124 30 31 24.437 31 17.575c0-1.123-.157-2.21-.452-3.245a.472.472 0 0 0-.462-.33H17.273C16.018 14 15 14.964 15 16.152v13.18c0 .215.158.403.382.444.808.147 1.641.224 2.494.224Z"
                     fill="#C60F7B"
                  />
               </g>
               <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.306 14A.302.302 0 0 1 2 13.691C2.232 7.743 6.773 2.876 12.652 2.003A.302.302 0 0 1 13 2.3v9.573C13 13.048 12.028 14 10.83 14H2.305Z"
                  fill="#F96E46"
               />
            </g>
            <defs>
               <clipPath id="a">
                  <path fill="#fff" d="M0 0h32v32H0z" />
               </clipPath>
               <filter
                  id="b"
                  x="15"
                  y="14"
                  width="16"
                  height="16"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
               >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                     in="SourceAlpha"
                     values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                     result="hardAlpha"
                  />
                  <feOffset />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_32_75" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_32_75" result="shape" />
               </filter>
            </defs>
         </svg>
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

Please refer to [the documentation](https://diagrams.cxjs.io) and [GitHub repository](https://github.com/codaxy/cx-diagrams) for more information and usage examples.

## License

This package is available under [the MIT license](./LICENSE.md).
