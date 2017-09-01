/**
 * Enable highlighting of matching words in cells' CodeMirror editors.
 *
 * This extension was adapted from the CodeMirror addon
 * codemirror/addon/search/match-highlighter.js
 */

define(function (require, exports, module) {
	'use strict';

	var $ = require('jquery');
	var Jupyter = require('base/js/namespace');
	var Cell = require('notebook/js/cell').Cell;
	var CodeCell = require('notebook/js/codecell').CodeCell;

	var CodeMirror = require('codemirror/lib/codemirror');

	require('codemirror/addon/selection/mark-selection');
	require(['./stan']);
    //require('codemirror/addon/selection/anyword-hint');


	function get_relevant_cells () {
		var cells = Jupyter.notebook.get_cells();
		var relevant_cells = [];
		for (var ii=0; ii<cells.length; ii++) {
			var cell = cells[ii];
			if ( cell.get_text().match("^%%stan") && cell instanceof CodeCell) {
				relevant_cells.push(cell);
			}
		}
		return relevant_cells;
	}

	function load_extension () {
		console.log("I have been loaded..")


	}

	return {
		load_ipython_extension : load_extension
	};
});
