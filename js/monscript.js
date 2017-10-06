'use strict';

var postits = [
	{
		title: 'Post 1',
		content: 'le contenu du post 1'
	},
	{
		title: 'Post 2',
		content: 'le contenu du post 2'
	}
];

var removePostIts = function(container) {
	while(container.firstChild) {
		container.removeChild(container.firstChild);
	}
};

var openPostIt = function(container, title, content) {
	//Faire disparaitre la liste des post-its
	removePostIts(container);
	
	//Afficher le post-it sélectionné
	
};

var generatePostIts = function (container, title, content) {
	if(content.length > 50) {
		content = content.substr(0,49) + '...';
	}
	
	const div = document.createElement('div');
	div.className = 'postit';
	
	const h2 = document.createElement('h2');
	const preview = document.createElement('p');
	const h2Content = document.createTextNode(title);
	const previewContent = document.createTextNode(content);

	h2.appendChild(h2Content);
	preview.appendChild(previewContent);
	div.appendChild(h2);
	div.appendChild(preview);
	
	div.addEventListener('click', function() {
		openPostIt(container, title, content);
	});


	container.appendChild(div);
};

window.onload = function(){
	const container = document.getElementById('postItContainer');
	
	for(var i = 0 ; i < postits.length ; i++) {
			generatePostIts(container, postits[i].title, postits[i].content);
	}
	
	
	// var mainButtons = document.getElementsByClassName('btnToPost');
	// var allPostIt = document.getElementsByClassName('postit');
	// var retourBtn = document.getElementsByClassName('retour');

	// for(var i = 0 ; i < mainButtons.length ; i++) {
	// 	mainButtons[i].addEventListener('click', function(e){
	// 		for(var j = 0 ; j < allPostIt.length ; j++) {
	// 		 	allPostIt[j].className = 'postit invisible';
	// 		}

	// 		var targetPost = document.getElementById('target' + e.currentTarget.id);
	// 		targetPost.className = 'postit visible';


	// 	}, false);
	// }
};
