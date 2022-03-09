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

const DEFAULT_CONTAINER_WIDTH = 170;
const IS_TOUCH_DEVICE = 'ontouchstart' in (window || document.documentElement);

const SlideButton: React.FC<SlideButtonProps> = props => {
	const { slideDirection } = props;
	const containerWidth = props.containerWidth || DEFAULT_CONTAINER_WIDTH;

	const [isDragging, setIsDragging] = React.useState<boolean>(false);
	const [sliderPos, setSliderPos] = React.useState<number>(0);
	const [startX, setStartX] = React.useState<number>(0);
	const [currX, setCurrX] = React.useState<number>(0);

	const slider = React.createRef<HTMLDivElement>();
	const container = React.createRef<HTMLDivElement>();

	const cls = `slide-button ${props.className ? props.className : ''}`;
	const containerCls = `slide-container ${props.containerClassName ? props.containerClassName : ''}`;
	const sliderCls = `slider ${slideDirection === 'right' ? 'left-position' : 'right-position'}`;
	const textSliderCls = `slider-text ${isDragging || !props.startClosed ? 'show' : ''} ${props.textClassName ? props.textClassName : ''}`;

	const updateSliderStyle = (value: number) => {
		if (slider.current) {
			if (slideDirection === 'left') {
				slider.current.style.right = `${value}px`;
			} else {
				slider.current.style.left = `${value}px`;
			}
		}
	};

	const updateContainerStyle = (value: number) => {
		if (container.current) {
			container.current.style.width = `${value}px`;
		}
	};

	React.useEffect(() => {
		if (props.startClosed) {
			updateContainerStyle(props.closedContainerWidth || 35);
		} else if (props.containerWidth) {
			updateContainerStyle(containerWidth);
		}
	}, []);

	React.useEffect(() => {
		if (isDragging) {
			const currentPosition =
				slideDirection === 'left'
					? Math.max(Math.min(startX - currX, containerWidth), 0)
					: Math.min(Math.max(0, currX - startX), containerWidth);
			setSliderPos(currentPosition);
			updateSliderStyle(currentPosition);
		}
	}, [startX, currX]);

	const onDrag = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
		if (e instanceof TouchEvent && IS_TOUCH_DEVICE) {
			setCurrX(e.touches[0].clientX);
		} else if (e instanceof MouseEvent) {
			setCurrX(e.clientX);
		}
	};

	const reset = () => {
		if (props.startClosed) {
			updateContainerStyle(props.closedContainerWidth || 35);
		}
		updateSliderStyle(0);
	};

	const startDrag = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
		setSliderPos(0);
		updateContainerStyle(containerWidth);
		updateSliderStyle(0);
		setIsDragging(true);

		if (e instanceof TouchEvent && IS_TOUCH_DEVICE) {
			setStartX(e.touches[0].clientX);
			setCurrX(e.touches[0].clientX);
		} else if (e instanceof MouseEvent) {
			setStartX(e.clientX);
			setCurrX(e.clientX);
		}

		if (props.onStartDrag) {
			props.onStartDrag();
		}
	};

	const stopDrag = () => {
		if (isDragging) {
			setIsDragging(false);
			reset();

			if (sliderPos >= containerWidth * (props.finishThreshold || 1)) {
				props.onFinishDrag();
			} else {
				props.onCancelDrag();
			}
		}
	};

	return (
		<div className={cls}>
			<div className={containerCls} ref={container}>
				<div
					className={sliderCls}
					ref={slider}
					onTouchStart={startDrag}
					onTouchEnd={stopDrag}
					onTouchMove={onDrag}
					onMouseDown={startDrag}
					onMouseMove={onDrag}
					onMouseUp={stopDrag}>
					{props.children}
				</div>
				<div className={textSliderCls}>{props.text || ''}</div>
			</div>
		</div>
	);
};

export default SlideButton;
