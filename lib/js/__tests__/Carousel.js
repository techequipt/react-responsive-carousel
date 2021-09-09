"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _enzyme = require("enzyme");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var index = _interopRequireWildcard(require("../index"));

var _reactEasySwipe = _interopRequireDefault(require("react-easy-swipe"));

var _Carousel = _interopRequireDefault(require("../components/Carousel"));

var _Thumbs = _interopRequireDefault(require("../components/Thumbs"));

var _document = _interopRequireDefault(require("../shims/document"));

var _window = _interopRequireDefault(require("../shims/window"));

var _utils = require("../components/Carousel/utils");

var _animations = require("../components/Carousel/animations");

var _excluded = ["children"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var findDOMNodeWithinWrapper = function findDOMNodeWithinWrapper(wrapper, domNode) {
  return wrapper.findWhere(function (n) {
    return n.getDOMNode() === domNode;
  }).simulate('click');
};

describe('Slider', function () {
  jest.autoMockOff();
  var window;
  var document;
  var component;
  var componentInstance;
  var totalChildren;
  var lastItemIndex;
  var animationHandler = jest.fn();
  var swipeAnimationHandler = jest.fn(_animations.slideSwipeAnimationHandler);
  var stopSwipingHandler = jest.fn();

  var bootstrap = function bootstrap(props, children) {
    window = (0, _window.default)();
    document = (0, _document.default)();
    component = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Carousel.default, props, children));
    componentInstance = component.instance();
    totalChildren = children && children.length ? _react.default.Children.count(componentInstance.props.children) : 0;
    lastItemIndex = totalChildren - 1;
  };

  var baseChildren = [/*#__PURE__*/_react.default.createElement("img", {
    src: "assets/1.jpeg",
    key: "1"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "assets/2.jpeg",
    key: "2"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "assets/3.jpeg",
    key: "3"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "assets/4.jpeg",
    key: "4"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "assets/5.jpeg",
    key: "5"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "assets/6.jpeg",
    key: "6"
  }), /*#__PURE__*/_react.default.createElement("img", {
    src: "assets/7.jpeg",
    key: "7"
  })];

  var renderDefaultComponent = function renderDefaultComponent(_ref) {
    var _ref$children = _ref.children,
        children = _ref$children === void 0 ? baseChildren : _ref$children,
        props = _objectWithoutProperties(_ref, _excluded);

    props = _objectSpread({
      animationHandler: animationHandler,
      swipeAnimationHandler: swipeAnimationHandler,
      stopSwipingHandler: stopSwipingHandler
    }, props);
    bootstrap(props, children);
  };

  var renderForSnapshot = function renderForSnapshot(props, children) {
    return _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_Carousel.default, props, children)).toJSON();
  };

  beforeEach(function () {
    renderDefaultComponent({});
  });
  describe('Exports', function () {
    it('should export Carousel from the main index file', function () {
      expect(index.Carousel).toBe(_Carousel.default);
    });
    it('should export Thumbs from the main index file', function () {
      expect(index.Thumbs).toBe(_Thumbs.default);
    });
  });
  describe('Basics', function () {
    describe('DisplayName', function () {
      it('should be Carousel', function () {
        expect(_Carousel.default.displayName).toBe('Carousel');
      });
    });
    describe('Default Props', function () {
      describe('values', function () {
        var props = {
          axis: 'horizontal',
          centerSlidePercentage: 80,
          interval: 3000,
          labels: {
            leftArrow: 'previous slide / item',
            rightArrow: 'next slide / item',
            item: 'slide item'
          },
          selectedItem: 0,
          showArrows: true,
          showIndicators: true,
          showStatus: true,
          showThumbs: true,
          stopOnHover: true,
          swipeScrollTolerance: 5,
          swipeable: true,
          transitionTime: 350,
          verticalSwipe: 'standard',
          width: '100%'
        };
        Object.keys(props).forEach(function (prop) {
          it("should have ".concat(prop, " as ").concat(props[prop]), function () {
            expect(component.prop(prop)).toBeDefined();
            expect(component.prop(prop)).toEqual(props[prop]);
          });
        });
      });
      describe('methods', function () {
        it('renderArrowPrev should return a button', function () {
          expect(componentInstance.props.renderArrowPrev(jest.fn(), true, 'prev')).toMatchSnapshot();
        });
        it('renderArrowNext should return a button', function () {
          expect(componentInstance.props.renderArrowNext(jest.fn(), true, 'next')).toMatchSnapshot();
        });
        it('renderIndicator should return a list item', function () {
          expect(componentInstance.props.renderIndicator(jest.fn(), true, 0, 'slide')).toMatchSnapshot();
        });
        it('renderItem should pass through the item', function () {
          expect(componentInstance.props.renderItem( /*#__PURE__*/_react.default.createElement("div", null, "item"))).toMatchSnapshot();
        });
        it('renderThumbs should return a list of images extracted from the children', function () {
          expect(componentInstance.props.renderThumbs([/*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("img", {
            src: "assets/1.jpeg",
            key: "1"
          }), /*#__PURE__*/_react.default.createElement("p", null, "Legend 1")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("img", {
            src: "assets/2.jpeg",
            key: "2"
          }), /*#__PURE__*/_react.default.createElement("p", null, "Legend 2")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("img", {
            src: "assets/3.jpeg",
            key: "3"
          }), /*#__PURE__*/_react.default.createElement("p", null, "Legend 3")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("img", {
            src: "assets/4.jpeg",
            key: "4"
          }), /*#__PURE__*/_react.default.createElement("p", null, "Legend 4")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("img", {
            src: "assets/5.jpeg",
            key: "5"
          }), /*#__PURE__*/_react.default.createElement("p", null, "Legend 5")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("img", {
            src: "assets/6.jpeg",
            key: "6"
          }), /*#__PURE__*/_react.default.createElement("p", null, "Legend 6")), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("img", {
            src: "assets/7.jpeg",
            key: "7"
          }), /*#__PURE__*/_react.default.createElement("p", null, "Legend 7"))])).toMatchSnapshot();
        });
        it('statusFormatter should return a string', function () {
          expect(componentInstance.props.statusFormatter(1, 3)).toEqual('1 of 3');
        });
      });
    });
    describe('Initial State', function () {
      var props = {
        selectedItem: 0,
        hasMount: false
      };
      Object.entries(props).forEach(function (key, value) {
        it("should have ".concat(key, " as ").concat(value), function () {
          expect(component.state('selectedItem')).toBe(0);
          expect(component.state('hasMount')).toBe(false);
        });
      });
    });
  });
  describe('componentDidMount', function () {
    it('should bind the events', function () {
      componentInstance.bindEvents = jest.fn();
      componentInstance.componentDidMount();
      expect(componentInstance.bindEvents).toHaveBeenCalledTimes(1);
    });
    it('should not bind the events if there are no children', function () {
      bootstrap({}, undefined);
      componentInstance.bindEvents = jest.fn();
      componentInstance.componentDidMount();
      expect(componentInstance.bindEvents).not.toHaveBeenCalled();
    });
    it('should bind the events if children were lazy loaded (through componentDidUpdate)', function () {
      bootstrap({}, undefined);
      componentInstance.bindEvents = jest.fn();
      expect(componentInstance.bindEvents).not.toHaveBeenCalled();
      component.setProps({
        children: [/*#__PURE__*/_react.default.createElement("img", {
          src: "assets/1.jpeg",
          key: "1"
        })]
      });
      expect(componentInstance.bindEvents).toHaveBeenCalledTimes(1);
    });
  });
  describe('componentDidUpdate', function () {
    it('should unbind the events', function () {
      componentInstance.setState({
        swiping: false
      });
      componentInstance.componentDidUpdate({}, {
        swiping: true
      });
      expect(stopSwipingHandler).toHaveBeenCalledTimes(1);
    });
  });
  describe('componentWillUnmount', function () {
    beforeEach(function () {
      componentInstance.unbindEvents = jest.fn();
      componentInstance.componentWillUnmount();
    });
    it('should unbind the events', function () {
      expect(componentInstance.unbindEvents).toHaveBeenCalledTimes(1);
    });
  });
  describe('bindEvents', function () {
    describe('when useKeyboardArrows is false', function () {
      beforeEach(function () {
        window.addEventListener = jest.fn();
        document.addEventListener = jest.fn();
        componentInstance.bindEvents();
      });
      it('should bind resize to updateSizes', function () {
        expect(window.addEventListener).toHaveBeenCalledWith('resize', componentInstance.updateSizes);
      });
      it('should bind DOMContentLoaded to updateSizes', function () {
        expect(window.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', componentInstance.updateSizes);
      });
      it('should not bind keydown to navigateWithKeyboard', function () {
        expect(document.addEventListener).not.toHaveBeenCalledWith('keydown', componentInstance.navigateWithKeyboard);
      });
    });
    describe('when useKeyboardArrows is true', function () {
      beforeEach(function () {
        renderDefaultComponent({
          useKeyboardArrows: true
        });
        window.addEventListener = jest.fn();
        document.addEventListener = jest.fn();
        componentInstance.bindEvents();
      });
      it('should bind resize to updateSizes', function () {
        expect(window.addEventListener).toHaveBeenCalledWith('resize', componentInstance.updateSizes);
      });
      it('should bind DOMContentLoaded to updateSizes', function () {
        expect(window.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', componentInstance.updateSizes);
      });
      it('should bind keydown to navigateWithKeyboard', function () {
        expect(document.addEventListener).toHaveBeenCalledWith('keydown', componentInstance.navigateWithKeyboard);
      });
    });
  });
  describe('unbindEvents', function () {
    describe('when useKeyboardArrows is false', function () {
      beforeEach(function () {
        window.removeEventListener = jest.fn();
        document.removeEventListener = jest.fn();
        componentInstance.unbindEvents();
      });
      it('should unbind resize to updateSizes', function () {
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', componentInstance.updateSizes);
      });
      it('should unbind DOMContentLoaded to updateSizes', function () {
        expect(window.removeEventListener).toHaveBeenCalledWith('DOMContentLoaded', componentInstance.updateSizes);
      });
      it('should not unbind keydown to navigateWithKeyboard', function () {
        expect(document.removeEventListener).not.toHaveBeenCalledWith('keydown', componentInstance.navigateWithKeyboard);
      });
      it('should not set a tabIndex on the carousel-root', function () {
        expect(component.find('.carousel-root[tabIndex=0]').length).toBe(0);
      });
    });
    describe('when useKeyboardArrows is true', function () {
      beforeEach(function () {
        renderDefaultComponent({
          useKeyboardArrows: true
        });
        window.removeEventListener = jest.fn();
        document.removeEventListener = jest.fn();
        componentInstance.unbindEvents();
      });
      it('should unbind resize to updateSizes', function () {
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', componentInstance.updateSizes);
      });
      it('should unbind DOMContentLoaded to updateSizes', function () {
        expect(window.removeEventListener).toHaveBeenCalledWith('DOMContentLoaded', componentInstance.updateSizes);
      });
      it('should unbind keydown to navigateWithKeyboard', function () {
        expect(document.removeEventListener).toHaveBeenCalledWith('keydown', componentInstance.navigateWithKeyboard);
      });
      it('should set a tabIndex on the carousel-root', function () {
        expect(component.find('.carousel-root[tabIndex=0]').length).toBe(1);
      });
    });
  });
  describe('getInitialImage', function () {
    it('Returns the first image within the declared selected item', function () {
      renderDefaultComponent({
        selectedItem: 2
      });
      var initialImage = componentInstance.getInitialImage();
      var expectedMatchingImageComponent = baseChildren[2];
      expect(initialImage.src.endsWith(expectedMatchingImageComponent.props.src)).toEqual(true);
    });
  });
  describe('navigateWithKeyboard', function () {
    var setActiveElement = function setActiveElement(element) {
      document.activeElement = element;
    };

    beforeEach(function () {
      // jsdom has issues with activeElement so we are hacking it for this specific scenario
      Object.defineProperty(document, 'activeElement', {
        writable: true
      });
    });
    describe('Axis === horizontal', function () {
      beforeEach(function () {
        renderDefaultComponent({
          axis: 'horizontal',
          useKeyboardArrows: true
        });
        componentInstance.increment = jest.fn();
        componentInstance.decrement = jest.fn();
      });
      it('should not navigate if the focus is outside of the carousel', function () {
        componentInstance.navigateWithKeyboard({
          keyCode: 39
        });
        componentInstance.navigateWithKeyboard({
          keyCode: 37
        });
        expect(componentInstance.increment).not.toHaveBeenCalled();
        expect(componentInstance.decrement).not.toHaveBeenCalled();
      });
      it('should call only increment on ArrowRight (39)', function () {
        setActiveElement(componentInstance.carouselWrapperRef);
        componentInstance.navigateWithKeyboard({
          keyCode: 39
        });
        expect(componentInstance.increment).toHaveBeenCalledTimes(1);
        expect(componentInstance.decrement).not.toHaveBeenCalled();
      });
      it('should call only decrement on ArrowLeft (37)', function () {
        setActiveElement(componentInstance.carouselWrapperRef);
        componentInstance.navigateWithKeyboard({
          keyCode: 37
        });
        expect(componentInstance.decrement).toHaveBeenCalledTimes(1);
        expect(componentInstance.increment).not.toHaveBeenCalled();
      });
      it('should not call increment on ArrowDown (40)', function () {
        setActiveElement(componentInstance.carouselWrapperRef);
        componentInstance.navigateWithKeyboard({
          keyCode: 40
        });
        expect(componentInstance.increment).not.toHaveBeenCalled();
        expect(componentInstance.decrement).not.toHaveBeenCalled();
      });
      it('should not call decrement on ArrowUp (38)', function () {
        setActiveElement(componentInstance.carouselWrapperRef);
        componentInstance.navigateWithKeyboard({
          keyCode: 38
        });
        expect(componentInstance.decrement).not.toHaveBeenCalled();
        expect(componentInstance.increment).not.toHaveBeenCalled();
      });
    });
    describe('Axis === vertical', function () {
      beforeEach(function () {
        renderDefaultComponent({
          axis: 'vertical',
          useKeyboardArrows: true
        });
        componentInstance.increment = jest.fn();
        componentInstance.decrement = jest.fn();
      });
      it('should not navigate if the focus is outside of the carousel', function () {
        componentInstance.navigateWithKeyboard({
          keyCode: 40
        });
        componentInstance.navigateWithKeyboard({
          keyCode: 38
        });
        expect(componentInstance.increment).not.toHaveBeenCalled();
        expect(componentInstance.decrement).not.toHaveBeenCalled();
      });
      it('should call only increment on ArrowDown (40)', function () {
        setActiveElement(componentInstance.carouselWrapperRef);
        componentInstance.navigateWithKeyboard({
          keyCode: 40
        });
        expect(componentInstance.increment).toHaveBeenCalledTimes(1);
        expect(componentInstance.decrement).not.toHaveBeenCalled();
      });
      it('should call only decrement on ArrowUp (38)', function () {
        setActiveElement(componentInstance.carouselWrapperRef);
        componentInstance.navigateWithKeyboard({
          keyCode: 38
        });
        expect(componentInstance.decrement).toHaveBeenCalledTimes(1);
        expect(componentInstance.increment).not.toHaveBeenCalled();
      });
      it('should not call increment on ArrowRight (39)', function () {
        setActiveElement(componentInstance.carouselWrapperRef);
        componentInstance.navigateWithKeyboard({
          keyCode: 39
        });
        expect(componentInstance.increment).not.toHaveBeenCalled();
        expect(componentInstance.decrement).not.toHaveBeenCalled();
      });
      it('should not call decrement on ArrowLeft (37)', function () {
        setActiveElement(componentInstance.carouselWrapperRef);
        componentInstance.navigateWithKeyboard({
          keyCode: 37
        });
        expect(componentInstance.decrement).not.toHaveBeenCalled();
        expect(componentInstance.increment).not.toHaveBeenCalled();
      });
    });
  });
  describe('changeItem', function () {
    beforeEach(function () {
      componentInstance.selectItem = jest.fn();
      componentInstance.getFirstItem = jest.fn().mockReturnValue(2);
      componentInstance.changeItem(1)();
    });
    it('should call selectItem sending selectedItem as 1', function () {
      expect(componentInstance.selectItem.mock.calls[0][0]).toEqual({
        selectedItem: 1
      });
    });
  });
  describe('selectItem', function () {
    beforeEach(function () {
      componentInstance.setState = jest.fn();
      componentInstance.handleOnChange = jest.fn();
      componentInstance.selectItem({
        selectedItem: 1,
        ramdomNumber: 2
      });
    });
    it('should call setState sending the argument received, with previousItem', function () {
      expect(componentInstance.setState.mock.calls[0][0]).toEqual({
        previousItem: 0,
        selectedItem: 1,
        ramdomNumber: 2
      });
    });
    it('should call handleOnChange sending only selectedItem', function () {
      expect(componentInstance.handleOnChange.mock.calls[0][0]).toBe(1);
    });
  });
  it('should add a thumb-wrapper container', function () {
    expect(component.find('.thumbs-wrapper').length).toBe(1);
  });
  it('should insert aria-label if provided', function () {
    var ariaLabel = 'Carousel title';
    renderDefaultComponent({
      ariaLabel: ariaLabel
    });
    expect(component.find("[aria-label=\"".concat(ariaLabel, "\"]"))).toBeTruthy();
  });
  describe('Moving', function () {
    beforeEach(function () {
      componentInstance.showArrows = true;
      componentInstance.lastPosition = 3;
      componentInstance.visibleItems = 3;
    });
    it('should set the selectedItem from the props', function () {
      renderDefaultComponent({
        selectedItem: 3
      });
      expect(componentInstance.state.selectedItem).toBe(3);
    });
    it('should update the position of the Carousel if selectedItem is changed', function () {
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[2]).simulate('click');
      expect(componentInstance.state.selectedItem).toBe(2);
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[3]).simulate('click');
      expect(componentInstance.state.selectedItem).toBe(3);
    });
  });
  describe('Selecting', function () {
    it('should set the index as selectedItem when clicked', function () {
      expect(componentInstance.state.selectedItem).toBe(0);
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[1]).simulate('click');
      expect(componentInstance.state.selectedItem).toBe(1);
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[3]).simulate('click');
      expect(componentInstance.state.selectedItem).toBe(3);
    });
    it('should call a given onSelectItem function when an item is clicked', function () {
      var mockedFunction = jest.fn();
      renderDefaultComponent({
        onClickItem: mockedFunction
      });
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[1]).simulate('click');
      expect(mockedFunction).toBeCalled();
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[0]).simulate('click');
      expect(componentInstance.state.selectedItem).toBe(0);
    });
    it('should call onSelectItem function when exactly 1 child is present', function () {
      var mockedFunction = jest.fn();
      renderDefaultComponent({
        children: [/*#__PURE__*/_react.default.createElement("img", {
          src: "assets/1.jpeg",
          key: "1"
        })],
        onClickItem: mockedFunction
      });
      expect(componentInstance.state.selectedItem).toBe(0);
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[0]).simulate('click');
      expect(componentInstance.state.selectedItem).toBe(0);
      expect(mockedFunction).toBeCalled();
    });
  });

  var findDOMNodeByClass = function findDOMNodeByClass(instance, classNames) {
    return _reactDom.default.findDOMNode(instance).querySelectorAll(classNames);
  };

  describe('Navigating', function () {
    beforeEach(function () {
      componentInstance.showArrows = true;
    });
    it('should disable the left arrow if we are showing the first item', function () {
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[0]).simulate('click');
      expect(findDOMNodeByClass(componentInstance, '.carousel-slider .control-prev.control-disabled')).toHaveLength(1);
    });
    it('should enable the left arrow if we are showing other than the first item', function () {
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[1]).simulate('click');
      expect(findDOMNodeByClass(componentInstance, '.carousel-slider .control-prev.control-disabled')).toHaveLength(0);
    });
    it('should disable the right arrow if we reach the lastPosition', function () {
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[1]).simulate('click');
      expect(findDOMNodeByClass(componentInstance, '.carousel-slider .control-next.control-disabled')).toHaveLength(0);
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[6]).simulate('click');
      expect(findDOMNodeByClass(componentInstance, '.carousel-slider .control-next.control-disabled')).toHaveLength(1);
    });
  });
  describe('Infinite Loop', function () {
    beforeEach(function () {
      renderDefaultComponent({
        infiniteLoop: true
      });
    });
    it('should enable the prev arrow if we are showing the first item', function () {
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[0]).simulate('click');
      expect(findDOMNodeByClass(componentInstance, '.carousel-slider .control-prev.control-disabled')).toHaveLength(0);
    });
    it('should enable the right arrow if we reach the lastPosition', function () {
      findDOMNodeWithinWrapper(component, componentInstance.itemsRef[6]).simulate('click');
      expect(findDOMNodeByClass(componentInstance, '.carousel-slider .control-next.control-disabled')).toHaveLength(0);
    });
    it('should move to the first one if increment was called in the last', function () {
      componentInstance.setState({
        selectedItem: lastItemIndex
      });
      expect(componentInstance.state.selectedItem).toBe(lastItemIndex);
      componentInstance.increment();
      expect(componentInstance.state.selectedItem).toBe(0);
    });
    it('should move to the last one if decrement was called in the first', function () {
      expect(componentInstance.state.selectedItem).toBe(0);
      componentInstance.decrement();
      expect(componentInstance.state.selectedItem).toBe(lastItemIndex);
    });
    it('should render the clone slides', function () {
      expect(component.find('.slide').at(0).key()).toContain('itemKey6clone');
      expect(component.find('.slide').at(8).key()).toContain('itemKey0clone');
    });
    it('should work with minimal children', function () {
      renderDefaultComponent({
        children: [/*#__PURE__*/_react.default.createElement("img", {
          src: "assets/1.jpeg",
          key: "1"
        }), /*#__PURE__*/_react.default.createElement("img", {
          src: "assets/2.jpeg",
          key: "2"
        })],
        infiniteLoop: true
      });
      componentInstance.decrement();
      expect(componentInstance.state.selectedItem).toBe(lastItemIndex);
      renderDefaultComponent({
        children: [/*#__PURE__*/_react.default.createElement("img", {
          src: "assets/1.jpeg",
          key: "1"
        })],
        infiniteLoop: true
      });
      componentInstance.decrement();
      expect(componentInstance.state.selectedItem).toBe(lastItemIndex);
    });
    it('should not render any Swipe component with one child', function () {
      renderDefaultComponent({
        children: [/*#__PURE__*/_react.default.createElement("img", {
          src: "assets/1.jpeg",
          key: "1"
        })],
        infiniteLoop: true
      });
      expect(component.find(_reactEasySwipe.default).length).toBe(0);
    });
  });
  describe('Auto Play', function () {
    beforeEach(function () {
      jest.useFakeTimers();
      window.addEventListener = jest.fn();
      renderDefaultComponent({
        autoPlay: true
      });
    });
    afterEach(function () {
      jest.useRealTimers();
    });
    it('should disable when only 1 child is present', function () {
      renderDefaultComponent({
        children: [/*#__PURE__*/_react.default.createElement("img", {
          src: "assets/1.jpeg",
          key: "1"
        })],
        autoPlay: true
      });
      expect(componentInstance.state.selectedItem).toBe(0);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(0);
    });
    it('should change items automatically', function () {
      expect(componentInstance.state.selectedItem).toBe(0);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(1);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(2);
    });
    it('should not move automatically if hovering', function () {
      componentInstance.stopOnHover();
      expect(componentInstance.state.selectedItem).toBe(0);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(0);
      componentInstance.autoPlay();
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(1);
    });
    it('should restart auto-play after disabling it via props', function () {
      expect(componentInstance.state.selectedItem).toBe(0);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(1);
      component.setProps({
        autoPlay: false
      });
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(1);
      component.setProps({
        autoPlay: true
      });
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(2);
    });
    it('should reset when changing the slide through indicator', function () {
      renderDefaultComponent({
        interval: 3000,
        autoPlay: true
      });
      jest.advanceTimersByTime(2000);
      expect(componentInstance.state.selectedItem).toBe(0);
      var changeToSecondItem = componentInstance.changeItem(1); // it only runs with an event

      changeToSecondItem(new MouseEvent('click'));
      jest.advanceTimersByTime(1000);
      expect(componentInstance.state.selectedItem).toBe(1);
    });
  });
  describe('Infinite Loop and Auto Play', function () {
    beforeEach(function () {
      jest.useFakeTimers();
      window.addEventListener = jest.fn();
      renderDefaultComponent({
        children: [/*#__PURE__*/_react.default.createElement("img", {
          src: "assets/1.jpeg",
          key: "1"
        }), /*#__PURE__*/_react.default.createElement("img", {
          src: "assets/2.jpeg",
          key: "2"
        }), /*#__PURE__*/_react.default.createElement("img", {
          src: "assets/3.jpeg",
          key: "3"
        })],
        infiniteLoop: true,
        autoPlay: true
      });
    });
    afterEach(function () {
      jest.useRealTimers();
    });
    it('should automatically loop infinitely', function () {
      expect(componentInstance.state.selectedItem).toBe(0);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(1);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(2);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(0);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(1);
      jest.runOnlyPendingTimers();
      expect(componentInstance.state.selectedItem).toBe(2);
    });
  });
  describe('Mouse enter/leave', function () {
    describe('onMouseEnter', function () {
      it('should set isMouseEntered to true', function () {
        componentInstance.stopOnHover();
        expect(componentInstance.state.isMouseEntered).toBe(true);
      });
      it('should stop auto play when hovering', function () {
        componentInstance.clearAutoPlay = jest.fn();
        componentInstance.stopOnHover();
        expect(componentInstance.clearAutoPlay).toHaveBeenCalledTimes(1);
      });
    });
    describe('onMouseLeave', function () {
      it('should set isMouseEntered to false', function () {
        componentInstance.startOnLeave();
        expect(componentInstance.state.isMouseEntered).toBe(false);
      });
      it('should start auto play again after hovering', function () {
        componentInstance.autoPlay = jest.fn();
        componentInstance.startOnLeave();
        expect(componentInstance.autoPlay).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Focus', function () {
    describe('calling forceFocus', function () {
      it('should call carousel wrapper focus', function () {
        componentInstance.carouselWrapperRef.focus = jest.fn();
        componentInstance.forceFocus();
        expect(componentInstance.carouselWrapperRef.focus).toHaveBeenCalledTimes(1);
      });
    });
    describe('AutoFocus === true', function () {
      it('should call forceFocus on componentDidMount', function () {
        var forceFocusSpy = jest.spyOn(_Carousel.default.prototype, 'forceFocus');
        renderDefaultComponent({
          autoFocus: true
        });
        expect(forceFocusSpy).toHaveBeenCalledTimes(1);
        forceFocusSpy.mockReset();
        forceFocusSpy.mockRestore();
      });
      it('should call forceFocus conditionally on componentDidUpdate', function () {
        componentInstance.forceFocus = jest.fn();
        component.setProps({
          autoFocus: false
        });
        expect(componentInstance.forceFocus).toHaveBeenCalledTimes(0);
        component.setProps({
          autoFocus: true
        });
        expect(componentInstance.forceFocus).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Swiping', function () {
    describe('onSwipeStart', function () {
      it('should set swiping to true', function () {
        componentInstance.onSwipeStart();
        expect(componentInstance.state.swiping).toBe(true);
      });
      it('should call onSwipeStart callback', function () {
        var onSwipeStartFunction = jest.fn();
        renderDefaultComponent({
          onSwipeStart: onSwipeStartFunction
        });
        componentInstance.onSwipeStart();
        expect(onSwipeStartFunction).toBeCalled();
      });
    });
    describe('onSwipeMove', function () {
      beforeEach(function () {
        renderDefaultComponent({
          preventMovementUntilSwipeScrollTolerance: true
        });
      });
      it('should return true to stop scrolling if there was movement in the same direction as the carousel axis', function () {
        expect(componentInstance.onSwipeMove({
          x: 10,
          y: 0
        })).toBe(true);
      });
      it('should return false to allow scrolling if there was no movement in the same direction as the carousel axis', function () {
        expect(componentInstance.onSwipeMove({
          x: 0,
          y: 10
        })).toBe(false);
      });
      it('should call the swipeAnimationHandler when onSwipeMove is fired', function () {
        componentInstance.onSwipeMove({
          x: 10,
          y: 0
        });
        expect(swipeAnimationHandler).toHaveBeenCalled();
      });
      it('should call onSwipeMove callback', function () {
        var onSwipeMoveFunction = jest.fn();
        renderDefaultComponent({
          onSwipeMove: onSwipeMoveFunction
        });
        componentInstance.onSwipeMove({
          x: 0,
          y: 10
        });
        expect(onSwipeMoveFunction).toHaveBeenCalled();
      });
    });
    describe('onSwipeEnd', function () {
      it('should set swiping to false', function () {
        componentInstance.onSwipeEnd();
        expect(componentInstance.state.swiping).toBe(false);
      });
      it('should stop autoplay', function () {
        componentInstance.clearAutoPlay = jest.fn();
        componentInstance.onSwipeEnd();
        expect(componentInstance.clearAutoPlay).toHaveBeenCalledTimes(1);
      });
      it('should not start autoplay again', function () {
        componentInstance.autoPlay = jest.fn();
        componentInstance.onSwipeEnd();
        expect(componentInstance.autoPlay).toHaveBeenCalledTimes(0);
      });
      it('should start autoplay again when autoplay is true', function () {
        renderDefaultComponent({
          autoPlay: true
        });
        componentInstance.autoPlay = jest.fn();
        componentInstance.onSwipeEnd();
        expect(componentInstance.autoPlay).toHaveBeenCalledTimes(1);
      });
      it('should call onSwipeEnd callback', function () {
        var onSwipeEndFunction = jest.fn();
        renderDefaultComponent({
          onSwipeEnd: onSwipeEndFunction
        });
        componentInstance.onSwipeEnd();
        expect(onSwipeEndFunction).toBeCalled();
      });
    });
    describe("verticalSwipe === 'standard'", function () {
      it('should pass the correct props to <Swipe />', function () {
        renderDefaultComponent({
          axis: 'vertical'
        });
        var swipeProps = component.find(_reactEasySwipe.default).first().props();
        expect(swipeProps.onSwipeUp).toBe(componentInstance.onSwipeForward);
        expect(swipeProps.onSwipeDown).toBe(componentInstance.onSwipeBackwards);
      });
    });
    describe("verticalSwipe === 'natural'", function () {
      it('should pass the correct props to <Swipe />', function () {
        renderDefaultComponent({
          axis: 'vertical',
          verticalSwipe: 'natural'
        });
        var swipeProps = component.find(_reactEasySwipe.default).first().props();
        expect(swipeProps.onSwipeUp).toBe(componentInstance.onSwipeBackwards);
        expect(swipeProps.onSwipeDown).toBe(componentInstance.onSwipeForward);
      });
    });
    describe('emulateTouch', function () {
      it('should cancel click when swipe forward and backwards with emulated touch', function () {
        renderDefaultComponent({
          emulateTouch: true
        });
        var currentIndex = componentInstance.state.selectedItem;
        var items = componentInstance.props.children;
        componentInstance.onSwipeForward();
        componentInstance.handleClickItem(currentIndex, items[currentIndex]);
        ++currentIndex;
        expect(componentInstance.state.selectedItem).toEqual(currentIndex);
        componentInstance.onSwipeBackwards();
        componentInstance.handleClickItem(currentIndex, items[currentIndex]);
        --currentIndex;
        expect(componentInstance.state.selectedItem).toEqual(currentIndex);
      });
    });
  });
  describe('center mode', function () {
    beforeEach(function () {
      renderDefaultComponent({
        centerMode: true
      });
    });
    describe('getPosition', function () {
      it('should return regular tranform calculation for vertical axis', function () {
        renderDefaultComponent({
          centerMode: true,
          axis: 'vertical'
        });
        var props = componentInstance.props;
        expect((0, _utils.getPosition)(0, props)).toBe(0);
        expect((0, _utils.getPosition)(1, props)).toBe(-100);
        expect((0, _utils.getPosition)(2, props)).toBe(-200);
        expect((0, _utils.getPosition)(3, props)).toBe(-300);
        expect((0, _utils.getPosition)(4, props)).toBe(-400);
        expect((0, _utils.getPosition)(5, props)).toBe(-500);
        expect((0, _utils.getPosition)(6, props)).toBe(-600);
      });
      it('should return padded transform calculation for horizontal axis', function () {
        var props = componentInstance.props;
        expect((0, _utils.getPosition)(0, props)).toBe(0);
        expect((0, _utils.getPosition)(1, props)).toBe(-70);
        expect((0, _utils.getPosition)(2, props)).toBe(-150);
        expect((0, _utils.getPosition)(3, props)).toBe(-230);
        expect((0, _utils.getPosition)(4, props)).toBe(-310);
        expect((0, _utils.getPosition)(5, props)).toBe(-390); // last one takes up more space

        expect((0, _utils.getPosition)(6, props)).toBe(-460);
      });
      it('should return padded tranform calculation for custom centerSlidePercentage', function () {
        renderDefaultComponent({
          centerMode: true,
          centerSlidePercentage: 50
        });
        var props = componentInstance.props;
        expect((0, _utils.getPosition)(0, props)).toBe(0);
        expect((0, _utils.getPosition)(1, props)).toBe(-25);
        expect((0, _utils.getPosition)(2, props)).toBe(-75);
        expect((0, _utils.getPosition)(3, props)).toBe(-125);
        expect((0, _utils.getPosition)(4, props)).toBe(-175);
        expect((0, _utils.getPosition)(5, props)).toBe(-225);
        expect((0, _utils.getPosition)(6, props)).toBe(-250);
      });
    });
    describe('slide style', function () {
      it('should have a min-width of 80%', function () {
        var slide = (0, _enzyme.shallow)(component.find('.slide').get(0));
        expect(slide.prop('style')).toHaveProperty('minWidth', '80%');
      });
      it('should have min-width defined by centerSlidePercentage', function () {
        renderDefaultComponent({
          centerMode: true,
          centerSlidePercentage: 50
        });
        var slide = (0, _enzyme.shallow)(component.find('.slide').get(0));
        expect(slide.prop('style')).toHaveProperty('minWidth', '50%');
      });
      it('should not be present for vertical axis', function () {
        renderDefaultComponent({
          centerMode: true,
          axis: 'vertical'
        });
        var slide = (0, _enzyme.shallow)(component.find('.slide').get(0));
        expect(slide.prop('style')).toEqual({});
      });
    });
  });
  describe('Snapshots', function () {
    it('default', function () {
      expect(renderForSnapshot({}, baseChildren)).toMatchSnapshot();
    });
    it('no thumbs', function () {
      expect(renderForSnapshot({
        showThumbs: false
      }, baseChildren)).toMatchSnapshot();
    });
    it('no arrows', function () {
      expect(renderForSnapshot({
        showArrows: false
      }, baseChildren)).toMatchSnapshot();
    });
    it('no indicators', function () {
      expect(renderForSnapshot({
        showIndicators: false
      }, baseChildren)).toMatchSnapshot();
    });
    it('no indicators', function () {
      expect(renderForSnapshot({
        showStatus: false
      }, baseChildren)).toMatchSnapshot();
    });
    it('custom class name', function () {
      expect(renderForSnapshot({
        className: 'my-custom-carousel'
      }, baseChildren)).toMatchSnapshot();
    });
    it('custom width', function () {
      expect(renderForSnapshot({
        width: '700px'
      }, baseChildren)).toMatchSnapshot();
    });
    it('vertical axis', function () {
      expect(renderForSnapshot({
        axis: 'vertical'
      }, baseChildren)).toMatchSnapshot();
    });
    it('no children at mount', function () {
      expect(renderForSnapshot({}, undefined)).toMatchSnapshot();
    });
    it('center mode', function () {
      expect(renderForSnapshot({
        centerMode: true
      }, baseChildren)).toMatchSnapshot();
    });
    it('swipeable false', function () {
      expect(renderForSnapshot({
        swipeable: false
      }, baseChildren)).toMatchSnapshot();
    });
    it('infinite loop', function () {
      expect(renderForSnapshot({
        infiniteLoop: true
      }, baseChildren)).toMatchSnapshot();
    });
  });
  jest.autoMockOn();
});