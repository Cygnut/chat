const fu = require('./FileUtils');

function Messages(filepath)
{
	// Check if there is a backing file we can access. If so use it, else ignore backing functionality.
	// Alternatively, if null is passed, don't at all try to use the backing file.
	this.filepath = filepath;
	this.fileExists = this.filepath ? fu.ensureFileExistsSync(filepath) : null;
	
	this.messages = [];
	
	// Read in stored messages.
	this.read();
}

Messages.prototype.write = function(o)
{
	if (this.fileExists)
		fu.writeSync(this.messages, this.filepath);
}

Messages.prototype.read = function()
{
	// Read the file and dump it in this.messages.
	if (this.fileExists)
		this.messages = fu.readSync(this.filepath);
}

Messages.prototype.push = function(m)
{
	// Add the id property.
	m.id = this.messages.length;
	
	this.messages.push(m);
	
	this.write();
	
	return m.id;
}

Messages.prototype.get = function()
{
	return this.messages;
}

exports.Messages = Messages;