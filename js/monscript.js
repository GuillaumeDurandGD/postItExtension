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

/*------------------------------------------------------*/
/* Fonction qui ajoute un nouveau post-it */
/*------------------------------------------------------*/



var addNewPostit = function(container) {
	removePostIts(container)
	postits.push({
		title: 'Sans titre',
		content: '...'
	});
	generatePostIts(container);
};

/*------------------------------------------------------*/
/* Fonction qui supprime la liste des post-its */
/*------------------------------------------------------*/

var removePostIts = function(container) {
	while(container.firstChild) {
		container.removeChild(container.firstChild);
	}
};



/*------------------------------------------------------*/
/* Supprime le post-it sélectionné */
/*------------------------------------------------------*/

var removePostIt = function(container, element) {
	removePostIts(container);
	postits.splice(element.id, 1);
	generatePostIts(container);
};



/*------------------------------------------------------*/
/* Ouvre le post-it sélectionner dans une nouvelle page */
/*------------------------------------------------------*/

var openPostIt = function(container, index, title, content) {
	//Faire disparaitre la liste des post-its
	removePostIts(container);
	
	//Afficher le post-it sélectionné
	
	/*
	-------------Header-------------
	*/
	
	//Elements
	const header = document.createElement('header');
	const h1 = document.createElement('h1');
	const nav = document.createElement('nav');
	const backButton = document.createElement('button');
	
	//Contents
	
	const h1Content = document.createTextNode(title);
	const backButtonContent = document.createTextNode('<');
	
	//Construct tree
	
	h1.appendChild(h1Content);
	backButton.appendChild(backButtonContent);
	
	nav.appendChild(backButton);
	
	header.appendChild(nav);
	header.appendChild(h1);
	
	
	/*
	-------------Content-------------
	*/
	
	//Elements
	const article = document.createElement('article');
	const textarea = document.createElement('textarea');
	
	//Contents
	
	textarea.value = content;
	
	//Construct tree

	article.appendChild(textarea);
	
	
	/*
	-------------Add to DOM tree-------------
	*/	
	
	
	container.appendChild(header);
	container.appendChild(article);
	
	backButton.addEventListener('click', function() {
		back(container, index, h1Content.nodeValue, textarea.value);
	}, true);
};


var saveContent = function(index, title, content) {
	console.log(index);
	postits[index].title = title;
	postits[index].content = content;
};

var back = function(container, index, title, content) {
	saveContent(index, title, content);
	removePostIts(container);
	generatePostIts(container);
};



/*------------------------------------------------------*/
/* Functions de générations de la liste de post-it en fonction du contenu de la variable post-it (à terme, ce sera le localstorage du navigateur) */
/*------------------------------------------------------*/

var generatePostIts = function(container) {
	const mainNav = document.createElement('nav');
	const addButton = document.createElement('button');
	const addButtonContent = document.createTextNode('+');
	
	addButton.appendChild(addButtonContent);
	mainNav.appendChild(addButton);
	
	container.appendChild(mainNav);
	
	addButton.addEventListener('click', function() {
		addNewPostit(container);
	}, true);
	
	
	for(var i = 0 ; i < postits.length ; i++) {
			createPostIt(container, i, postits[i].title, postits[i].content);
	}
}

var createPostIt = function (container, index, title, content) {
	if(content.length > 50) {
		content = content.substr(0,49) + '...';
	}
	
	const div = document.createElement('div');
	div.className = 'postit';
	div.id = index;
	
	const h2 = document.createElement('h2');
	const preview = document.createElement('p');
	const editButton = document.createElement('button');
	const deleteButton = document.createElement('button');
	const h2Content = document.createTextNode(title);
	const previewContent = document.createTextNode(content);
	const editButtonContent = document.createTextNode('Edit');
	const deleteButtonContent = document.createTextNode('Delete');

	h2.appendChild(h2Content);
	preview.appendChild(previewContent);
	editButton.appendChild(editButtonContent);
	deleteButton.appendChild(deleteButtonContent);
	
	div.appendChild(h2);
	div.appendChild(preview);
	div.appendChild(editButton);
	div.appendChild(deleteButton);
	
	preview.addEventListener('click', function() {
		openPostIt(container, title, content);
	}, true);
	
	editButton.addEventListener('click', function() {
		openPostIt(container, index, title, content);
	}, true);
	
	deleteButton.addEventListener('click', function(e) {
		removePostIt(container, e.target.parentNode);
	}, true);


	container.appendChild(div);
};



/*------------------------------------------------------*/
/* Générer les post-its un fois la page chargée
/*------------------------------------------------------*/

window.onload = function(){
	const container = document.getElementById('postItContainer');
	
	generatePostIts(container);
	
};
