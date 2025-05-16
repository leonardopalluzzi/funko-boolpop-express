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

    const textSql = 'SELECT p.name, p.price, p.created_at, p.quantity FROM products p'; //fare JOIN per avere info anche su transazioni ecc..
    const jsonSql = 'SELECT * FROM products LIMIT 8';

    connection.query(jsonSql, (err, results) => {
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

        const contextJsonMessage = `You are a virtual assistant for a FunkoPop e-commerce store.

                                    Here is a list of available products in JSON format:

                                    ${JSON.stringify(productList)}

                                    When you reply, provide ONLY a valid JSON, which should be an ARRAY of objects with the following properties:
                                    - name (string)
                                    - description (string)
                                    - price (number)
                                    - quantity (number)

                                    Reply with JSON only, NO additional text.

                                    The customer's request is: "${userMessage}"`

        fetch('http://localhost:11434/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                model: 'phi',
                messages: [{ role: 'user', content: contextJsonMessage }],
                stream: false
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(resp => resp.json())
            .then(data => {


                //codice per ottenere json
                const content = data.message?.content || '';

                try {
                    // Proviamo a parsare la risposta come JSON
                    const jsonReply = JSON.parse(content);
                    res.json({ reply: jsonReply });
                } catch (err) {

                    const cleaned = content
                        .replace(/[\n\r]/g, '')
                        .replace(/[{}]/g, '')
                        .split(',')
                        .map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean);


                    // Se fallisce, fallback a stringa semplice
                    if (cleaned.length > 0) {
                        const fallback = cleaned.map(name => ({ name }));
                        res.json({ error: "not-a-json-fallback", raw: shortenAnswer(data.message?.content, 30) });
                    } else {
                        res.json({ error: "not-a-json-failed", raw: shortenAnswer(data.message?.content, 30) });
                    }

                }


                // codice per ottenere risposte testuali
                // let reply = data.message?.content || data.response || 'Nessuna risposta dal modello.';

                // // regex per togliere merdate ai
                // reply = reply.replace(/As an AI.*?\./gi, '').trim();

                // // pulisce gli /n e accorcia risposta
                // reply = shortenAnswer(reply, 30)

                // res.json({ reply });
            })
            .catch(err => {
                console.error('Errore chiamata Ollama:', err);
                res.status(500).json({ error: 'Errore nella risposta del chatbot' });
            });






        /*metodo con http*/

        // const postData = JSON.stringify({
        //     model: 'phi',
        //     messages: [{ role: 'user', content: contextMessage }],
        //     stream: false
        // });

        // const options = {
        //     hostname: 'localhost',
        //     port: 11434,
        //     path: '/api/chat',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Content-Length': Buffer.byteLength(postData)
        //     }
        // };



        // usare una chiamata httppermette di gestire la response dell'ai piu nel dettaglio ma usare il fetch e praticamente lo stesso
        // const request = http.request(options, (response) => { //faccio richeista http a ollama
        //     let data = ''; //prepraro variabile d'appoggio per la response

        //     response.on('data', chunk => { //salvo la prima response
        //         data += chunk;
        //     });

        //     response.on('end', () => { //creo in end la response finale da parsare, se non trova nulla risponde con una callback
        //         try {
        //             const parsed = JSON.parse(data);
        //             res.json({ reply: parsed.message?.content || parsed.response || 'Nessuna risposta dal modello.' });
        //         } catch (e) {       //gestione errori con try catch
        //             console.error('Errore parsing:', e);
        //             res.status(500).json({ error: 'Risposta non valida dal modello' });
        //         }
        //     });
        // });

        // //gestione errori nella richiesta ad ollama
        // request.on('error', (e) => {
        //     console.error('Errore richiesta Ollama:', e);
        //     res.status(500).json({ error: 'Errore richiesta LLM' });
        // });

        // //rewrite della resposnse
        // request.write(postData);
        // // fa terminare la richiesta
        // request.end();



        // vecchia chiamata (funzionante)






    })



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