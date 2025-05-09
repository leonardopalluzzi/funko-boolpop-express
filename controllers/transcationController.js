const connection = require('../db/db')


function index(req, res) {

}

function show(req, res) {

}

function store(req, res) {
    console.log(req.body);

    //rotta per creare con stripe l'intent della transazione, salvare nel db l'intent e restituire la secret alla front

}

function stripe(req, res) {
    // rotta per ricevere il webhook di stripe e l'esito della transazione e aggiornare la righa del db

}

function update(req, res) {

}

function modify(req, res) {

}

function destroy(req, res) {

}

module.exports = {
    index,
    show,
    store,
    stripe,
    update,
    modify,
    destroy
}