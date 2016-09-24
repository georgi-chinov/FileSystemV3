/**
 * 
 */
function Folder(name) {
	this.__name = name;
}
Folder.prototype.create = function (outer) {
	var cont = $('<div></div>');
	var icon = $('<div></div>');
	var name = $('<p></p>');
	
	icon.attr('class', 'fa fa-folder-open');
	name.text(this.__name);
	cont.append(icon);
	cont.append(name);
	outer.append(cont);
}