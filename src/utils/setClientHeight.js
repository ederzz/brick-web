const setClientHeight = (isFull) => {
  const html = document.getElementsByTagName('html')[0]
  const body = document.getElementsByTagName('body')[0]
  const root = document.getElementById('root')
  const app = document.getElementById('app')

  if(isFull) {
    html.style.height = '100%'
    body.style.height = '100%'
    root.style.height = '100%'
    app.style.height = '100%'
  }else{
    html.style.height = 'auto'
    body.style.height = 'auto'
    root.style.height = '100%'
    app.style.height = '100%'
  }
}

export default setClientHeight