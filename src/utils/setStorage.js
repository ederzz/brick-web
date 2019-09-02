const setStorage = (cb,loginOut) => {
  console.log('setStorage')
  //入口，用于触发核心事件
  if (!sessionStorage.length) {
    console.log('入口')
    localStorage.setItem('getSessionNew', Date.now());
  };

  // 该事件是核心
  window.addEventListener('storage', function(event) {
    console.log('event',event)

    // 已经打开的其它窗口
    if(event.key == 'setSession' && event.newValue) {
      this.console.log('已经打开的其它窗口')
      let data = JSON.parse(event.newValue);
      //赋给这个窗口的sessionStorage
      for (let key in data) {
        sessionStorage.setItem(key, data[key]);
      }
      cb && cb()
    }

    //已有窗口
    if (event.key == 'getSessionNew') {
      this.console.log('已有窗口')
      localStorage.setItem('setSessionNew', JSON.stringify(sessionStorage));
      localStorage.removeItem('setSessionNew');

    }

    //新开窗口
    if(event.key == 'setSessionNew' && !sessionStorage.length) {
      this.console.log('新开窗口')
      let data = JSON.parse(event.newValue);
      //赋给这个窗口的sessionStorage
      for (let key in data) {
        sessionStorage.setItem(key, data[key]);
      }
      cb && cb()
    }

    if(event.key == 'loginOut') {
      this.console.log('退出')
      sessionStorage.clear()
      localStorage.removeItem('refreshToken')
      loginOut()
    }
  });
}

export default setStorage