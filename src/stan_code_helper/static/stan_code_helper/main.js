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

	// The mark-selection addon is need to ensure that the highlighting styles
	// are *not* applied to the actual selection, as otherwise it can become
	// difficult to see which is selected vs just highlighted.
	require('codemirror/addon/selection/mark-selection');
  require('codemirror/addon/selection/anyword-hint');


);

	/**
	 *  The functions callbackCursorActivity, callbackOnFocus and
	 *  scheduleHighlight are taken without major unmodified from cm's
	 *  match-highlighter.
	 *  The main difference is using our global state rather than
	 *  match-highlighter's per-cm state, and a different highlighting function
	 *  is scheduled.
	 */
	function callbackCursorActivity (cm) {
		if (cm.hasFocus()) {

		}
	}

	function callbackOnFocus (cm) {

	}




	/**
	 *  isWord, boundariesAround and makeOverlay come pretty much directly from
	 *  Codemirror/addon/search/matchHighlighter
	 *  since they don't use state or config values.
	 */
	function isWord (cm, from, to) {
		var str = cm.getRange(from, to);
		if (str.match(/^\w+$/) !== null) {
			var pos, chr;
			if (from.ch > 0) {
				pos = {line: from.line, ch: from.ch - 1};
				chr = cm.getRange(pos, from);
				if (chr.match(/\W/) === null) {
					return false;
				}
			}
			if (to.ch < cm.getLine(from.line).length) {
				pos = {line: to.line, ch: to.ch + 1};
				chr = cm.getRange(to, pos);
				if (chr.match(/\W/) === null) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	function boundariesAround (stream, re) {
		return (!stream.start || !re.test(stream.string.charAt(stream.start - 1))) &&
		  (stream.pos == stream.string.length || !re.test(stream.string.charAt(stream.pos)));
	}
	function makeOverlay (query, hasBoundary, style) {
		return {
			token: function (stream) {
				if (stream.match(query) &&
						(!hasBoundary || boundariesAround(stream, hasBoundary))) {
					return style;
				}
				stream.next();
				if (!stream.skipTo(query.charAt(0))) {
					stream.skipToEnd();
				}
			}
		};
	}

	/**
	 *  Return an array of cells to which match highlighting is relevant,
	 *  dependent on the code_cells_only parameter
	 */
	function get_relevant_cells () {
		var cells = Jupyter.notebook.get_cells();
		var relevant_cells = [];
		for (var ii=0; ii<cells.length; ii++) {
			var cell = cells[ii];
			if (!params.code_cells_only || cell instanceof CodeCell) {
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
