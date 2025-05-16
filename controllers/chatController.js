const connection = require('../db/db');
const http = require('http');

const fakeProducts = [
    { name: 'Funko Batman', price: 25, category: 'supereroi' },
    { name: 'Funko Harry Potter', price: 30, category: 'fantasy' }
];

function index(req, res) {

}

function show(req, res) {

}

function store(req, res) {

    const userMessage = req.body.message;

    // Chiamata API OpenAI senza async/await, con promise
    fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        body: JSON.stringify({
            model: 'phi',
            messages: [{ role: 'user', content: userMessage }],
            stream: false
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resp => resp.json())
        .then(data => {
            res.json({ reply: data.message?.content || data.response || 'Nessuna risposta dal modello.' });
        })
        .catch(err => {
            console.error('Errore chiamata Ollama:', err);
            res.status(500).json({ error: 'Errore nella risposta del chatbot' });
        });

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
    update,
    modify,
    destroy
}