import request from '../utils/request';

export const getList = () => {
  return request({
    url: 'https://www.easy-mock.com/mock/5b39e6c9ea0f1f3c1721a19a/biz-scaffold/list',
    method: 'get',
    params: {}
  });
};