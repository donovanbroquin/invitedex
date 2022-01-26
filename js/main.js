import chunk from 'lodash.chunk'

const container = document.querySelector('#screen__content')
const guests = chunk(JSON.parse(import.meta.env.VITE_GUESTS), 6)
const controls = ['left', 'top', 'right', 'bottom']

console.log(guests)

controls.forEach(control =>
  document
    .getElementById(control)
    .addEventListener('click', () => console.log('clicked', control))
)

function buildItem(guest) {
  const el = document.createElement('li')

  el.classList.add('guest__item')
  el.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="guest__chevron"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M9 5l7 7-7 7"
  />
</svg>`
  el.appendChild(document.createTextNode(guest.name))

  return el
}

function showGuests() {
  let currentChunkId = 0
  let currentGuestId = 0

  let guestsScreen = document.createElement('ul')
  guestsScreen.classList.add('guests')

  guests[currentChunkId]
    .map(buildItem)
    .map((guest, idx) => {
      if (idx === currentGuestId) guest.classList.add('current')

      return guest
    })
    .forEach(guest => guestsScreen.appendChild(guest))

  container.innerHTML = ''
  container.appendChild(guestsScreen)
}

function boot() {
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

  setTimeout(showGuests, 600)
}

boot()
