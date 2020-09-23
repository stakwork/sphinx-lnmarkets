"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("regenerator-runtime/runtime.js");

var Sphinx = _interopRequireWildcard(require("sphinx-bot"));

var fetch = _interopRequireWildcard(require("node-fetch"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

var msg_types = Sphinx.MSG_TYPE;
var initted = false;
var lnmarketsToken = process.env.LNMARKETS_TOKEN;
var sphinxToken = process.env.SPHINX_TOKEN;
var url = 'https://api.lnmarkets.com';

function init() {
  if (initted) return;
  initted = true;
  var client = new Sphinx.Client();
  client.login(sphinxToken);
  client.on(msg_types.INSTALL, /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(message) {
      var embed;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              embed = new Sphinx.MessageEmbed().setAuthor('LNMarkets').setDescription('Welcome to LNMarkets!').setThumbnail(botSVG);
              message.channel.send({
                embed: embed
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  client.on(msg_types.MESSAGE, /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(message) {
      var arr, cmd, isAdmin, _embed, r, j, embed, r2, j2, fields, embed2, embed3;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              arr = message.content.split(' ');

              if (!(arr.length < 2)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              if (!(arr[0] !== '/lnm')) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              cmd = arr[1];
              isAdmin = message.member.roles.find(function (role) {
                return role.name === 'Admin';
              });
              _context2.t0 = cmd;
              _context2.next = _context2.t0 === 'balance' ? 10 : _context2.t0 === 'positions' ? 27 : 42;
              break;

            case 10:
              if (isAdmin) {
                _context2.next = 14;
                break;
              }

              _embed = new Sphinx.MessageEmbed().setAuthor('LNMarkets').setDescription('You must be an Admin to use this command').setThumbnail(botSVG);
              message.channel.send({
                embed: _embed
              });
              return _context2.abrupt("return");

            case 14:
              _context2.next = 16;
              return fetch(url + '/user', {
                headers: {
                  'Authorization': "Bearer ".concat(lnmarketsToken),
                  'Accept': 'application/json'
                }
              });

            case 16:
              r = _context2.sent;

              if (r.ok) {
                _context2.next = 19;
                break;
              }

              return _context2.abrupt("return");

            case 19:
              _context2.next = 21;
              return r.json();

            case 21:
              j = _context2.sent;

              if (j.balance) {
                _context2.next = 24;
                break;
              }

              return _context2.abrupt("return");

            case 24:
              embed = new Sphinx.MessageEmbed().setAuthor('LNMarkets').setDescription('Your balance is: ' + j.balance).setThumbnail(botSVG);
              message.channel.send({
                embed: embed
              });
              return _context2.abrupt("return");

            case 27:
              _context2.next = 29;
              return fetch(url + '/positions', {
                headers: {
                  'Authorization': "Bearer ".concat(lnmarketsToken),
                  'Accept': 'application/json'
                }
              });

            case 29:
              r2 = _context2.sent;

              if (r2.ok) {
                _context2.next = 32;
                break;
              }

              return _context2.abrupt("return");

            case 32:
              _context2.next = 34;
              return r2.json();

            case 34:
              j2 = _context2.sent;

              if (j2 && Array.isArray(j2)) {
                _context2.next = 37;
                break;
              }

              return _context2.abrupt("return");

            case 37:
              fields = j2.map(function (p) {
                var date = (0, _moment.default)(p.creation_ts).format('ddd, MMM DD h:mm');
                return {
                  name: date,
                  value: "Price: ".concat(p.price, ", Take Profit: ").concat(p.takeprofit, ", Margin: ").concat(p.margin)
                };
              });
              console.log(fields);
              embed2 = new Sphinx.MessageEmbed().setAuthor('LNMarkets').setTitle('Positions:').addFields(fields).setThumbnail(botSVG);
              message.channel.send({
                embed: embed2
              });
              return _context2.abrupt("return");

            case 42:
              embed3 = new Sphinx.MessageEmbed().setAuthor('LNMarkets').setTitle('LNMarkets Commands:').addFields([{
                name: 'Balance',
                value: '/lnm balance'
              }, {
                name: 'Positions',
                value: '/lnm positions'
              }, {
                name: 'Help',
                value: '/lnm help'
              }]).setThumbnail(botSVG);
              message.channel.send({
                embed: embed3
              });
              return _context2.abrupt("return");

            case 45:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

var botSVG = "<svg viewBox=\"64 64 896 896\" height=\"12\" width=\"12\" fill=\"white\">\n  <path d=\"M300 328a60 60 0 10120 0 60 60 0 10-120 0zM852 64H172c-17.7 0-32 14.3-32 32v660c0 17.7 14.3 32 32 32h680c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-32 660H204V128h616v596zM604 328a60 60 0 10120 0 60 60 0 10-120 0zm250.2 556H169.8c-16.5 0-29.8 14.3-29.8 32v36c0 4.4 3.3 8 7.4 8h729.1c4.1 0 7.4-3.6 7.4-8v-36c.1-17.7-13.2-32-29.7-32zM664 508H360c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z\" />\n</svg>";
init();
//# sourceMappingURL=index.js.map