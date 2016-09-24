/**
 * 
 */
class Folder {
	constructor(name){
		this.__name = name;
	}
	get name(){
		return this.__name;
	}
	set name (val){
		this.__name = val;
	}
	create(){
		var outer = $(".outer");
		var cont = $('<div></div>');
		var icon = $('<div></div>');
		icon.attr('class', 'fa fa-folder-o');
		icon.css("font-size","45px");
		var name = $('<p></p>');
		name.text(this.__name);
		cont.append(icon);
		cont.append(name);
		outer.append(cont);
	}	
	
}
	
