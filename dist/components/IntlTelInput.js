"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _underscore = _interopRequireDefault(require("underscore.deferred"));

var _AllCountries = _interopRequireDefault(require("./AllCountries"));

var _FlagDropDown = _interopRequireDefault(require("./FlagDropDown"));

var _TelInput = _interopRequireDefault(require("./TelInput"));

var _utils = _interopRequireDefault(require("./utils"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mobileUserAgentRegexp = /Android.+Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

var IntlTelInput = function (_Component) {
  _inherits(IntlTelInput, _Component);

  _createClass(IntlTelInput, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var newState = null;

      if (typeof nextProps.value !== 'undefined' && prevState.value !== nextProps.value) {
        newState = {
          value: nextProps.value
        };
      }

      if (prevState.disabled !== nextProps.disabled) {
        newState = {
          disabled: nextProps.disabled
        };
      }

      return newState;
    }
  }]);

  function IntlTelInput(_props) {
    var _this;

    _classCallCheck(this, IntlTelInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(IntlTelInput).call(this, _props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateFlagOnDefaultCountryChange", function (countryCode) {
      _this.setFlag(countryCode, false);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getTempCountry", function (countryCode) {
      if (countryCode === 'auto') {
        return 'auto';
      }

      var countryData = _utils.default.getCountryData(_this.countries, countryCode);

      if (!countryData.iso2) {
        if (_this.props.preferredCountries.length > 0) {
          countryData = _utils.default.getCountryData(_this.countries, _this.props.preferredCountries[0]);
        } else {
          countryData = _AllCountries.default.getCountries()[0];
        }
      }

      return countryData.iso2;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setNumber", function (number, preventFormat) {
      _this.updateFlagFromNumber(number);

      _this.updateValFromNumber(number, !preventFormat);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setFlagDropdownRef", function (ref) {
      _this.flagDropDown = ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setTelRef", function (ref) {
      _this.tel = ref;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setFlag", function (countryCode, isInit) {
      var prevCountry = _this.selectedCountryData && _this.selectedCountryData.iso2 ? _this.selectedCountryData : {};
      _this.selectedCountryData = countryCode ? _utils.default.getCountryData(_this.countries, countryCode, false, false, _this.props.noCountryDataHandler) : {};

      if (_this.selectedCountryData.iso2) {
        _this.defaultCountry = _this.selectedCountryData.iso2;
      }

      var title = countryCode ? "".concat(_this.selectedCountryData.name, ": +").concat(_this.selectedCountryData.dialCode) : 'Unknown';
      var dialCode = _this.state.dialCode;

      if (_this.props.separateDialCode) {
        dialCode = _this.selectedCountryData.dialCode ? "+".concat(_this.selectedCountryData.dialCode) : '';

        if (prevCountry.dialCode) {
          delete _this.wrapperClass["iti-sdc-".concat(prevCountry.dialCode.length + 1)];
        }

        if (dialCode) {
          _this.wrapperClass["iti-sdc-".concat(dialCode.length)] = true;
        }
      }

      var selectedIndex = 0;

      if (countryCode && countryCode !== 'auto') {
        selectedIndex = _utils.default.findIndex(_this.preferredCountries, function (country) {
          return country.iso2 === countryCode;
        });

        if (selectedIndex === -1) {
          selectedIndex = _utils.default.findIndex(_this.countries, function (country) {
            return country.iso2 === countryCode;
          });
          if (selectedIndex === -1) selectedIndex = 0;
          selectedIndex += _this.preferredCountries.length;
        }
      }

      if (_this.tel && _this.state.showDropdown) {
        _this.tel.focus();
      }

      var newNumber = _this.updateDialCode(_this.selectedCountryData.dialCode, !isInit);

      _this.setState({
        value: newNumber,
        showDropdown: false,
        highlightedCountry: selectedIndex,
        countryCode: countryCode,
        title: title,
        dialCode: dialCode
      }, function () {
        _this.updatePlaceholder(_this.props);

        _this.wrapperClass.active = false;

        if (!isInit && prevCountry.iso2 !== countryCode && typeof _this.props.onSelectFlag === 'function') {
          var currentNumber = _this.state.value;

          var fullNumber = _this.formatFullNumber(currentNumber);

          var isValid = _this.isValidNumber(fullNumber);

          _this.props.onSelectFlag(currentNumber, _this.selectedCountryData, fullNumber, isValid);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getExtension", function (number) {
      if (window.intlTelInputUtils) {
        return window.intlTelInputUtils.getExtension(_this.getFullNumber(number), _this.selectedCountryData.iso2);
      }

      return '';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getNumber", function (number, format) {
      if (window.intlTelInputUtils) {
        return window.intlTelInputUtils.formatNumber(_this.getFullNumber(number), _this.selectedCountryData.iso2, format);
      }

      return '';
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFullNumber", function (number) {
      var prefix = _this.props.separateDialCode ? "+".concat(_this.selectedCountryData.dialCode) : '';
      return prefix + number;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getDialCode", function (number) {
      var dialCode = '';

      if (number.charAt(0) === '+') {
        var numericChars = '';

        for (var i = 0, max = number.length; i < max; i++) {
          var c = number.charAt(i);

          if (_utils.default.isNumeric(c)) {
            numericChars += c;

            if (_this.countryCodes[numericChars]) {
              dialCode = number.substr(0, i + 1);
            }

            if (numericChars.length === 4) {
              break;
            }
          }
        }
      }

      return dialCode;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isUnknownNanp", function (number, dialCode) {
      return dialCode === '+1' && _utils.default.getNumeric(number).length >= 4;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addCountryCode", function (countryCodes, iso2, dialCode, priority) {
      if (!(dialCode in countryCodes)) {
        countryCodes[dialCode] = [];
      }

      var index = priority || 0;
      countryCodes[dialCode][index] = iso2;
      return countryCodes;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processAllCountries", function () {
      if (_this.props.onlyCountries.length) {
        _this.filterCountries(_this.props.onlyCountries, function (inArray) {
          return inArray !== -1;
        });
      } else if (_this.props.excludeCountries.length) {
        _this.filterCountries(_this.props.excludeCountries, function (inArray) {
          return inArray === -1;
        });
      } else {
        _this.countries = _AllCountries.default.getCountries();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processCountryCodes", function () {
      _this.countryCodes = {};

      for (var i = 0; i < _this.countries.length; i++) {
        var c = _this.countries[i];

        _this.addCountryCode(_this.countryCodes, c.iso2, c.dialCode, c.priority);

        if (c.areaCodes) {
          for (var j = 0; j < c.areaCodes.length; j++) {
            _this.addCountryCode(_this.countryCodes, c.iso2, c.dialCode + c.areaCodes[j]);
          }
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processPreferredCountries", function () {
      _this.preferredCountries = [];

      for (var i = 0, max = _this.props.preferredCountries.length; i < max; i++) {
        var countryCode = _this.props.preferredCountries[i].toLowerCase();

        var countryData = _utils.default.getCountryData(_this.countries, countryCode, true);

        if (countryData) {
          _this.preferredCountries.push(countryData);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setInitialState", function () {
      var val = _this.props.value || _this.props.defaultValue || '';

      if (_this.getDialCode(val)) {
        _this.updateFlagFromNumber(val, true);
      } else if (_this.tempCountry !== 'auto') {
        if (_this.tempCountry) {
          _this.setFlag(_this.tempCountry, true);
        } else {
          _this.defaultCountry = _this.preferredCountries.length ? _this.preferredCountries[0].iso2 : _this.countries[0].iso2;

          if (!val) {
            _this.setFlag(_this.defaultCountry, true);
          }
        }

        if (!val && !_this.nationalMode && !_this.autoHideDialCode && !_this.props.separateDialCode) {
          _this.setState({
            value: "+".concat(_this.selectedCountryData.dialCode)
          });
        }
      }

      var doNotify = true;

      if (val) {
        _this.updateValFromNumber(val, _this.props.formatOnInit, doNotify);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initRequests", function () {
      if (_this.tempCountry === 'auto') {
        _this.loadAutoCountry();
      } else {
        _this.autoCountryDeferred.resolve();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadCountryFromLocalStorage", function () {
      try {
        return window.localStorage !== undefined ? window.localStorage.getItem('itiAutoCountry') : '';
      } catch (e) {
        return '';
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadAutoCountry", function () {
      var lsAutoCountry = _this.loadCountryFromLocalStorage();

      if (lsAutoCountry) {
        _this.autoCountry = lsAutoCountry;
      }

      if (_this.autoCountry) {
        _this.autoCountryLoaded();
      } else if (!_this.startedLoadingAutoCountry) {
        _this.startedLoadingAutoCountry = true;

        if (typeof _this.props.geoIpLookup === 'function') {
          _this.props.geoIpLookup(function (countryCode) {
            _this.autoCountry = countryCode.toLowerCase();

            if (window.localStorage !== undefined) {
              window.localStorage.setItem('itiAutoCountry', _this.autoCountry);
            }

            _this.autoCountryLoaded();
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cap", function (number) {
      var max = _this.tel ? _this.tel.getAttribute('maxlength') : number;
      return max && number.length > max ? number.substr(0, max) : number;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeEmptyDialCode", function () {
      var value = _this.state.value;
      var startsPlus = value.charAt(0) === '+';

      if (startsPlus) {
        var numeric = _utils.default.getNumeric(value);

        if (!numeric || _this.selectedCountryData.dialCode === numeric) {
          _this.setState({
            value: ''
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleUpDownKey", function (key) {
      var current = _this.flagDropDown.querySelectorAll('.highlight')[0];

      var prevElement = current ? current.previousElementSibling : undefined;
      var nextElement = current ? current.nextElementSibling : undefined;
      var next = key === _constants.KEYS.UP ? prevElement : nextElement;

      if (next) {
        if (next.getAttribute('class').indexOf('divider') > -1) {
          next = key === _constants.KEYS.UP ? next.previousElementSibling : next.nextElementSibling;
        }

        _this.scrollTo(next);

        var selectedIndex = _utils.default.retrieveLiIndex(next);

        _this.setState({
          showDropdown: true,
          highlightedCountry: selectedIndex
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEnterKey", function () {
      var current = _this.flagDropDown.querySelectorAll('.highlight')[0];

      if (current) {
        var selectedIndex = _utils.default.retrieveLiIndex(current);

        var countryCode = current.getAttribute('data-country-code');

        _this.setState({
          showDropdown: false,
          highlightedCountry: selectedIndex,
          countryCode: countryCode
        }, function () {
          _this.setFlag(_this.state.countryCode);

          _this.unbindDocumentClick();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "searchForCountry", function (query) {
      for (var i = 0, max = _this.countries.length; i < max; i++) {
        if (_utils.default.startsWith(_this.countries[i].name, query)) {
          var listItem = _this.flagDropDown.querySelector(".country-list [data-country-code=\"".concat(_this.countries[i].iso2, "\"]:not(.preferred)"));

          var selectedIndex = _utils.default.retrieveLiIndex(listItem);

          _this.setState({
            showDropdown: true,
            highlightedCountry: selectedIndex
          });

          _this.scrollTo(listItem, true);

          break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "formatNumber", function (number) {
      if (window.intlTelInputUtils && _this.selectedCountryData) {
        var format = window.intlTelInputUtils.numberFormat.INTERNATIONAL;

        if (!_this.props.separateDialCode && _this.nationalMode || number.charAt(0) !== '+') {
            format = window.intlTelInputUtils.numberFormat.NATIONAL;
          }

        number = window.intlTelInputUtils.formatNumber(number, _this.selectedCountryData.iso2, format);
      }

      return number;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateValFromNumber", function (number, doFormat) {
      var doNotify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (doFormat && window.intlTelInputUtils && _this.selectedCountryData) {
        var format = !_this.props.separateDialCode && (_this.nationalMode || number.charAt(0) !== '+') ? window.intlTelInputUtils.numberFormat.NATIONAL : window.intlTelInputUtils.numberFormat.INTERNATIONAL;
        number = window.intlTelInputUtils.formatNumber(number, _this.selectedCountryData.iso2, format);
      }

      number = _this.beforeSetNumber(number);

      _this.setState({
        showDropdown: false,
        value: number
      }, function () {
        if (doNotify) {
          _this.notifyPhoneNumberChange(number);
        }

        _this.unbindDocumentClick();
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateFlagFromNumber", function (number, isInit) {
      if (number && _this.nationalMode && _this.selectedCountryData && _this.selectedCountryData.dialCode === '1' && number.charAt(0) !== '+') {
        if (number.charAt(0) !== '1') {
          number = "1".concat(number);
        }

        number = "+".concat(number);
      }

      var dialCode = _this.getDialCode(number);

      var countryCode = null;

      if (dialCode) {
        var countryCodes = _this.countryCodes[_utils.default.getNumeric(dialCode)];

        var alreadySelected = _this.selectedCountryData && countryCodes.indexOf(_this.selectedCountryData.iso2) !== -1;

        if (!alreadySelected || _this.isUnknownNanp(number, dialCode)) {
          for (var j = 0; j < countryCodes.length; j++) {
            if (countryCodes[j]) {
              countryCode = countryCodes[j];
              break;
            }
          }
        }
      } else if (number.charAt(0) === '+' && _utils.default.getNumeric(number).length) {
        countryCode = null;
      }

      if (countryCode !== null) {
        _this.setFlag(countryCode, isInit);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "filterCountries", function (countryArray, processFunc) {
      var i;

      for (i = 0; i < countryArray.length; i++) {
        countryArray[i] = countryArray[i].toLowerCase();
      }

      _this.countries = [];

      for (i = 0; i < _AllCountries.default.getCountries().length; i++) {
        if (processFunc(countryArray.indexOf(_AllCountries.default.getCountries()[i].iso2))) {
          _this.countries.push(_AllCountries.default.getCountries()[i]);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processCountryData", function () {
      _AllCountries.default.initialize(_this.props.countriesData);

      _this.processAllCountries.call(_assertThisInitialized(_assertThisInitialized(_this)));

      _this.processCountryCodes.call(_assertThisInitialized(_assertThisInitialized(_this)));

      _this.processPreferredCountries.call(_assertThisInitialized(_assertThisInitialized(_this)));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOnBlur", function (e) {
      _this.removeEmptyDialCode();

      if (typeof _this.props.onPhoneNumberBlur === 'function') {
        var value = _this.state.value;

        var fullNumber = _this.formatFullNumber(value);

        var isValid = _this.isValidNumber(fullNumber);

        _this.props.onPhoneNumberBlur(isValid, value, _this.selectedCountryData, fullNumber, _this.getExtension(value), e);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOnFocus", function (e) {
      if (typeof _this.props.onPhoneNumberFocus === 'function') {
        var value = _this.state.value;

        var fullNumber = _this.formatFullNumber(value);

        var isValid = _this.isValidNumber(fullNumber);

        _this.props.onPhoneNumberFocus(isValid, value, _this.selectedCountryData, fullNumber, _this.getExtension(value), e);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "bindDocumentClick", function () {
      _this.isOpening = true;
      document.querySelector('html').addEventListener('click', _this.handleDocumentClick);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "unbindDocumentClick", function () {
      document.querySelector('html').removeEventListener('click', _this.handleDocumentClick);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clickSelectedFlag", function (e) {
      var _this$props = _this.props,
          allowDropdown = _this$props.allowDropdown,
          onFlagClick = _this$props.onFlagClick;
      var _this$state = _this.state,
          showDropdown = _this$state.showDropdown,
          disabled = _this$state.disabled,
          readonly = _this$state.readonly;

      if (!showDropdown && !disabled && !readonly && allowDropdown) {
        _this.setState({
          showDropdown: true,
          offsetTop: _utils.default.offset(_this.tel).top,
          outerHeight: _utils.default.getOuterHeight(_this.tel)
        }, function () {
          var highlightItem = _this.flagDropDown.querySelector('.highlight');

          if (highlightItem) {
            _this.scrollTo(highlightItem, true);
          }
        });
      } else if (showDropdown) {
        _this.toggleDropdown(false);
      }

      if (typeof onFlagClick === 'function') {
        onFlagClick(e);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updatePlaceholder", function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;

      if (window.intlTelInputUtils && props.autoPlaceholder && _this.selectedCountryData) {
        var numberType = window.intlTelInputUtils.numberType[props.numberType];
        var placeholder = _this.selectedCountryData.iso2 ? window.intlTelInputUtils.getExampleNumber(_this.selectedCountryData.iso2, _this.nationalMode, numberType) : '';
        placeholder = _this.beforeSetNumber(placeholder, props);

        if (typeof props.customPlaceholder === 'function') {
          placeholder = props.customPlaceholder(placeholder, _this.selectedCountryData);
        }

        _this.setState({
          placeholder: placeholder
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleDropdown", function (status) {
      _this.setState({
        showDropdown: !!status
      }, function () {
        if (!_this.state.showDropdown) {
          _this.unbindDocumentClick();
        }
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollTo", function (element, middle) {
      try {
        var container = _this.flagDropDown.querySelector('.country-list');

        var containerHeight = parseFloat(window.getComputedStyle(container).getPropertyValue('height'));

        var containerTop = _utils.default.offset(container).top;

        var containerBottom = containerTop + containerHeight;

        var elementHeight = _utils.default.getOuterHeight(element);

        var elementTop = _utils.default.offset(element).top;

        var elementBottom = elementTop + elementHeight;
        var middleOffset = containerHeight / 2 - elementHeight / 2;
        var newScrollTop = elementTop - containerTop + container.scrollTop;

        if (elementTop < containerTop) {
          if (middle) {
            newScrollTop -= middleOffset;
          }

          container.scrollTop = newScrollTop;
        } else if (elementBottom > containerBottom) {
          if (middle) {
            newScrollTop += middleOffset;
          }

          var heightDifference = containerHeight - elementHeight;
          container.scrollTop = newScrollTop - heightDifference;
        }
      } catch (err) {}
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateDialCode", function (newDialCode, hasSelectedListItem) {
      var currentNumber = _this.state.value;

      if (!newDialCode) {
        return currentNumber;
      }

      var newNumber = currentNumber;
      newDialCode = "+".concat(newDialCode);

      if (currentNumber.charAt(0) === '+') {
        var prevDialCode = _this.getDialCode(currentNumber);

        if (prevDialCode) {
          newNumber = currentNumber.replace(prevDialCode, newDialCode);
        } else {
          newNumber = newDialCode;
        }
      } else if (_this.nationalMode || _this.props.separateDialCode) {} else if (currentNumber) {
        newNumber = newDialCode + currentNumber;
      } else if (hasSelectedListItem || !_this.autoHideDialCode) {
        newNumber = newDialCode;
      }

      if (newNumber !== currentNumber) {
        _this.notifyPhoneNumberChange(newNumber);
      }

      return newNumber;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "generateMarkup", function () {
      _this.wrapperClass['separate-dial-code'] = _this.props.separateDialCode;

      if (_this.isMobile && _this.props.useMobileFullscreenDropdown) {
        document.querySelector('body').classList.add('iti-mobile');
        _this.dropdownContainer = 'body';
        window.addEventListener('scroll', _this.handleWindowScroll);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSelectedFlagKeydown", function (e) {
      if (!_this.state.showDropdown && (e.which === _constants.KEYS.UP || e.which === _constants.KEYS.DOWN || e.which === _constants.KEYS.SPACE || e.which === _constants.KEYS.ENTER)) {
        e.preventDefault();
        e.stopPropagation();

        _this.toggleDropdown(true);
      }

      if (e.which === _constants.KEYS.TAB) {
        _this.toggleDropdown(false);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isValidNumber", function (number) {
      var val = _utils.default.trim(number);

      var countryCode = _this.nationalMode || _this.props.separateDialCode ? _this.selectedCountryData.iso2 : '';

      if (window.intlTelInputUtils) {
        return window.intlTelInputUtils.isValidNumber(val, countryCode);
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "formatFullNumber", function (number) {
      return window.intlTelInputUtils ? _this.getNumber(number, window.intlTelInputUtils.numberFormat.INTERNATIONAL) : number;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "notifyPhoneNumberChange", function (newNumber) {
      if (typeof _this.props.onPhoneNumberChange === 'function') {
        var fullNumber = _this.formatFullNumber(newNumber);

        var isValid = _this.isValidNumber(fullNumber);

        _this.props.onPhoneNumberChange(isValid, newNumber, _this.selectedCountryData, fullNumber, _this.getExtension(newNumber));
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "beforeSetNumber", function (number) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.props;

      if (props.separateDialCode) {
        var dialCode = _this.getDialCode(number);

        if (dialCode) {
          if (_this.selectedCountryData.areaCodes !== null) {
            dialCode = "+".concat(_this.selectedCountryData.dialCode);
          }

          var start = number[dialCode.length] === ' ' || number[dialCode.length] === '-' ? dialCode.length + 1 : dialCode.length;
          number = number.substr(start);
        }
      }

      return _this.cap(number);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleWindowScroll", function () {
      _this.setState({
        showDropdown: false
      }, function () {
        window.removeEventListener('scroll', _this.handleWindowScroll);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentKeyDown", function (e) {
      var queryTimer;
      e.preventDefault();

      if (e.which === _constants.KEYS.UP || e.which === _constants.KEYS.DOWN) {
        _this.handleUpDownKey(e.which);
      } else if (e.which === _constants.KEYS.ENTER) {
        _this.handleEnterKey();
      } else if (e.which === _constants.KEYS.ESC) {
        _this.setState({
          showDropdown: false
        });
      } else if (e.which >= _constants.KEYS.A && e.which <= _constants.KEYS.Z || e.which === _constants.KEYS.SPACE) {
        if (queryTimer) {
          clearTimeout(queryTimer);
        }

        if (!_this.query) {
          _this.query = '';
        }

        _this.query += String.fromCharCode(e.which);

        _this.searchForCountry(_this.query);

        queryTimer = setTimeout(function () {
          _this.query = '';
        }, 1000);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDocumentClick", function (e) {
      var targetClass = e.target.getAttribute('class');

      if (targetClass === null || targetClass && targetClass.indexOf('country') === -1 && targetClass.indexOf('selected-flag') === -1 && targetClass.indexOf('iti-flag') === -1 && targetClass.indexOf('iti-arrow') === -1) {
        _this.isOpening = false;
      }

      if (!_this.isOpening) {
        _this.toggleDropdown(false);
      }

      _this.isOpening = false;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (e) {
      var cursorPosition = e.target.selectionStart;
      var previousValue = e.target.value;
      var priorValue = _this.state.value;
      var previousStringBeforeCursor = previousValue === '' ? previousValue : previousValue.substring(0, cursorPosition);
      var formattedValue = previousValue.length < priorValue.length ? previousValue : _this.formatNumber(e.target.value);
      var value = _this.props.format ? formattedValue : e.target.value;
      cursorPosition = _utils.default.getCursorPositionAfterFormating(previousStringBeforeCursor, previousValue, value);

      if (_this.props.value !== undefined) {
        _this.setState({
          cursorPosition: cursorPosition
        }, function () {
          _this.updateFlagFromNumber(value);

          _this.notifyPhoneNumberChange(value);
        });
      } else {
        _this.setState({
          value: value,
          cursorPosition: cursorPosition
        }, function () {
          _this.updateFlagFromNumber(value);

          _this.notifyPhoneNumberChange(value);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "changeHighlightCountry", function (showDropdown, selectedIndex) {
      _this.setState({
        showDropdown: showDropdown,
        highlightedCountry: selectedIndex
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadUtils", function () {
      if (window.intlTelInputUtils) {
        _this.utilsScriptDeferred.resolve();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "autoCountryLoaded", function () {
      if (_this.tempCountry === 'auto') {
        _this.tempCountry = _this.autoCountry;

        _this.autoCountryDeferred.resolve();
      }
    });

    _this.wrapperClass = {};
    _this.autoCountry = '';
    _this.tempCountry = '';
    _this.startedLoadingAutoCountry = false;
    _this.deferreds = [];
    _this.autoCountryDeferred = new _underscore.default.Deferred();
    _this.utilsScriptDeferred = new _underscore.default.Deferred();
    _this.isOpening = false;
    _this.isMobile = typeof navigator !== 'undefined' && mobileUserAgentRegexp.test(navigator.userAgent);
    _this.preferredCountries = [];
    _this.countries = [];
    _this.countryCodes = {};
    _this.windowLoaded = false;
    _this.query = '';
    _this.selectedCountryData = {};
    _this.state = {
      showDropdown: false,
      highlightedCountry: 0,
      value: _props.value || _props.defaultValue,
      disabled: _props.disabled,
      readonly: false,
      offsetTop: 0,
      outerHeight: 0,
      placeholder: '',
      title: '',
      countryCode: 'us',
      dialCode: '',
      cursorPosition: (_props.value || _props.defaultValue).length
    };
    return _this;
  }

  _createClass(IntlTelInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.autoHideDialCode = this.props.autoHideDialCode;
      this.allowDropdown = this.props.allowDropdown;
      this.nationalMode = this.props.nationalMode;
      this.dropdownContainer = '';

      if (this.nationalMode) {
        this.autoHideDialCode = false;
      }

      if (this.props.separateDialCode) {
        this.autoHideDialCode = false;
        this.nationalMode = false;
        this.allowDropdown = true;
      }

      this.processCountryData.call(this);
      this.tempCountry = this.getTempCountry(this.props.defaultCountry);

      if (document.readyState === 'complete') {
        this.windowLoaded = true;
      } else {
        window.addEventListener('load', function () {
          _this2.windowLoaded = true;
        });
      }

      this.generateMarkup();
      this.setInitialState();
      this.initRequests();
      this.deferreds.push(this.autoCountryDeferred.promise());
      this.deferreds.push(this.utilsScriptDeferred.promise());

      _underscore.default.when(this.deferreds).done(function () {
        _this2.setInitialState();
      });

      document.addEventListener('keydown', this.handleDocumentKeyDown);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextState.showDropdown) {
        document.addEventListener('keydown', this.handleDocumentKeyDown);
        this.bindDocumentClick();
      } else {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
        this.unbindDocumentClick();
      }

      return true;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value) {
        this.updateFlagFromNumber(this.props.value);
      }

      if (typeof this.props.customPlaceholder === 'function' && prevProps.customPlaceholder !== this.props.customPlaceholder) {
        this.updatePlaceholder(this.props);
      }

      if (this.props.allowDropdown !== prevProps.allowDropdown) {
        this.allowDropdown = this.props.allowDropdown;
      }

      if (this.props.defaultCountry !== prevProps.defaultCountry) {
        this.updateFlagOnDefaultCountryChange(this.props.defaultCountry);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
      window.removeEventListener('scroll', this.handleWindowScroll);
      this.unbindDocumentClick();
    }
  }, {
    key: "render",
    value: function render() {
      var inputClass = this.props.inputClassName;
      var wrapperStyle = Object.assign({}, this.props.style || {});
      this.wrapperClass['allow-dropdown'] = this.allowDropdown;
      this.wrapperClass.expanded = this.state.showDropdown;
      var wrapperClass = (0, _classnames.default)(this.wrapperClass, this.props.containerClassName);
      var titleTip = this.selectedCountryData ? "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode) : 'Unknown';
      var value = this.props.value !== undefined ? this.props.value : this.state.value;
      return _react.default.createElement("div", {
        className: wrapperClass,
        style: wrapperStyle
      }, _react.default.createElement(_FlagDropDown.default, {
        refCallback: this.setFlagDropdownRef,
        allowDropdown: this.allowDropdown,
        dropdownContainer: this.dropdownContainer,
        separateDialCode: this.props.separateDialCode,
        dialCode: this.state.dialCode,
        clickSelectedFlag: this.clickSelectedFlag,
        setFlag: this.setFlag,
        countryCode: this.state.countryCode,
        isMobile: this.isMobile,
        handleSelectedFlagKeydown: this.handleSelectedFlagKeydown,
        changeHighlightCountry: this.changeHighlightCountry,
        countries: this.countries,
        showDropdown: this.state.showDropdown,
        inputTop: this.state.offsetTop,
        inputOuterHeight: this.state.outerHeight,
        preferredCountries: this.preferredCountries,
        highlightedCountry: this.state.highlightedCountry,
        titleTip: titleTip
      }), _react.default.createElement(_TelInput.default, {
        refCallback: this.setTelRef,
        handleInputChange: this.handleInputChange,
        handleOnBlur: this.handleOnBlur,
        handleOnFocus: this.handleOnFocus,
        className: inputClass,
        disabled: this.state.disabled,
        readonly: this.state.readonly,
        fieldName: this.props.fieldName,
        fieldId: this.props.fieldId,
        value: value,
        placeholder: this.props.placeholder !== undefined ? this.props.placeholder : this.state.placeholder,
        autoFocus: this.props.autoFocus,
        autoComplete: this.props.autoComplete,
        inputProps: this.props.telInputProps,
        cursorPosition: this.state.cursorPosition
      }));
    }
  }]);

  return IntlTelInput;
}(_react.Component);

IntlTelInput.defaultProps = {
  containerClassName: 'intl-tel-input',
  inputClassName: '',
  fieldName: '',
  fieldId: '',
  defaultValue: '',
  countriesData: null,
  allowDropdown: true,
  autoHideDialCode: true,
  autoPlaceholder: true,
  customPlaceholder: null,
  excludeCountries: [],
  formatOnInit: true,
  separateDialCode: false,
  defaultCountry: '',
  geoIpLookup: null,
  nationalMode: true,
  numberType: 'MOBILE',
  noCountryDataHandler: null,
  onlyCountries: [],
  preferredCountries: ['us', 'gb'],
  onPhoneNumberChange: null,
  onPhoneNumberBlur: null,
  onPhoneNumberFocus: null,
  onSelectFlag: null,
  disabled: false,
  autoFocus: false,
  useMobileFullscreenDropdown: true,
  autoComplete: 'off',
  telInputProps: {},
  format: false,
  onFlagClick: null
};
var _default = IntlTelInput;
exports.default = _default;
IntlTelInput.__docgenInfo = {
  "description": "",
  "methods": [{
    "name": "getDerivedStateFromProps",
    "docblock": null,
    "modifiers": ["static"],
    "params": [{
      "name": "nextProps",
      "type": null
    }, {
      "name": "prevState",
      "type": null
    }],
    "returns": null
  }, {
    "name": "updateFlagOnDefaultCountryChange",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "countryCode",
      "type": null
    }],
    "returns": null
  }, {
    "name": "getTempCountry",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "countryCode",
      "type": null
    }],
    "returns": null
  }, {
    "name": "setNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }, {
      "name": "preventFormat",
      "type": null
    }],
    "returns": null
  }, {
    "name": "setFlagDropdownRef",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "ref",
      "type": null
    }],
    "returns": null
  }, {
    "name": "setTelRef",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "ref",
      "type": null
    }],
    "returns": null
  }, {
    "name": "setFlag",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "countryCode",
      "type": null
    }, {
      "name": "isInit",
      "type": null
    }],
    "returns": null
  }, {
    "name": "getExtension",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }],
    "returns": null
  }, {
    "name": "getNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }, {
      "name": "format",
      "type": null
    }],
    "returns": null
  }, {
    "name": "getFullNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }],
    "returns": null
  }, {
    "name": "getDialCode",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }],
    "returns": null
  }, {
    "name": "isUnknownNanp",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }, {
      "name": "dialCode",
      "type": null
    }],
    "returns": null
  }, {
    "name": "addCountryCode",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "countryCodes",
      "type": null
    }, {
      "name": "iso2",
      "type": null
    }, {
      "name": "dialCode",
      "type": null
    }, {
      "name": "priority",
      "type": null
    }],
    "returns": null
  }, {
    "name": "processAllCountries",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "processCountryCodes",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "processPreferredCountries",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "setInitialState",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "initRequests",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "loadCountryFromLocalStorage",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "loadAutoCountry",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "cap",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }],
    "returns": null
  }, {
    "name": "removeEmptyDialCode",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "handleUpDownKey",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "key",
      "type": null
    }],
    "returns": null
  }, {
    "name": "handleEnterKey",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "searchForCountry",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "query",
      "type": null
    }],
    "returns": null
  }, {
    "name": "formatNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }],
    "returns": null
  }, {
    "name": "updateValFromNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }, {
      "name": "doFormat",
      "type": null
    }, {
      "name": "doNotify",
      "type": null
    }],
    "returns": null
  }, {
    "name": "updateFlagFromNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }, {
      "name": "isInit",
      "type": null
    }],
    "returns": null
  }, {
    "name": "filterCountries",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "countryArray",
      "type": null
    }, {
      "name": "processFunc",
      "type": null
    }],
    "returns": null
  }, {
    "name": "processCountryData",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "handleOnBlur",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "e",
      "type": null
    }],
    "returns": null
  }, {
    "name": "handleOnFocus",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "e",
      "type": null
    }],
    "returns": null
  }, {
    "name": "bindDocumentClick",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "unbindDocumentClick",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "clickSelectedFlag",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "e",
      "type": null
    }],
    "returns": null
  }, {
    "name": "updatePlaceholder",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "props",
      "type": null
    }],
    "returns": null
  }, {
    "name": "toggleDropdown",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "status",
      "type": null
    }],
    "returns": null
  }, {
    "name": "scrollTo",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "element",
      "type": null
    }, {
      "name": "middle",
      "type": null
    }],
    "returns": null
  }, {
    "name": "updateDialCode",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "newDialCode",
      "type": null
    }, {
      "name": "hasSelectedListItem",
      "type": null
    }],
    "returns": null
  }, {
    "name": "generateMarkup",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "handleSelectedFlagKeydown",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "e",
      "type": null
    }],
    "returns": null
  }, {
    "name": "isValidNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }],
    "returns": null
  }, {
    "name": "formatFullNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }],
    "returns": null
  }, {
    "name": "notifyPhoneNumberChange",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "newNumber",
      "type": null
    }],
    "returns": null
  }, {
    "name": "beforeSetNumber",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "number",
      "type": null
    }, {
      "name": "props",
      "type": null
    }],
    "returns": null
  }, {
    "name": "handleWindowScroll",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "handleDocumentKeyDown",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "e",
      "type": null
    }],
    "returns": null
  }, {
    "name": "handleDocumentClick",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "e",
      "type": null
    }],
    "returns": null
  }, {
    "name": "handleInputChange",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "e",
      "type": null
    }],
    "returns": null
  }, {
    "name": "changeHighlightCountry",
    "docblock": null,
    "modifiers": [],
    "params": [{
      "name": "showDropdown",
      "type": null
    }, {
      "name": "selectedIndex",
      "type": null
    }],
    "returns": null
  }, {
    "name": "loadUtils",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }, {
    "name": "autoCountryLoaded",
    "docblock": null,
    "modifiers": [],
    "params": [],
    "returns": null
  }],
  "displayName": "IntlTelInput",
  "props": {
    "containerClassName": {
      "defaultValue": {
        "value": "'intl-tel-input'",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "Container CSS class name."
    },
    "inputClassName": {
      "defaultValue": {
        "value": "''",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "Text input CSS class name."
    },
    "fieldName": {
      "defaultValue": {
        "value": "''",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "It's used as `input` field `name` attribute."
    },
    "fieldId": {
      "defaultValue": {
        "value": "''",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "It's used as `input` field `id` attribute."
    },
    "defaultValue": {
      "defaultValue": {
        "value": "''",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "The value used to initialize input. This will only work on uncontrolled component."
    },
    "countriesData": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "array"
        }
      },
      "required": false,
      "description": "Countries data can be configured, it defaults to data defined in `AllCountries`."
    },
    "allowDropdown": {
      "defaultValue": {
        "value": "true",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Whether or not to allow the dropdown. If disabled, there is no dropdown arrow, and the selected flag is not clickable.\nAlso we display the selected flag on the right instead because it is just a marker of state."
    },
    "autoHideDialCode": {
      "defaultValue": {
        "value": "true",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "If there is just a dial code in the input: remove it on blur, and re-add it on focus."
    },
    "autoPlaceholder": {
      "defaultValue": {
        "value": "true",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Add or remove input placeholder with an example number for the selected country."
    },
    "customPlaceholder": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": "Change the placeholder generated by autoPlaceholder. Must return a string."
    },
    "excludeCountries": {
      "defaultValue": {
        "value": "[]",
        "computed": false
      },
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "string"
        }
      },
      "required": false,
      "description": "Don't display the countries you specify. (Array)"
    },
    "formatOnInit": {
      "defaultValue": {
        "value": "true",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Format the input value during initialisation."
    },
    "separateDialCode": {
      "defaultValue": {
        "value": "false",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Display the country dial code next to the selected flag so it's not part of the typed number.\nNote that this will disable nationalMode because technically we are dealing with international numbers,\nbut with the dial code separated."
    },
    "defaultCountry": {
      "defaultValue": {
        "value": "''",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "Default country."
    },
    "geoIpLookup": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": "GeoIp lookup function."
    },
    "nationalMode": {
      "defaultValue": {
        "value": "true",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Don't insert international dial codes."
    },
    "numberType": {
      "defaultValue": {
        "value": "'MOBILE'",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "Number type to use for placeholders."
    },
    "noCountryDataHandler": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": "The function which can catch the \"no this default country\" exception."
    },
    "onlyCountries": {
      "defaultValue": {
        "value": "[]",
        "computed": false
      },
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "string"
        }
      },
      "required": false,
      "description": "Display only these countries."
    },
    "preferredCountries": {
      "defaultValue": {
        "value": "['us', 'gb']",
        "computed": false
      },
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "string"
        }
      },
      "required": false,
      "description": "The countries at the top of the list. defaults to United States and United Kingdom."
    },
    "onPhoneNumberChange": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": "Optional validation callback function. It returns validation status, input box value and selected country data."
    },
    "onPhoneNumberBlur": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": "Optional validation callback function. It returns validation status, input box value and selected country data."
    },
    "onPhoneNumberFocus": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": "Optional validation callback function. It returns validation status, input box value and selected country data."
    },
    "onSelectFlag": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": "Allow main app to do things when a country is selected."
    },
    "disabled": {
      "defaultValue": {
        "value": "false",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Disable this component."
    },
    "autoFocus": {
      "defaultValue": {
        "value": "false",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Enable auto focus"
    },
    "useMobileFullscreenDropdown": {
      "defaultValue": {
        "value": "true",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Render fullscreen flag dropdown when mobile useragent is detected. The dropdown element is rendered as a direct child of document.body"
    },
    "autoComplete": {
      "defaultValue": {
        "value": "'off'",
        "computed": false
      },
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "Set the value of the autoComplete attribute on the input. For example, set it to phone to tell the browser where to auto complete phone numbers."
    },
    "telInputProps": {
      "defaultValue": {
        "value": "{}",
        "computed": false
      },
      "type": {
        "name": "object"
      },
      "required": false,
      "description": "Pass through arbitrary props to the tel input element."
    },
    "format": {
      "defaultValue": {
        "value": "false",
        "computed": false
      },
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Format the number."
    },
    "onFlagClick": {
      "defaultValue": {
        "value": "null",
        "computed": false
      },
      "type": {
        "name": "func"
      },
      "required": false,
      "description": "Allow main app to do things when flag icon is clicked."
    },
    "value": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "The value of the input field. Useful for making input value controlled from outside the component."
    },
    "placeholder": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "Static placeholder for input controller. When defined it takes priority over autoPlaceholder."
    },
    "style": {
      "type": {
        "name": "custom",
        "raw": "StylePropTypes"
      },
      "required": false,
      "description": "Style object for the wrapper div. Useful for setting 100% width on the wrapper, etc."
    }
  }
};
