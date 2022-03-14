import * as React from 'react';
import './styles.scss';
export interface SlideButtonProps {
    className?: string;
    containerClassName?: string;
    sliderClassName?: string;
    textClassName?: string;
    onFinishDrag: () => void;
    onStartDrag?: () => void;
    onCancelDrag?: () => void;
    slideDirection: 'left' | 'right';
    startClosed: boolean;
    finishThreshold?: number;
    text?: string;
    containerWidth?: number;
    closedContainerWidth?: number;
}
declare const SlideButton: React.FC<SlideButtonProps>;
export default SlideButton;
