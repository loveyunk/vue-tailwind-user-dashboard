import request from '../utils/request';

const queryUserList = params => {
  return request({
    method: 'get',
    url: `/users`,
    params
  });
};

export const removeUser = id => {
  return request({
    method: 'delete',
    url: `/users/${id}`
  });
};

const createUser = user => {
  return request({
    data: user,
    method: 'post',
    url: '/users'
  });
};

const updateUser = (id, user) => {
  return request({
    data: user,
    method: 'put',
    url: `/users/${id}`
  });
};

export default {
  queryUserList,
  createUser,
  updateUser,
  removeUser
};
