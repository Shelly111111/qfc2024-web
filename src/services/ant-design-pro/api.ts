// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';
import {sources} from "@umijs/bundler-webpack/compiled/webpack";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /oauth/token */
const login = async (loginForm) => {
  const params = new URLSearchParams();
  // console.log(loginForm)
  params.append('username', loginForm.username);
  params.append('password', loginForm.password);
  params.append('grant_type', 'password');
  params.append('scope', 'all');
  params.append('client_id', 'client_1');
  params.append('client_secret', 'secret');
  return request('http://localhost:8081/oauth/token', {
    method: 'POST',
    data: params
  });
}

/** 退出登录接口 POST /oauth/revoke */
const outLogin = async () => {
  return request('http://localhost:8081/oauth/revoke', {
    method: 'POST'
  });
}
// export async function outLogin(options?: { [key: string]: any }) {
//   return request<Record<string, any>>('http://localhost:8081/oauth/revoke', {
//     method: 'POST',
//     // ...(options || {}),
//   });
// }
export {login, outLogin};

/** 退出登录接口 POST /log_analysis/upload */
export const uploadFile = async (option: any) => {
  // console.log(option)
  const {onSuccess, onError, file,} = option
  const formData = new FormData()
  formData.append('file', file)

  return request('/api/log_analysis/upload', {
    method: 'POST',
    data: formData,
  }).then((res) => {
    if (res.code !== 200) {
      onError(res.message, res);
      return;
    }
    onSuccess(res, file);
  })
    .catch(onError);
}

export const analysisFile = async (filename) => {
  const formData = new FormData()
  formData.append('file', filename)
  return request('/api/log_analysis/analysis', {
    method: 'POST',
    data: formData,
  });
}

// /** 此处后端没有提供注释 GET /api/notices */
// export async function getNotices(options?: { [key: string]: any }) {
//   return request<API.NoticeIconList>('/api/notices', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
//
// /** 获取规则列表 GET /api/rule */
// export async function rule(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.RuleList>('/api/rule', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
//
// /** 更新规则 PUT /api/rule */
// export async function updateRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/api/rule', {
//     method: 'POST',
//     data: {
//       method: 'update',
//       ...(options || {}),
//     }
//   });
// }
//
// /** 新建规则 POST /api/rule */
// export async function addRule(options?: { [key: string]: any }) {
//   return request<API.RuleListItem>('/api/rule', {
//     method: 'POST',
//     data: {
//       method: 'post',
//       ...(options || {}),
//     }
//   });
// }
//
// /** 删除规则 DELETE /api/rule */
// export async function removeRule(options?: { [key: string]: any }) {
//   return request<Record<string, any>>('/api/rule', {
//     method: 'POST',
//     data: {
//       method: 'delete',
//       ...(options || {}),
//     }
//   });
// }
