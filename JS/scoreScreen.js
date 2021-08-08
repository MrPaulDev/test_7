'use strict'


function createElem(tag, className, id) {
	const elem = document.createElement(tag)
			elem.className = className
	
			if(id !== undefined) elem.id = id

	return elem
}
// create constant's of dyration << Pause >> (between add and remove)
const dyration_remove = 300
const dyration_add = 300;

// create and append Score Screen
const scoreScreen = createElem('div', 'scoreScreen')
		document.querySelector('.wrap').prepend(scoreScreen)

// create message templates
const message_start = `READY?\ntap to start`


function sendMessage({text, fontSize, color}){
	// get parent and child (last message)
	const screen = document.querySelector('.scoreScreen')
	const current_message = screen.querySelector('.message')

	// 1. delete previous message
	if(current_message !== null){
		current_message.classList.add('finalPos')
		setTimeout(()=> current_message.remove(), dyration_remove)
	}

	// 2. send new message
	const message = createElem('p', 'message initialPos')
			message.textContent = text
			message.style.fontSize = fontSize
			message.style.color = color
	
			setTimeout(()=>{ 
				// append after dyration_remove
				screen.append(message)
				setTimeout(() => message.classList.remove('initialPos'), 30)
			}, dyration_add + 120)
}

