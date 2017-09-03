const dragDrop = (function () {

	let taskOnDrag = undefined

	return {
		dragTask: dragTask,
		dropTask: dropTask,
		allowDrop: allowDrop,
	}

	function dragTask(task) {
		taskOnDrag = task
	}

	function dropTask(targetTask) {
		if (!targetTask) {
			return
		}

		todoService.reorderTask(taskOnDrag, targetTask)

		function getLi(path) {
			for (const elem of path) {
				if (elem.tagName === 'LI') {
					return elem
				}
			}
		}
	}

	function allowDrop(event) {
		event.preventDefault()
	}
})()