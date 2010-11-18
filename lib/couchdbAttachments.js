/**
 * Connect middleware that serves document attachments from CouchDB.
 */
var cradle = require('cradle');
var parseUrl = require('url').parse;

module.exports = function couchAttachmentProvider(options) {
    var database = options.database;
    var prefix = options.prefix;
    var cradleOptions = options.connectionOptions || {}
    var connection = new cradle.Connection(cradleOptions);
    var db = connection.database('votes');
    return function(req, res, next) {
        var path = parseUrl(req.url).pathname;
        // Match the prefix
        if (path.indexOf(prefix) !== -1) {
            var components = path.substring(prefix.length + 1, path.length).split('/');
            var attachment = components.pop();
            var request = db.getAttachment(components.pop(), 'photo.jpg');
            request.on('response', function(response) {
                if (response.statusCode == 200) {
                    // Respond with the same headers that Couch sent
                    res.writeHead(response.statusCode, response.headers);
                    response.on('data', function(chunk) {
                        res.write(chunk);
                    });
                    response.on('end', function() {
                        res.end();
                    });
                }
                else {
                    next();
                }
            });
        }
        else {
            next();
        }
    }
}
