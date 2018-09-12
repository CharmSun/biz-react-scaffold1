import {Spin} from 'antd';
import Loadable from 'react-loadable';

const lazyLoad = (loader) => Loadable({
  loader: loader,
  loading: Spin,
});

// const StyleList = lazyLoad(() => import(/* webpackChunkName: "overview" */'./overview/mobile-style-list'));
// const StyleConfig = lazyLoad(() => import(/* webpackChunkName: "styleConfig" */'./style-config/list'));
// const ConfigSteps = lazyLoad(() => import(/* webpackChunkName: "styleConfig" */'./style-config/config-steps'));

const routes = [
  // {path: '/', component: StyleList, exact: true},
  // {path: '/overview', component: StyleList, exact: true},
  // {path: '/styleConfig', component: StyleConfig, exact: true},
  // {path: '/styleConfig/:styleId', component: ConfigSteps, exact: true},
  // {path: '/styleConfig/:versionId/:step', component: ConfigSteps, exact: true}
];

export default routes;