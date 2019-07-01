
// 本地保存登录权限信息
export const storeAuth = (tokenInfo) => {
  sessionStorage.token = tokenInfo.token
  sessionStorage.activeTime =  Date.now()
  localStorage.refreshToken = tokenInfo.refreshToken
  //localStorage.setItem('getSession', Date.now());
};

// 清除登录相关信息
export const clearLogin = () => {
  sessionStorage.clear()
  localStorage.removeItem('refreshToken')
}

// 如果用户活跃时间超过2个小时就退出
const verifyTime = () => {
  if (Date.now() - sessionStorage.activeTime >= 7200 * 1000) {
    clearLogin()
  }
}

const loggedIn = () => {
  if (typeof sessionStorage.activeTime !== 'undefined') {
    // 验证登录是否超时
    verifyTime()
    return typeof sessionStorage.token !== 'undefined'
  }
  return false
}

export default loggedIn