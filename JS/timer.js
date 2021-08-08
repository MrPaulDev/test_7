'use strict'


function startTimer(){
	const timer = document.querySelector('.timer')
	const time = timer.querySelector('.time')
	let seconds = 60;
	let timerID = setInterval(()=>{
					seconds--;
					time.textContent = (seconds >= 10) ? `0:${seconds}` : `0:0${seconds}`

					if(seconds > 30){
						 timer.style.background = '#ffeb3b'
						 timer.classList.add('shotyellow')
						 setTimeout(() => timer.classList.remove('shotyellow'), 300)
					}else if(seconds > 15 && seconds <= 30 ){
						 timer.style.background = 'orange'
						 timer.classList.add('shotorange')
						 setTimeout(() => timer.classList.remove('shotorange'), 300)
					}else{
						 timer.style.background = '#e57373'
						 timer.classList.add('shotred')
						 setTimeout(() => timer.classList.remove('shotred'), 300)
					}

					if(seconds === 0 ) clearInterval(timerID)
				},1000)
}