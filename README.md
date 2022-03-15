# react-sliding-button

A simple customizable react button that is slideable / draggable. This component is compatible with mouse and touch devices.

## Install
```bash
npm install react-sliding-button

or

yarn add react-sliding-button
```

## Usage
```jsx
import * as React from 'react';
import SlideButton from "react-sliding-button";

function App() {
  return (
    <div className>
          <SlideButton
            slideDirection="left"
            onFinishDrag={onFinishDrag}
            startClosed={true} 
            text="Container Text"
          ></SlideButton>
    </div>
  );
}
```

## Props

| Name                 | Type              | Description                                                                                       | Required | Possible Values   | default value |
|----------------------|-------------------|---------------------------------------------------------------------------------------------------|----------|-------------------|---------------|
| className            | string            | The class name of the component                                                                   |          |                   |               |
| containerClassName   | string            | The class name of the container                                                                   |          |                   |               |
| sliderClassName      | string            | The class name of the slider component                                                            |          |                   |               |
| textClassName        | string            | The class name of the text component                                                              |          |                   |               |
| onFinishDrag         | () => void        | Callback function when drag is finished, meaning it passed the finishThreshold                    | ✅      |                   |               |
| onStartDrag          | () => void        | Callback function when drag started                                                               |          |                   |               |
| onCancelDrag         | () => void        | Callback function for when drag is not finished                                                   |          |                   |               |
| slideDirection       | 'left' \| 'right' | Direction of the slide                                                                            | ✅      | 'left', 'right'   |               |
| startClosed          | boolean           | Determines weather the component starts closed and opens when drag starts or starts open          | ✅      | true, false       |               |
| finishThreshold      | number            | Threshold to pass in order to trigger onFinishDrag(), relative to the width of the open container |          | 0.85, 0.9         | 1             |
| text                 | string            | Text to display on the slider                                                                     |          | 'slide to cancel' |               |
| containerWidth       | number            | Width of the open container                                                                       |          |                   | 170           |
| closedContainerWidth | number            | Width of the closed container (when startClosed is activated)                                     |          |                   | 35            |


## License
MIT © [shaibrown5](https://github.com/shaibrown5)

