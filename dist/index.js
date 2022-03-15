

function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n["default"] = e;
	return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

___$insertStyle(".slide-button {\n  display: flex;\n  position: relative;\n  background-color: white;\n  user-select: none;\n  -webkit-user-select: none;\n}\n.slide-button .slide-container {\n  display: flex;\n  height: 30px;\n  width: 170px;\n  flex: 1;\n  position: relative;\n  justify-content: center;\n}\n.slide-button .slide-container .slider {\n  position: absolute;\n  height: 30px;\n  top: 0;\n  z-index: 100;\n}\n.slide-button .slide-container .slider.left-position {\n  left: 0;\n}\n.slide-button .slide-container .slider.right-position {\n  right: 0;\n}\n.slide-button .slide-container .slider .slider-circle {\n  height: 30px;\n  width: 30px;\n  background-color: green;\n  border-radius: 50%;\n  cursor: pointer;\n}\n.slide-button .slide-container .slider-text {\n  display: none;\n  color: black;\n}\n.slide-button .slide-container .slider-text.show {\n  margin-left: 5px;\n  display: flex;\n}");

var DEFAULT_CONTAINER_WIDTH = 170;
// const IS_TOUCH_DEVICE = 'ontouchstart' in (window || document.documentElement);
var SlideButton = function (props) {
    var slideDirection = props.slideDirection;
    var containerWidth = props.containerWidth || DEFAULT_CONTAINER_WIDTH;
    var _a = React__namespace.useState(false), isDragging = _a[0], setIsDragging = _a[1];
    var _b = React__namespace.useState(0), sliderPos = _b[0], setSliderPos = _b[1];
    var _c = React__namespace.useState(0), startX = _c[0], setStartX = _c[1];
    var _d = React__namespace.useState(0), currX = _d[0], setCurrX = _d[1];
    var slider = React__namespace.createRef();
    var container = React__namespace.createRef();
    var cls = "slide-button ".concat(props.className ? props.className : '');
    var containerCls = "slide-container ".concat(props.containerClassName ? props.containerClassName : '');
    var sliderCls = "slider ".concat(slideDirection === 'right' ? 'left-position' : 'right-position');
    var textSliderCls = "slider-text ".concat(isDragging || !props.startClosed ? 'show' : '', " ").concat(props.textClassName ? props.textClassName : '');
    var updateSliderStyle = function (value) {
        if (slider.current) {
            if (slideDirection === 'left') {
                slider.current.style.right = "".concat(value, "px");
            }
            else {
                slider.current.style.left = "".concat(value, "px");
            }
        }
    };
    var updateContainerStyle = function (value) {
        if (container.current) {
            container.current.style.width = "".concat(value, "px");
        }
    };
    React__namespace.useEffect(function () {
        if (props.startClosed) {
            updateContainerStyle(props.closedContainerWidth || 35);
        }
        else if (props.containerWidth) {
            updateContainerStyle(containerWidth);
        }
    }, []);
    React__namespace.useEffect(function () {
        if (isDragging) {
            var currentPosition = slideDirection === 'left'
                ? Math.max(Math.min(startX - currX, containerWidth), 0)
                : Math.min(Math.max(0, currX - startX), containerWidth);
            setSliderPos(currentPosition);
            updateSliderStyle(currentPosition);
        }
    }, [startX, currX]);
    var onDragTouch = function (e) {
        setCurrX(e.touches[0].clientX);
    };
    var onDragMouse = function (e) {
        setCurrX(e.clientX);
    };
    var reset = function () {
        if (props.startClosed) {
            updateContainerStyle(props.closedContainerWidth || 35);
        }
        updateSliderStyle(0);
    };
    var upadateStartPositions = function () {
        setSliderPos(0);
        updateContainerStyle(containerWidth);
        updateSliderStyle(0);
        setIsDragging(true);
    };
    var startDragMouse = function (e) {
        upadateStartPositions();
        setStartX(e.clientX);
        setCurrX(e.clientX);
        if (props.onStartDrag) {
            props.onStartDrag();
        }
    };
    var startDragTouch = function (e) {
        upadateStartPositions();
        setStartX(e.touches[0].clientX);
        setCurrX(e.touches[0].clientX);
        if (props.onStartDrag) {
            props.onStartDrag();
        }
    };
    var stopDrag = function () {
        if (isDragging) {
            setIsDragging(false);
            reset();
            if (sliderPos >= containerWidth * (props.finishThreshold || 1)) {
                props.onFinishDrag();
            }
            else if (props.onCancelDrag) {
                props.onCancelDrag();
            }
        }
    };
    return (React__namespace.createElement("div", { className: cls },
        React__namespace.createElement("div", { className: containerCls, ref: container },
            React__namespace.createElement("div", { className: sliderCls, ref: slider, onTouchStart: startDragTouch, onTouchEnd: stopDrag, onTouchMove: onDragTouch, onMouseDown: startDragMouse, onMouseMove: onDragMouse, onMouseUp: stopDrag }, props.children || React__namespace.createElement("div", { className: 'slider-circle' })),
            React__namespace.createElement("div", { className: textSliderCls }, props.text || ''))));
};

exports["default"] = SlideButton;
//# sourceMappingURL=index.js.map
