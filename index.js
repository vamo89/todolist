var todoService = (function(){

	const localStorageKey = 'savedTasks'

	var tasks = [
		{'title': 'Work it Harder', 'description': ''},
		{'title': 'Make it Better', 'description': ''},
	]

	var taskOnEdit = undefined

	return {
		closeEditArea: closeEditArea,

		addTask: addTask,
		editTask: editTask,
		updateTask: updateTask,
		updateIfEnter: updateIfEnter,

		loadTasks: loadTasks,
	}

	function closeEditArea(task) {
		document.getElementById('list').classList.remove('side')
		document.getElementById('edit').classList.add('hide')
	}

	function openEditArea(task) {
		document.getElementById('list').classList.add('side')
		document.getElementById('edit').classList.remove('hide')
		document.getElementById('form-title').focus()
	}

	function fillEditFields(task) {
		taskOnEdit = task
		let title = '', description = ''
		if (task) {
			title = task.title
			description = task.description
		}
		document.getElementById('form-title').value = title
		document.getElementById('form-description').value = description
	}

	function addTask() {
		openEditArea()
		fillEditFields()
	}

	function editTask(task) {
		openEditArea()
		fillEditFields(task)
	}

	function updateTask() {
		const newTitle = document.getElementById('form-title').value
		if (!taskOnEdit && !newTitle) {
			return
		}

		if (!taskOnEdit) {
			taskOnEdit = {}
			tasks.push(taskOnEdit)
		}
		taskOnEdit.title = newTitle
		taskOnEdit.description = document.getElementById('form-description').value

		saveTasksAndReload()
	}

	function updateIfEnter(event) {
		if (event.keyCode === 13) {
			updateTask()
		}
	}

	function loadTasks() {
		let savedTasks = window.localStorage.getItem(localStorageKey)
		if (savedTasks) {
			tasks = JSON.parse(savedTasks)
		}
		saveTasksAndReload()
	}

	function saveTasksAndReload() {
		window.localStorage.setItem(localStorageKey, JSON.stringify(tasks))
		loadTasksFromList(tasks)
	}

	function loadTasksFromList(tasks) {
		let htmlDocList = document.getElementById('tasklist')
		htmlDocList.innerHTML = ''
		for (const task of tasks) {
			htmlDocList.append(createTaskElement(task))
		}
		for (let size = tasks.length; size < 10; size++) {
			htmlDocList.append(newTaskElement())
		}

	}

	function createTaskElement(task) {
		let li = document.createElement('li')
		li.classList.add('task-elem')
		li.onclick = () => todoService.editTask(task)

		let img = document.createElement('img')
		img.classList.add('list-icon')
		img.src = 'images/task.png'

		li.append(img)
		li.append(task.title)

		return li
	}

	function newTaskElement() {
		let li = document.createElement('li')
		li.classList.add('task-elem')
		li.onclick = todoService.addTask

		return li
	}

})()
