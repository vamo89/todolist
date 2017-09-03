var todoService = (function(){

	return {
		closeEditArea: closeEditArea,
		addTask: addTask,
		editTask: editTask,
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
	}

})()
