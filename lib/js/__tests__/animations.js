"use strict";

var _Carousel = _interopRequireDefault(require("../components/Carousel"));

var _animations = require("../components/Carousel/animations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Test suite for the default animation handlers
 */
describe('Default Animations', function () {
  var props;
  var state;
  var setState = jest.fn();
  beforeEach(function () {
    props = _Carousel.default.defaultProps;
    state = {
      initialized: false,
      previousItem: 0,
      selectedItem: 1,
      hasMount: false,
      isMouseEntered: false,
      autoPlay: true,
      swiping: false,
      swipeMovementStarted: false,
      cancelClick: false,
      itemSize: 1,
      itemListStyle: {},
      slideStyle: {},
      selectedStyle: {},
      prevStyle: {}
    };
  });
  describe('slideAnimationHandler', function () {
    it('should return itemListStyle with a transform prop', function () {
      var response = (0, _animations.slideAnimationHandler)(props, state);
      expect(response).toHaveProperty('itemListStyle');
      expect(response.itemListStyle).toHaveProperty('transform');
    });
    it('should return a transition time on itemListStyle if not swiping', function () {
      var response = (0, _animations.slideAnimationHandler)(props, state);
      expect(response.itemListStyle).toHaveProperty('transitionDuration');
    });
  });
  describe('slideSwipeAnimationHandler', function () {
    it('should return empty object if preventMovementUntilSwipeScrollTolerance is true and the tolerance has not been reached', function () {
      props = _objectSpread(_objectSpread({}, props), {}, {
        swipeScrollTolerance: 10,
        preventMovementUntilSwipeScrollTolerance: true
      });
      expect((0, _animations.slideSwipeAnimationHandler)({
        x: 5,
        y: 10
      }, props, state, setState)).toEqual({});
    });
    it('should return itemListStyle if preventMovementUntilSwipeScrollTolerance is true and movement has already begun', function () {
      props = _objectSpread(_objectSpread({}, props), {}, {
        swipeScrollTolerance: 10,
        preventMovementUntilSwipeScrollTolerance: true
      });
      state = _objectSpread(_objectSpread({}, state), {}, {
        swipeMovementStarted: true
      });
      expect((0, _animations.slideSwipeAnimationHandler)({
        x: 5,
        y: 10
      }, props, state, setState)).toHaveProperty('itemListStyle');
    });
    it('should return itemListStyle if preventMovementUntilSwipeScrollTolerance is true and the tolerance has been reached', function () {
      props = _objectSpread(_objectSpread({}, props), {}, {
        swipeScrollTolerance: 10,
        preventMovementUntilSwipeScrollTolerance: true
      });
      expect((0, _animations.slideSwipeAnimationHandler)({
        x: 30,
        y: 10
      }, props, state, setState)).toHaveProperty('itemListStyle');
    });
    it('should still return itemListStyle if preventMovementUntilSwipeScrollTolerance is false and the tolerance has not been reached', function () {
      props = _objectSpread(_objectSpread({}, props), {}, {
        swipeScrollTolerance: 10,
        preventMovementUntilSwipeScrollTolerance: false
      });
      expect((0, _animations.slideSwipeAnimationHandler)({
        x: 5,
        y: 10
      }, props, state, setState)).toHaveProperty('itemListStyle');
    });
  });
  describe('fade animation handler', function () {
    it('should return a slideStyle, selectedStyle, and prevStyle', function () {
      var response = (0, _animations.fadeAnimationHandler)(props, state);
      expect(response).toHaveProperty('slideStyle');
      expect(response).toHaveProperty('selectedStyle');
      expect(response).toHaveProperty('prevStyle');
    });
    it('should give selectedStyle an opacity of 1 and position of relative', function () {
      var _response$selectedSty, _response$selectedSty2;

      var response = (0, _animations.fadeAnimationHandler)(props, state);
      expect((_response$selectedSty = response.selectedStyle) === null || _response$selectedSty === void 0 ? void 0 : _response$selectedSty.opacity).toEqual(1);
      expect((_response$selectedSty2 = response.selectedStyle) === null || _response$selectedSty2 === void 0 ? void 0 : _response$selectedSty2.position).toEqual('relative');
    });
    it('should give default slideStyle a negative z-index, opacity 0, and position absolute', function () {
      var _response$slideStyle, _response$slideStyle2, _response$slideStyle3;

      var response = (0, _animations.fadeAnimationHandler)(props, state);
      expect((_response$slideStyle = response.slideStyle) === null || _response$slideStyle === void 0 ? void 0 : _response$slideStyle.opacity).toEqual(0);
      expect((_response$slideStyle2 = response.slideStyle) === null || _response$slideStyle2 === void 0 ? void 0 : _response$slideStyle2.position).toEqual('absolute');
      expect((_response$slideStyle3 = response.slideStyle) === null || _response$slideStyle3 === void 0 ? void 0 : _response$slideStyle3.zIndex).toEqual(-2);
    });
    it('should give prevStyle a negative z-index, opacity 0, and position absolute', function () {
      var _response$prevStyle, _response$prevStyle2, _response$prevStyle3;

      var response = (0, _animations.fadeAnimationHandler)(props, state);
      expect((_response$prevStyle = response.prevStyle) === null || _response$prevStyle === void 0 ? void 0 : _response$prevStyle.opacity).toEqual(0);
      expect((_response$prevStyle2 = response.prevStyle) === null || _response$prevStyle2 === void 0 ? void 0 : _response$prevStyle2.position).toEqual('absolute');
      expect((_response$prevStyle3 = response.prevStyle) === null || _response$prevStyle3 === void 0 ? void 0 : _response$prevStyle3.zIndex).toEqual(-2);
    });
  });
});