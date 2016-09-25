/**
 * 
 */
class File{
	constructor(name,parent ,type){
		if(this.constructor == File){
			throw new Error("This class is abstract!");
		}
		this.__name = name;
		this.__parent = parent;
		this.type = type;
	}
	get name(){
		return this.__name;
	}
	set name(name){
		this.__name = name;
	}
	get parent(){
		return this.__parent;
	}
	set parent(parent){
		this.__parent = parent;
	}
	get type(){
		return this.__type;
	}
	set type(type){
		this.__type = type;
	}
	create(){
		var outer = $('.outer');
		
		var newfile = $("<div></div>");
		var name = $("<p></p>");
		name.html(this.name);
		outer.append(newfile);
		outer.append(name);
	}
}