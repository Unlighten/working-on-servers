//routes/note_routes.js

//======================
//remember that this tutorial wants you to break up the routes into different files
//you could do it all in one, but they said it would be "cleaner" if they were seperate
//======================


var ObjectID = require('mongodb').ObjectID;

//this is creating our create route, but the extension is notes as you can tell
module.exports = function(app, db){
    //we didnt have the id for the notes, so this app.get method should give us the id for each note
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err){
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note' + id + ' deleted!');
            }
        })
    })

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            } else {
                res.send(note)
            }
        })
    })

    //when the app receives a post request to the /notes path,
    //it will execute the code inside of the callback
    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        })
    });
};