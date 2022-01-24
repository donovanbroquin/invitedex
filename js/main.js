const controls = ['left', 'top', 'right', 'bottom']

controls.forEach(control =>
  document
    .getElementById(control)
    .addEventListener('click', () => console.log('clicked', control))
)

function boot() {
  let container = document.querySelector('#screen__content')

  container.innerHTML = `<div id="boot">Chargement</div>`

  const content = document.querySelector('#boot')
  const loader = setInterval(() => {
    if (content.innerHTML === 'Chargement...')
      return (content.innerHTML = 'Chargement.')

    return (content.innerHTML = content.innerHTML + '.')
  }, 800)

  const endAfter = Math.floor(Math.random() * 10) * 900
  setTimeout(() => cleanLoading(loader, content), endAfter)
}

function cleanLoading(loader, content) {
  clearInterval(loader)

  content.innerHTML = 'Chargement terminé'
}

boot()
