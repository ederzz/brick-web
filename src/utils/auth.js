
// 本地保存登录权限信息
export const storeAuth = (tokenInfo) => {
  console.log('设置 token',tokenInfo)
  sessionStorage.token = tokenInfo.token
  sessionStorage.activeTime =  Date.now()
  localStorage.refreshToken = tokenInfo.refreshToken
  localStorage.setItem('setSession', JSON.stringify(sessionStorage));// 登录成功 addEventListener('storage'
  localStorage.removeItem('setSession');
  //localStorage.setItem('getSession', Date.now()); // addEventListener('storage'
};

// 清除登录相关信息
export const clearLogin = () => {
  console.log('clearLogin')
  //sessionStorage.clear()
  //localStorage.removeItem('refreshToken')
  localStorage.setItem('loginOut', Date.now());// 退出 addEventListener('storage'
}

// 如果用户活跃时间超过2个小时就退出
const verifyTime = () => {
  if (Date.now() - sessionStorage.activeTime >= 3600 * 5 * 1000) {
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