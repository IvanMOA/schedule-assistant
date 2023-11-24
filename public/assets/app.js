/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/css/app.css":
/*!*******************************!*\
  !*** ./resources/css/app.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/app.css */ "./resources/css/app.css");

console.log(' testing app.js ');
document.addEventListener('alpine:init', function () {
  console.log('Init alpine');
  Alpine.store('toast', {
    message: null
  });
});
document.addEventListener('htmx:responseError', function (event) {
  var toastStore = Alpine.store('toast');
  toastStore.message = errorMessage(event.detail.xhr.response);
  var TOAST_DURATION = 3000;
  setTimeout(function () {
    toastStore.message = null;
  }, TOAST_DURATION);
});
function errorMessage(responseBody) {
  try {
    var _json$error;
    var json = JSON.parse(responseBody);
    return (json === null || json === void 0 || (_json$error = json.error) === null || _json$error === void 0 ? void 0 : _json$error.message) || 'Error desconocido';
  } catch (e) {
    return 'Error desconocido';
  }
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ051QjtBQUN2QkEsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7QUFDL0JDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFlBQU07RUFDN0NILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztFQUMxQkcsTUFBTSxDQUFDQyxLQUFLLENBQUMsT0FBTyxFQUFFO0lBQ3BCQyxPQUFPLEVBQUU7RUFDWCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRkosUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRSxVQUFDSSxLQUFLLEVBQUs7RUFDekQsSUFBTUMsVUFBVSxHQUFHSixNQUFNLENBQUNDLEtBQUssQ0FBQyxPQUFPLENBQUM7RUFDeENHLFVBQVUsQ0FBQ0YsT0FBTyxHQUFHRyxZQUFZLENBQUNGLEtBQUssQ0FBQ0csTUFBTSxDQUFDQyxHQUFHLENBQUNDLFFBQVEsQ0FBQztFQUM1RCxJQUFNQyxjQUFjLEdBQUcsSUFBSTtFQUMzQkMsVUFBVSxDQUFDLFlBQU07SUFDZk4sVUFBVSxDQUFDRixPQUFPLEdBQUcsSUFBSTtFQUMzQixDQUFDLEVBQUVPLGNBQWMsQ0FBQztBQUNwQixDQUFDLENBQUM7QUFDRixTQUFTSixZQUFZQSxDQUFDTSxZQUFZLEVBQUU7RUFDbEMsSUFBSTtJQUFBLElBQUFDLFdBQUE7SUFDRixJQUFNQyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDSixZQUFZLENBQUM7SUFDckMsT0FBTyxDQUFBRSxJQUFJLGFBQUpBLElBQUksZ0JBQUFELFdBQUEsR0FBSkMsSUFBSSxDQUFFRyxLQUFLLGNBQUFKLFdBQUEsdUJBQVhBLFdBQUEsQ0FBYVYsT0FBTyxLQUFJLG1CQUFtQjtFQUNwRCxDQUFDLENBQUMsT0FBT2UsQ0FBQyxFQUFFO0lBQ1YsT0FBTyxtQkFBbUI7RUFDNUI7QUFDRixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NoZWR1bGUtYXNzaXN0YW50Ly4vcmVzb3VyY2VzL2Nzcy9hcHAuY3NzPzIxODQiLCJ3ZWJwYWNrOi8vc2NoZWR1bGUtYXNzaXN0YW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NjaGVkdWxlLWFzc2lzdGFudC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3NjaGVkdWxlLWFzc2lzdGFudC8uL3Jlc291cmNlcy9qcy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vY3NzL2FwcC5jc3MnXG5jb25zb2xlLmxvZygnIHRlc3RpbmcgYXBwLmpzICcpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhbHBpbmU6aW5pdCcsICgpID0+IHtcbiAgY29uc29sZS5sb2coJ0luaXQgYWxwaW5lJylcbiAgQWxwaW5lLnN0b3JlKCd0b2FzdCcsIHtcbiAgICBtZXNzYWdlOiBudWxsLFxuICB9KVxufSlcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaHRteDpyZXNwb25zZUVycm9yJywgKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHRvYXN0U3RvcmUgPSBBbHBpbmUuc3RvcmUoJ3RvYXN0JylcbiAgdG9hc3RTdG9yZS5tZXNzYWdlID0gZXJyb3JNZXNzYWdlKGV2ZW50LmRldGFpbC54aHIucmVzcG9uc2UpXG4gIGNvbnN0IFRPQVNUX0RVUkFUSU9OID0gMzAwMFxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICB0b2FzdFN0b3JlLm1lc3NhZ2UgPSBudWxsXG4gIH0sIFRPQVNUX0RVUkFUSU9OKVxufSlcbmZ1bmN0aW9uIGVycm9yTWVzc2FnZShyZXNwb25zZUJvZHkpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShyZXNwb25zZUJvZHkpXG4gICAgcmV0dXJuIGpzb24/LmVycm9yPy5tZXNzYWdlIHx8ICdFcnJvciBkZXNjb25vY2lkbydcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiAnRXJyb3IgZGVzY29ub2NpZG8nXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiQWxwaW5lIiwic3RvcmUiLCJtZXNzYWdlIiwiZXZlbnQiLCJ0b2FzdFN0b3JlIiwiZXJyb3JNZXNzYWdlIiwiZGV0YWlsIiwieGhyIiwicmVzcG9uc2UiLCJUT0FTVF9EVVJBVElPTiIsInNldFRpbWVvdXQiLCJyZXNwb25zZUJvZHkiLCJfanNvbiRlcnJvciIsImpzb24iLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImUiXSwic291cmNlUm9vdCI6IiJ9