/**
 * @author suncan
 * @date 2018/6/14
 * @description: 入口文件
 */

import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import rootReducer from './reducers';
import rootSaga from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <AppRouter />
    </LocaleProvider>
  </Provider>,
  document.getElementById('app')
);