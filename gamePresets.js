/**
 * gamePresets.js - Object literals holding rule presets for various Conway-like games
 */

var gamePresets = [
	{
		'name': 'Conway\'s Game of Life',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 3, 'maxNeighborCount': 3 },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 1 },
			{ 'aliveBefore': true, 'minNeighborCount': 4, 'maxNeighborCount': 8 },
		]
	},
	{
		'name': 'Population Growing',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 1, 'maxNeighborCount': 8 },
		]
	},
	{
		'name': 'Population Shrinking',
		'rules': [
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 7 },
		]
	},
	{
		'name': 'Blob',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 4, 'maxNeighborCount': 8 },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 3 },
		]
	},
	{
		'name': '23/36',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 3, 'maxNeighborCount': 3 },
			{ 'aliveBefore': false, 'minNeighborCount': 6, 'maxNeighborCount': 6 },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 1 },
			{ 'aliveBefore': true, 'minNeighborCount': 4, 'maxNeighborCount': 8 },
		]
	},
	{
		'name': 'Strobe',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 0, 'maxNeighborCount': 8 },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 8 },
		]
	},
	{
		'name': 'Maze',
		'rules': [
			{ 'aliveBefore': false, 'minNeighborCount': 3, 'maxNeighborCount': 8 },
			{ 'aliveBefore': true, 'minNeighborCount': 0, 'maxNeighborCount': 5 },
		]
	}
]
