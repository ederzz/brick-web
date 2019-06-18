const fiels = {
  "normal/layout": {
    html: '<!DOCTYPE html><html><head></head><body class="body"><div class="top">{{top}}</div><div class="container"><div class="left">{{left}}</div><div class="main">{{main}}</div><div class="footer">{{footer}}</div></div></body></html>',
    css: 'html,.body{height: 200%;margin: 0;}.top{height: 60px;background:#cfcfcf;}.container{position:relative;height:calc(100% - 60px);padding-left:200px;}.left{position:absolute;top:0;left:0;width:200px;height:100%;}.main{height:80%;}.footer{height: 20%;background:#cfcfcf;}',
    js: 'console.log(1)'
  },
  "top/qq.com":{
    html: '<div>top</div>',
    css: '',
    js: 'console.log(2)'
  },
  "left/163.com":{
    html: '<div class="left-163">left</div>',
    css: '.left-163{height: 100%;border-right: 1px solid #cfcfcf;}',
    js: 'console.log(3)'
  },
  "main/sina.com":{
    html: '<div>{{head}}{{list}}{{page}}</div>',
    css: '',
    js: 'console.log(4)'
  },
  "head/antd.io":{
    html: '<div>head</div>',
    css: '',
    js: 'console.log(5)'
  },
  "list/baidu.com":{
    html: '<div>list</div>',
    css: '',
    js: 'console.log(6)'
  },
  "page/google.com":{
    html: '<div>page</div>',
    css: '',
    js: 'console.log(7)'
  },
  "a1/b1":{
    html: '<div>{{head}}</div>',
    css: '',
    js: 'console.log(8)'
  },
  "a11/b11":{
    html: '<div>f1</div>',
    css: '',
    js: 'console.log(9)'
  },
  "a2/b2":{
    html: '<div>{{head}}</div>',
    css: '',
    js: 'console.log(10)'
  },
  "a21/b21":{
    html: '<div>f2</div>',
    css: '',
    js: 'console.log(11)'
  },
}

export default fiels