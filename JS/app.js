'use strict'


function createCollection(tag, className, length, collection = []) {
	for(let index = 0; index < length; index++){
		collection.push(createElem(tag, className))
	}

	return collection
}
function createElem(tag, className, id) {
	const elem = document.createElement(tag)
			elem.className = className
	
			if(id !== undefined) elem.id = id

	return elem
}
function random(max, min) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}



// color's
const colors = [
	'lightblue',
	'lightcoral',
	'antiquewhite',
	'darkseagreen',
	'lemonchiffon',
	'midnightblue',
]

const color_close = 'snow';

// click's counter
let count = 0;

// create color's for one game
// clone array with help spred operator ...arr
const raund_collors = [...colors, ...colors]
		raund_collors.sort(()=> 0.5 - Math.random())

// create collection of DOM element's
const collection = createCollection('div', 'elem', raund_collors.length);
		collection.forEach((item, index) => item.setAttribute('order', index))

// append element's in DOM
		collection.forEach(item => document.querySelector('.field').append(item))

// create first Animation
		startView(collection);

// set Event Listner on parent container
const field = document.querySelector('.field')
		field.addEventListener('click', showColor)



// create event handler
function showColor(event) {
	if(event.target.classList.contains('elem')) {
		count++;

		const elem = event.target;
		const order = elem.getAttribute('order')

				// show color
				elem.style.background = raund_collors[order];
				// set class for seatch open couples
				elem.classList.add('open')
		
		// click check		
		if(count === 2) {
			compareElems()
			count = 0
		}
	}
}

// compare couple's
function compareElems() {
	const compare_collection = document.querySelectorAll('.open');

	// double click by one element
	if(compare_collection.length === 1) {
		 cleanField()
		 sendMessage(createMessDescript('Try again', '#cd5c5cb0'))
		 return
	}

	// target case 
	if(compare_collection[0].style.background === compare_collection[1].style.background) {
		compare_collection.forEach(item => item.className = 'showElem')
		sendMessage(createMessDescript('Great', '#9acd32a3'))
		return
	}

	// other case's
	cleanField()
	sendMessage(createMessDescript('Try again', '#add8e6d1'))

}

// clean game field
function cleanField() {
	// get all elem's (no couple's showElem < --- showElem)
	const clean_collection = document.querySelectorAll('.elem')
			

			setTimeout(() => clean_collection.forEach(item =>{
				// clean class 'open'
				 item.classList.remove('open')
				 // clean show color
				 item.style.background = 'none'
				}), 300)
}



// open page animation
function startView(collection){
	collection.forEach(item => {
		item.classList.add('transform')
		setTimeout(()=>item.classList.remove('transform'), 0)
	})

	setTimeout(()=>{
		sendMessage(createMessDescript('Helloy', '#87cefa'));
		setTimeout(()=>sendMessage(createMessDescript('Click to Start', 'slateblue')), 1200);
	}, 0)
}


function createMessDescript(message, color){

	return {
		text:message,
		fontSize: (innerWidth >= 1199) ? '5vw' :
					 (innerWidth < 1199 && innerWidth >= 981) ? '7vw':
					 (innerWidth < 981 && innerWidth >= 767) ? '9vw' :
					 														'12vw',
		color: color,		
	}
}
