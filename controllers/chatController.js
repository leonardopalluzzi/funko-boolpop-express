const connection = require('../db/db');

function index(req, res) {

}

function show(req, res) {

}

function store(req, res) {

    //funzione esempio presa dal chattone con ollama o phi2
    const userMessage = req.body.message;

    const postData = JSON.stringify({
        model: 'phi',
        messages: [{ role: 'user', content: userMessage }],
        stream: false
    });

    const options = {
        hostname: 'localhost',
        port: 11434,
        path: '/api/chat',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    const request = http.request(options, function (response) {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
            const reply = JSON.parse(data)?.message?.content || 'Nessuna risposta';
            res.json({ reply: reply });
        });
    });

    request.on('error', error => res.status(500).json({ error: error.message }));
    request.write(postData);
    request.end();

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