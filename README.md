Connect middleware that serves document attachments from CouchDB.

## Example

Consider the following code:

    var couchdbAttachments = require('couchdb-attachments');
    app.use(couchdbAttachments({database: 'users', prefix: 'users/images'}));

When a request arrives for `/users/images/foo/56/profile.jpg`, this middleware will look for an attachment called `profile.jpg`, on the document with _id `56`, in the database `users`.

## Dependencies

- [cradle](https://github.com/cloudhead/cradle)

## Configuration

Configure with a single argument, which is an object containing options.

Possible options:

- `database`, the name of the database load attachments from.
- `prefix`, the prefix of the external path to respond to.
- `connectionOptions`, any additional connection options to pass to cradle.

