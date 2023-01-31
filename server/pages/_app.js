(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 703:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(764);
// EXTERNAL MODULE: ./styles/toastr.css
var toastr = __webpack_require__(295);
;// CONCATENATED MODULE: external "react-redux"
const external_react_redux_namespaceObject = require("react-redux");
;// CONCATENATED MODULE: external "redux"
const external_redux_namespaceObject = require("redux");
;// CONCATENATED MODULE: external "redux-logger"
const external_redux_logger_namespaceObject = require("redux-logger");
;// CONCATENATED MODULE: ./redux/allLoadings/reducer.tsx
// ------------------------------------------------------------------------- //
// selectors
// ------------------------------------------------------------------------- //
const selectAllLoading = (state)=>state.allLoadings;
const loadingSelector = (actions)=>(state)=>{
        // returns true if an action is in loading
        return actions.some((action)=>state.allLoadings[action]);
    };
const loadingSelectorFromAllLoading = (actions)=>(allLoadings)=>{
        // returns true if an action is in loading
        return actions.some((action)=>allLoadings[action]);
    };
// ------------------------------------------------------------------------- //
// reducers
// ------------------------------------------------------------------------- //
function reducer(state = {}, action) {
    const { type  } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
    // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
    if (!matches) {
        return state;
    }
    const [, requestName, requestState] = matches;
    return {
        ...state,
        // Store whether a request is happening at the moment or not
        // e.g. will be true when receiving GET_TODOS_REQUEST
        //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
        [requestName]: requestState === "REQUEST"
    };
}

;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = require("lodash");
;// CONCATENATED MODULE: ./redux/allErrors/reducer.tsx
// api/errorReducer.js

// ------------------------------------------------------------------------- //
// selectors
// ------------------------------------------------------------------------- //
const selectAllErrors = (state)=>state.allErrors;
const errorSelector = (actions)=>(state)=>{
        return _(actions).map((action)=>state.allErrors[action]).compact().first() || undefined;
    };
const errorSelectorFromAllErrors = (actions)=>(allErrors)=>{
        const errorsForActions = actions.map((action)=>allErrors[action]);
        if (errorsForActions && errorsForActions[0]) {
            return errorsForActions[0];
        }
        return null;
    };
// ------------------------------------------------------------------------- //
// reducer
// ------------------------------------------------------------------------- //
const initialState = {
};
const errorReducer = (state = initialState, action)=>{
    const { type , payload  } = action;
    const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);
    // not a *_REQUEST / *_FAILURE actions, so we ignore them
    if (!matches) {
        return state;
    }
    const [, requestName, requestState] = matches;
    return {
        ...state,
        // Store errorMessage
        // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
        //      else clear errorMessage when receiving GET_TODOS_REQUEST
        [requestName]: requestState === "FAILURE" ? payload : null
    };
};
/* harmony default export */ const allErrors_reducer = (errorReducer);

;// CONCATENATED MODULE: ./redux/activepath/types.tsx
// -------------------------------------------------------------------------------- //
// Actions //
// -------------------------------------------------------------------------------- //
const SET_ACTIVE_PATH = "SET_ACTIVE_PATH";

;// CONCATENATED MODULE: ./redux/activepath/reducer.tsx

const reducer_initialState = {
    path: null
};
function reducer_reducer(state = reducer_initialState, action) {
    switch(action.type){
        case SET_ACTIVE_PATH:
            {
                return {
                    ...state,
                    path: action.payload
                };
            }
        default:
            return {
                ...state
            };
    }
}

;// CONCATENATED MODULE: ./redux/reducers.tsx



/* harmony default export */ const reducers = ({
    allLoadings: reducer,
    allErrors: allErrors_reducer,
    activePath: reducer_reducer
});

;// CONCATENATED MODULE: external "redux-thunk"
const external_redux_thunk_namespaceObject = require("redux-thunk");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_namespaceObject);
;// CONCATENATED MODULE: ./www/utils/LoggerUtils.tsx
const isInDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";
const isInProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";
const disableLogInProduction = ()=>{
    if (isInProduction) {
        console.log = console.warn = console.error = function() {};
    }
};

;// CONCATENATED MODULE: ./redux/store.tsx





const combinedReducer = (0,external_redux_namespaceObject.combineReducers)({
    ...reducers
});
const configureStore = (preLoadedState)=>{
    /* -------------------------- Middle wares ------------------------ */ const loggerMiddleware = (0,external_redux_logger_namespaceObject.createLogger)();
    const defaultMiddleWares = [
        (external_redux_thunk_default())
    ];
    const withLoggerMiddleWares = [
        (external_redux_thunk_default()),
        loggerMiddleware
    ];
    const middleWares = isInDevelopment ? withLoggerMiddleWares : defaultMiddleWares;
    const middlewareEnhancer = (0,external_redux_namespaceObject.applyMiddleware)(...middleWares);
    /* -------------------------- Enhancers ------------------------ */ const enhancers = [
        middlewareEnhancer
    ];
    // @ts-ignore
    const composeEnhancers = // eslint-disable-next-line @typescript-eslint/ban-ts-comment
     false ? // @ts-ignore
    0 : external_redux_namespaceObject.compose;
    const composedEnhancers = composeEnhancers(...enhancers);
    /* -------------------------- Creating the main store ------------------------ */ const rootReducer = (state, action)=>{
        if (action.type === "RESET_REDUX") {
            const { Language  } = state;
            state = {
                Language
            };
        }
        return combinedReducer(state, action);
    };
    return (0,external_redux_namespaceObject.createStore)(rootReducer, preLoadedState, composedEnhancers);
};
const myStore = configureStore({});
/* harmony default export */ const store = (myStore);

;// CONCATENATED MODULE: ./pages/_app.js






function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_namespaceObject.Provider, {
        store: store,
        children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 764:
/***/ (() => {



/***/ }),

/***/ 295:
/***/ (() => {



/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(703));
module.exports = __webpack_exports__;

})();