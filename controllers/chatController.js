const connection = require('../db/db');
const http = require('http');

function shortenAnswer(res, maxWords = 30) {
    if (!res) return '';

    // Pulisce spazi doppi e newline
    const cleanText = res.replace(/\s+/g, ' ').trim();

    // Divide in parole
    const words = cleanText.split(' ');

    // Se già sotto il limite, restituisce tutto
    if (words.length <= maxWords) return cleanText;

    // Altrimenti taglia a maxWords
    return words.slice(0, maxWords).join(' ') + '...';
}

function index(req, res) {

}

function show(req, res) {

}

function store(req, res) {

    const userMessage = req.body.message;
    console.log(userMessage);


    const textSql = 'SELECT p.name, p.price, p.created_at, p.quantity FROM products p'; //fare JOIN per avere info anche su transazioni ecc..
    const jsonSql = 'SELECT p.slug, p.name, p.price, p.quantity FROM products p LIMIT 8';

    function getIntent(message) {
        const msg = message.toLowerCase();
        if (msg.includes('price') || msg.includes('products') || msg.includes('list')) return 'json';
        if (msg.includes('description') || msg.includes('info')) return 'text';
        return 'default';
    }

    const intent = getIntent(userMessage)

    function extractJsonArray(rawContent) {
        const jsonStart = rawContent.indexOf('[');
        const jsonEnd = rawContent.lastIndexOf(']');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            const jsonString = rawContent.slice(jsonStart, jsonEnd + 1).trim();
            try {
                return JSON.parse(jsonString);
            } catch (err) {
                console.error('JSON extraction failed:', err);
                return null;
            }
        }
        return null;
    }

    function validateAIResponse(response) {
        try {
            const data = JSON.parse(response);

            if (!Array.isArray(data)) return false;

            for (const item of data) {
                if (typeof item !== 'object' || item === null) return false;
                if (!('slug' in item) || typeof item.slug !== 'string' || item.slug.match(/[^a-z0-9\-]/)) return false;
                if (!('name' in item) || typeof item.name !== 'string' || item.name.match(/[^\w\s\-]/)) return false;
                if (!('price' in item) || typeof item.price !== 'number') return false;
                if (!('quantity' in item) || !Number.isInteger(item.quantity)) return false;
            }

            return true;
        } catch (e) {
            return false;
        }
    }



    switch (intent) {
        case 'json':
            //fai sql che da json
            connection.query(jsonSql, (err, results) => {
                if (err) return res.status(500).json({ state: 'error', message: err.message });

                const productList = results.map(item => `${item.name}, price: ${item.price}, quantity: ${item.quantity}`).join('\n');

                const contextJsonMessage = `You are an API.  
ONLY output a valid JSON array of objects.  
STRICTLY follow these rules:
1. START output with '[' and END with ']'.
2. NEVER write explanations, NEVER add text before or after the JSON.
3. ONLY use the provided data. NEVER invent data.
4. If no exact match is found, return: []

Data available:
${productList}

Expected JSON format:
[
  {
    "slug": "attack-on-titan",
    "name": "Attack on Titan",
    "price": 9.99,
    "quantity": 5
  }
]

!IMPORTANT ALWAYS include all the required fields: slug, name, price, quantity.

QUERY:
"${userMessage}"

IMPORTANT:
If you output ANYTHING outside JSON format, the system will ERROR.
Output ONLY JSON. NEVER add notes.
`

                fetch('http://localhost:11434/api/chat', {
                    method: 'POST',
                    body: JSON.stringify({
                        model: 'mistral',
                        messages: [{ role: 'user', content: contextJsonMessage }],
                        stream: false
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => res.json())
                    .then(data => {


                        //codice per ottenere json
                        const content = data.message?.content || '';
                        console.log(content);
                        const parsed = extractJsonArray(content)

                        if (parsed && Array.isArray(parsed)) {
                            // È un JSON array valido già parsato
                            res.json({ state: 'json', results: parsed });

                        } else {

                            const cleaned = content
                                .replace(/[\n\r]/g, '')
                                .replace(/[{}]/g, '')
                                .split(',')
                                .map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean);


                            // Se fallisce, fallback a stringa semplice
                            if (cleaned.length > 0) {
                                const fallback = cleaned.map(name => ({ name }));
                                res.json({ state: "not-a-json-fallback", results: shortenAnswer(data.message?.content, 30) });
                            } else {
                                const fallbackTextPrompt = `
                                                            You are an e-commerce assistant.
                                                            The user's request did not return valid JSON results.
                                                            Provide a short, clear response in plain English (max 100 characters), without any extra formatting.
                                                            Be concise and suggest what the user might be looking for or offer an alternative.

                                                            User question:
                                                            ${userMessage}
                                                            `;

                                fetch('http://localhost:11434/api/chat', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        model: 'mistral',
                                        messages: [{ role: 'user', content: fallbackTextPrompt }],
                                        stream: false
                                    }),
                                    headers: { 'Content-Type': 'application/json' }
                                })
                                    .then(fallbackResp => fallbackResp.json())
                                    .then(fallbackData => {
                                        let reply = fallbackData.message?.content || 'Nessuna risposta.';
                                        reply = reply.replace(/[\n\r]/g, ' ').trim();
                                        reply = shortenAnswer(reply, 100);

                                        res.json({ state: 'text', results: reply });
                                    })
                                    .catch(err => {
                                        console.error('Errore fallback Ollama:', err);
                                        res.status(500).json({ error: 'Errore nella generazione fallback testuale' });
                                    });
                            }

                        }
                    })
                    .catch(err => {
                        console.error('ollama error:', err);
                        res.status(500).json({ error: 'error in chatbot response' });
                    });

            })
            break;
        case 'text':
            //fai sql text
            connection.query(textSql, (err, results) => {
                if (err) return res.status(500).json({ state: 'error', message: err.message });

                const productList = results.map(item => `${item.name}, price: ${item.price}, quantity: ${item.quantity}`).join('\n');

                const contextTextMessage = `
                                You are a concise and friendly virtual assistant for my FunkoPop ecommerce store.
                                Answer in a short, clear and direct way. 
                                Never exceed 30 words.
                                Only answer to the user's specific question about the products below.
                                Do not repeat the list unless explicitly requested.
                                If the user asks something not related to these products, reply "Please check our catalog."
                                Use a professional and essential tone. No extra info, no greetings, no repetition.

                                Available products:
                                ${productList}

                                User request:
                                ${userMessage}
                                `;

                fetch('http://localhost:11434/api/chat', {
                    method: 'POST',
                    body: JSON.stringify({
                        model: 'phi',
                        messages: [{ role: 'user', content: contextTextMessage }],
                        stream: false
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    // timeout: 5000
                })
                    .then(resp => resp.json())
                    .then(data => {

                        // codice per ottenere risposte testuali
                        let reply = data.message?.content || data.response || 'Nessuna risposta dal modello.';

                        // regex per togliere merdate ai
                        reply = reply.replace(/As an AI.*?\./gi, '').trim();

                        // pulisce gli /n e accorcia risposta
                        reply = shortenAnswer(reply, 30)

                        res.json({ state: 'text', results: reply });
                    })
                    .catch(err => {
                        console.error('Errore chiamata Ollama:', err);
                        res.status(500).json({ error: 'Errore nella risposta del chatbot' });
                    });
            })
            break;
        case 'default':
            res.status(400).json({ error: 'Invalid intent or unsupported request.' });
            break;
    }
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