const startApp = () => {
  var images = []

  function addImages() {
    var div = document.createElement('div')
    for (var i = 0; i <= 23; i++) {
      if (i % 6 == 0) {
        div = document.createElement('div')
        div.className = 'row'
      }
      var colDiv = document.createElement('div')
      var image = document.createElement('img')
      var btn = document.createElement('button')
      var btnadd = document.createElement('button')
      var isShowingFront = true
      var buttontog = true
      image.setAttribute('src', 'cards/' + i + '.png')
      image.setAttribute('id', 'Card' + i)
      btnadd.innerHTML = 'Add card'
      btnadd.className = 'buttonCards'
      btn.innerHTML = '< >'
      btn.className = 'buttonCards'
      colDiv.className = 'col-md-2'
      image.className = 'zoom'
      addListeners(image, btn, btnadd, i, isShowingFront, buttontog)
      colDiv.appendChild(image)
      colDiv.appendChild(btn)
      colDiv.appendChild(btnadd)
      div.appendChild(colDiv)
      if (i % 6 == 0) {
        document.querySelector('.test').appendChild(div)
      }
    }
  }
  function addListeners(image, button, button1, i, isShowingFront, buttontog) {
    image.addEventListener('click', function () {
      window.open(image.src)
    })

    button.addEventListener('click', () => {
      if (isShowingFront) {
        image.setAttribute('src', 'cards/' + i + '-back.png')
      } else {
        image.setAttribute('src', 'cards/' + i + '.png')
      }
      isShowingFront = !isShowingFront
    })
    button1.addEventListener('click', () => {
      if (buttontog) {
        if (!images.includes(i)) {
          images.push(i)
        }
        button1.innerHTML = 'Remove card'
        button1.className = 'buttonCardsRm'
      } else {
        let index = images.indexOf(i)
        images.splice(index, 1)
        button1.innerHTML = 'Add card'
        button1.className = 'buttonCards'
      }
      buttontog = !buttontog
    })
  }
  function addSubmit() {
    const playBtn = document.getElementById('introbtn')
    const introScreen = document.querySelector('.test')
    const wheelScreen = document.querySelector('.wheel')
    const ListOfImages = document.querySelector('.ImageList')
    var clicked = true
    playBtn.addEventListener('click', () => {
      if (clicked) {
        introScreen.classList = 'test'
        introScreen.style.display = 'none'
        wheelScreen.style.display = 'block'
        ListOfImages.style.display = 'block'
        for (var j = 0; j < images.length; j++) {
          if (j % 4 == 0) {
            div = document.createElement('div')
            div.className = 'row'
          }
          var image = document.createElement('img')
          div = document.createElement('div')
          mydivHeader = document.createElement('div')
          inpt = document.createElement('input')
          inpt.setAttribute('type', 'text')
          inpt.setAttribute('value', j + 1)
          inpt.className = 'cardinpt'
          mydivHeader.setAttribute('id', 'mydivheader' + j)
          mydivHeader.className = 'mydivheader col-md-3'
          div.className = 'mydiv col-md-3'
          document.querySelector('.ImageList').appendChild(div)
          image.className = 'col-md-3'
          image.setAttribute('src', 'cards/' + images[j] + '.png')
          mydivHeader.appendChild(inpt)
          div.appendChild(mydivHeader)
          div.appendChild(image)
          dragElement(div)
          if (j % 4 == 0) {
            document.querySelector('.ImageList').appendChild(div)
          }
        }
        if(images.length==j && images.length>0){
          console.log(images.length)
          inpt.setAttribute('value', 24)
        }

        playBtn.innerHTML = 'Show cards!'
      } else {
        document.querySelector('.ImageList').innerHTML = ''
        introScreen.style.display = 'block'
        wheelScreen.style.display = 'none'
        ListOfImages.style.display = 'none'
        playBtn.innerHTML = 'Show wheel!'
      }
      clicked = !clicked
    })
  }
  //Make the DIV element draggagle:
  //

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0
    if (document.getElementById(elmnt.id + 'header')) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown
    }

    function dragMouseDown(e) {
      e = e || window.event
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
    }

    function elementDrag(e) {
      e = e || window.event
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px'
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px'
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null
      document.onmousemove = null
    }
  }
  addSubmit()
  addImages()
}

startApp()
