/* TodoList create app */
const inputElement = document.getElementById('input');
const ulElement = document.getElementById('list');
const actionPanel1 = document.getElementById('actionPanel1');
const actionPanel2 = document.getElementById('actionPanel2');
// create array as database
let todoList = [];
actionPanel2.style.display = 'none';
// check and append new task
inputElement.addEventListener('keydown', event => {
	if ((event.key === 'Enter' || event.keyCode === 13) && (inputElement.value)) {
		todoList.unshift({
			content: inputElement.value,
			done: false,
			selected: false
		})
		inputElement.value = '';

		upgradeView();
	}
});
// create elements of list, input, panels
function upgradeView () {

	ulElement.innerHTML = '';

	// show all elements of array, all your tasks
	for (let index = 0; index < todoList.length; index++) {
		const todoItem = todoList[index];

		const liElement = document.createElement('li');
		liElement.className = 'list-group-item';
		ulElement.append(liElement);

		const divElement = document.createElement('div');
		divElement.className = 'form-group form-check';
		liElement.append(divElement);

		const checkboxElement = document.createElement('input');
		divElement.append(checkboxElement); 
		checkboxElement.type = 'checkbox';
		checkboxElement.className = 'form-check-input';
		checkboxElement.id = 'todoItem' + index;
		checkboxElement.checked = todoItem.selected;

		const labelElement = document.createElement('label');
		divElement.append(labelElement);
		labelElement.className = 'form-check-label';
		if (todoItem.done) {
			labelElement.className += ' todoDone';
		}
		labelElement.setAttribute('for', 'todoItem' + index);
		labelElement.innerText = todoItem.content;

		if (!todoItem.done) {
			const buttonDoneElement = document.createElement('button'); 
			divElement.append(buttonDoneElement);
			buttonDoneElement.type = 'button';
			buttonDoneElement.className = 'btn btn-outline-primary';
			buttonDoneElement.innerText = 'Done';
			buttonDoneElement.style = 'float: right';

			buttonDoneElement.addEventListener('click', () => {
				todoItem.done = !todoItem.done;
				upgradeView();
			});

		}
		else {
			const buttonRemoveElement = document.createElement('button');
			divElement.append(buttonRemoveElement); 
			buttonRemoveElement.type = 'button';
			buttonRemoveElement.className = 'btn btn-danger';
			buttonRemoveElement.innerText = 'Remove';
			buttonRemoveElement.style = 'float: right';

			buttonRemoveElement.addEventListener('click', () => {
				todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem);
				upgradeView();
			});
		};

		checkboxElement.addEventListener('change', () =>{
			todoItem.selected = checkboxElement.checked;
			upgradeView();
		});
	}
// if one task selected base panel is hidden, else
	const someSelected = todoList.some(todoItem => todoItem.selected);
	if (someSelected) {
		actionPanel1.style.display = 'none';
		actionPanel2.style.display = 'block';
	} else {
		actionPanel1.style.display = 'flex';
		actionPanel2.style.display = 'none';
	}
}
// tasks is done
const doneActionButton = document.getElementById('doneAction').addEventListener('click', () => {
	for (const todoItem of todoList) {
		if (todoItem.selected) {
			todoItem.done = true;
			todoItem.selected = false;
		}
	};
	upgradeView();
});
// restore tasks
const restoreActionButton = document.getElementById('restoreAction').addEventListener('click', () => {
	for (const todoItem of todoList) {
		if (todoItem.selected) {
			todoItem.done = false;
			todoItem.selected = false;
		}
	};
	upgradeView();
});
// remove tasks
const removeActionButton = document.getElementById('removeAction').addEventListener('click', () => {
	todoList = todoList.filter(todoItem => !todoItem.selected)
	upgradeView();
});

// select all tasks 
document.getElementById('test').addEventListener('click', () => {
	for (const todoItem of todoList) {
		todoItem.selected = true;
	}

	upgradeView();
});
