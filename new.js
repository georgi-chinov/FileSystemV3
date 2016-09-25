function User(name) {
	this._name = name;
}

User.prototype.getName = function() {
	return this._name;
}

User.prototype.setName = function(newName) {
	this._name = newName;
}
