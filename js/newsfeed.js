let currentQuote = ''
let isNewsfeedOpen = false
let letters = ""
let letterIndex = 0
let timeout1 = null
let newsfeedPanel = null
let newsfeedBody = null


export function init(){
  newsfeedPanel = document.querySelector(".newsfeed_panel")
  newsfeedBody = document.querySelector(".newsfeed_body")
  document.querySelector(".newsfeed_icon").addEventListener("click", (e) => {openNewsfeed(e)})
  document.querySelector(".newsfeed_close_btn").addEventListener("click", (e) => {closeNewsfeed(e)})
}

async function getNewsData(){
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+getRandomNum() )
    const result = await response.json()
    currentQuote = result.title.replace(/^./, result.title[0].toUpperCase())

  } catch (error) {
    console.log('ERROR: ', error)
  }
}

function getRandomNum(){
  return Math.floor(Math.random() * 100) + 1
}

function openNewsfeed(){
  if(isNewsfeedOpen) return
  isNewsfeedOpen = true
  getNewsData()
  newsfeedPanel.style.display = "inline-block"
  newsfeedBody.innerHTML = letters
  typeText()
}

function closeNewsfeed(){
  isNewsfeedOpen = false
  newsfeedPanel.style.display = "none"
  resetNewsfeed()
}

async function typeText(){
  letters = currentQuote.slice(0, ++letterIndex)
  newsfeedBody.innerHTML = letters
  if(letters.length === currentQuote.length){
    letterIndex = 0
    letters = ""
    await getNewsData()
    timeout1 = setTimeout(typeText, 800)
  }
  else{
    if(letters[letters.length-1] === ' '){
      typeText()
    }
    else{
      timeout1 = setTimeout(typeText, 300)
    }
  }
}

function resetNewsfeed(){
  clearTimeout(timeout1)
  letters = ""
  letterIndex = 0
  currentQuote = ""
}
