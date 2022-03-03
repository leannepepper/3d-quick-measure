## react-three-quick-measure

A React component for measuring 3D objects in [react-three-fiber](https://github.com/pmndrs/react-three-fiber).

## Usage

```bash
npm install react-three-quick-measure
```

```jsx
import { QuickMeasure } from 'react-three-quick-measure'

function MeasureComponent () {
  return (
    <QuickMeasure>
      <Box />
      <Torus />
    </QuickMeasure>
  )
}
```

Note, this component is currently intended for development purposes only, and is not recommended for production use until performance can be addressed.

## Props

The `active` prop (set to `true` by default) will let you control when to initiate the quick measure feature. If set to false, all `QuickMeasure` children will be returned. To change the colors of the `mainAxis`, `crossAxis`, `textColor`, and `textBackgroundColor` you can set a custom theme with the `quickMeasureTheme` prop. Both props are optional.

`QuickMeasure` is initialized when there is a selected object and a hovered object. The measurements given are from the bounding box of the selected object(s) to the bounding box of the hovered object.

The `QuickMeasure` component uses the [pmndrs/drei Select component](https://github.com/pmndrs/drei#select) internally, thus to select multiple objects you can shift-box-select objects by holding and draging the cursor over multiple objects.

```jsx
const theme = {
  colors: {
    mainAxis: '#41a5f5',
    crossAxis: '#f17720',
    textColor: '#fff',
    textBackgroundColor: '#f17720'
  }
}

<QuickMeasure active={true} quickMeasureTheme={theme}>
  <Box />
  <Torus />
</QuickMeasure>
```
