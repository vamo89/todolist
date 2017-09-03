var todoService = (function(){

	var tasks = [
		{'id': 1, 'title': 'Work it Harder', 'description': ''},
		{'id': 2, 'title': 'Make it Better', 'description': ''},
	]

	return {
		closeEditArea: closeEditArea,
		addTask: addTask,
		editTask: editTask,
		loadTasks: loadTasks,
	}

	function closeEditArea(task) {
		document.getElementById('list').classList.remove('side')
		document.getElementById('edit').classList.add('hide')
	}

	function openEditArea(task) {
		document.getElementById('list').classList.add('side')
		document.getElementById('edit').classList.remove('hide')
	}

	function addTask() {
		openEditArea()
	}

	function editTask(task) {
		openEditArea()
		document.getElementById('form-title').value = task.title
		document.getElementById('form-description').value = task.description
	}

	function loadTasks() {
		let htmlDocList = document.getElementById('tasklist')
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
