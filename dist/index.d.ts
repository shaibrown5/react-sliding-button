import * as React from 'react';
import './styles.scss';
export interface SlideButtonProps {
    className?: string;
    onStartDrag?: () => void;
    onCancelDrag: () => void;
    onFinishDrag: () => void;
    slideDirection: 'left' | 'right';
    startClosed: boolean;
    finishThreshold?: number;
    text?: string;
    containerWidth?: number;
    closedContainerWidth?: number;
    containerClassName?: string;
    sliderClassName?: string;
    textClassName?: string;
}
declare const SlideButton: React.FC<SlideButtonProps>;
export default SlideButton;
