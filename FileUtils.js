const fs = require('fs');

exports.fileExists = function(filepath)
{
	try
	{
		fs.accessSync(filepath, fs.R_OK | fs.W_OK);
		// Then we are done - the file exists.
		return true;
	}
	catch (err)
	{
		return false;
	}
}

exports.ensureFileExistsSync = function(filepath)
{
	if (fileExists(filepath))
		return true;
	
	// If the file doesn't exist, create it with utf-8 encoding.
	try
	{
		fs.writeFileSync(filepath, '', { flag: 'w' });
		return true;
	}
	catch (err)
	{
		return false;
	}
}

exports.writeSync = function(o, filepath)
{
	// Assumes that the file already exists.
	var s = JSON.stringify(o);
	fs.writeFileSync(filepath, s);	// Write as utf-8.
}

exports.readSync = function(filepath)
{
	if (!fileExists(filepath))
		return {};
	
	var buf = fs.readFileSync(filepath);	// Read the entire file as utf-8.
	var s = buf.toString();	// Decode as string.
	return JSON.parse(s);
}