const setStorage = (cb) => {
  //console.log('setStorage')
  //入口，用于触发核心事件
  if (!sessionStorage.length) {
    console.log('入口')
    localStorage.setItem('getSession', Date.now());
  };

  // 该事件是核心
  window.addEventListener('storage', function(event) {
    console.log('event',event)
    //已有窗口
    if (event.key == 'getSession') {
      localStorage.setItem('setSession', JSON.stringify(sessionStorage));
      localStorage.removeItem('setSession');

    }
    //新开窗口
    else if(event.key == 'setSession' && !sessionStorage.length) {
      let data = JSON.parse(event.newValue);
      //赋给这个窗口的sessionStorage
      for (let key in data) {
        sessionStorage.setItem(key, data[key]);
      }
      cb && cb()
    }
  });
}

export default setStorage