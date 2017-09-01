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
	var stan = require(['./stan']);
    //require('codemirror/addon/selection/anyword-hint');
    //require('codemirror/addon/selection/show-hint');

	var globalState = {
		active: false,
		timeout: null, // only want one timeout
		overlay: null, // one overlay suffices, as all cells use the same one
	};

	// define a CodeMirror option for highlighting matches in all cells
	CodeMirror.defineOption("syntaxhighlight", false, function (cm, val, old) {
		if (old && old != CodeMirror.Init) {
			globalState.active = false;
			clearTimeout(globalState.timeout);
			globalState.timeout = null;
			cm.off("cursorActivity", callbackCursorActivity);
			cm.off("focus", callbackOnFocus);
		}
		if (val) {
			if (cm.hasFocus()) {
				globalState.active = true;
				highlightMatchesInAllRelevantCells(cm);
			}
			else {
				cm.on("focus", callbackOnFocus);
			}
			cm.on("cursorActivity", callbackCursorActivity);
		}
	});

		function callbackCursorActivity (cm) {
		//if (globalState.active || cm.hasFocus()) {
			scheduleHighlight(cm);
		//}
	}

	function callbackOnFocus (cm) {
		// unlike cm match-highlighter, we *do* want to schedule a highight on
		// focussing the editor
		globalState.active = true;
		scheduleHighlight(cm);
	}

	function scheduleHighlight (cm) {
		//clearTimeout(globalState.timeout);
		globalState.timeout = setTimeout(function () { highlightMatchesInAllRelevantCells(cm); }, 10);
	}

	/**
	 *  Adapted from cm match-highlighter's highlightMatches, but adapted to
	 *  use our global state and parameters, plus work either for only the
	 *  current editor, or multiple cells' editors.
	 */
	function highlightMatchesInAllRelevantCells (cm) {
		get_relevant_cells().forEach(function (cell, idx, array) {
					cell.code_mirror.setOption('mode', 'text/x-stan');
				});

    }

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

	function update_options () {

    }

	function load_extension () {
		console.log("I have been loaded..")
		Jupyter.notebook.config.loaded
        .then(update_options, function on_error (reason) {
            console.warn('[stan]', 'error loading config:', reason);
        })
        .then(function () {
            // Apply to any already-existing cells
            var cells = Jupyter.notebook.get_cells().forEach(function (cell) {
                if ( cell instanceof CodeCell) {
                    cell.code_mirror.setOption('syntaxhighlight', true);
                }
            });
        })
        .catch(function on_error (reason) {
            console.warn('[stan]', 'error:', reason);
        });


	}

	return {
		load_ipython_extension : load_extension
	};
});
