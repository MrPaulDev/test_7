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

// save timerID for clearInterval()
let timerID;

// click's counter
let count = 0;

// amount of open color pairs
let success_counter = 2

// flag for timer
let timer_flag = true;


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
		if(timer_flag){
			// save for clearInterval() *in case, when user win
			timerID = startTimer()
			timer_flag = false;
		};

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

		isGameOver()
	}
}

// compare couple's
function compareElems() {
	const compare_collection = document.querySelectorAll('.open');

	// double click by one element
	if(compare_collection.length === 1) {
		 success_counter = 0
		 cleanField()
		 sendMessage(createMessDescript('Try again', '#cd5c5cb0'))
		 return
	}

	// target case 
	if(compare_collection[0].style.background === compare_collection[1].style.background) {
		success_counter++;
		compare_collection.forEach(item => item.className = 'showElem');
		(success_counter === 1) ? sendMessage(createMessDescript('Great', '#9acd32a3')) :
										 sendMessage(createMessDescript(`Great X${success_counter}`, '#9acd32a3'))
		return
	}

	// other case's
	success_counter = 0
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


// check game progress
function isGameOver(){
	const collection = document.querySelectorAll('.elem')
	// CASE: if user WIN (timer has not ended)
	if(collection.length === 0){
		clearInterval(timerID)
		setTimeout(()=>sendMessage(createMessDescript('You Win!', '#9acd32a3')), 1200)
	}
}


// open page animation
function startView(collection){
	collection.forEach(item => {
		item.classList.add('transform')
		setTimeout(()=>item.classList.remove('transform'), 0)
	})

	setTimeout(()=>{
		sendMessage(createMessDescript('Helloy', '#87cefa'));
		setTimeout(()=>sendMessage(createMessDescript('Click to Start', 'slateblue')), 800);
	}, 0)
}

// descriptor for function << sendMessage >>
function createMessDescript(message, color){

	return {
		text:message,
		fontSize: (innerWidth >= 1199) ? '5vw' :
					 (innerWidth < 1199 && innerWidth >= 981) ? '7vw':
					 (innerWidth < 981 && innerWidth >= 767) ? '7vw' :
					 (innerWidth >= 575) ? '10vw' : '11vw',
		color: color,		
	}
}
