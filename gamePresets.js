var gamePresets = [
	{
		'name': 'Conway\'s Game of Life',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 3, 'maxNeighborCount': 3, 'aliveAfter': true },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 1, 'aliveAfter': false },
			{ 'aliveBefore': true, 'minNeighborCount': 4, 'maxNeighborCount': 8, 'aliveAfter': false },
		]
	},
	{
		'name': 'Dilate Filter',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 1, 'maxNeighborCount': 8, 'aliveAfter': true },
		]
	},
	{
		'name': 'Erode Filter',
		'rules': [
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 7, 'aliveAfter': false },
		]
	},
	{
		'name': 'Blob',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 4, 'maxNeighborCount': 8, 'aliveAfter': true },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 3, 'aliveAfter': false },
		]
	},
	{
		'name': '23/36',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 3, 'maxNeighborCount': 3, 'aliveAfter': true },
			{ 'aliveBefore': false, 'minNeighborCount': 6, 'maxNeighborCount': 6, 'aliveAfter': true },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 1, 'aliveAfter': false },
			{ 'aliveBefore': true, 'minNeighborCount': 4, 'maxNeighborCount': 8, 'aliveAfter': false },
		]
	},
	{
		'name': 'Strobe',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 0, 'maxNeighborCount': 8, 'aliveAfter': true },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 8, 'aliveAfter': false },
		]
	},
	{
		'name': 'Maze',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 3, 'maxNeighborCount': 8, 'aliveAfter': true },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 5, 'aliveAfter': false },
		]
	}
]
