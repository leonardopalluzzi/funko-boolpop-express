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
    const jsonSql = 'SELECT * FROM products';

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

        const contextJsonMessage = `Tou are my virtuala assistant and tou have to answer with a JSON to the user request. here is the list of available products in JSON format:
                                    ${JSON.stringify(productList)} 

                                    anwer only with a json that includes anly the products that are relevant to the user request:
                                    ${userMessage}`

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
                let jsonReply;

                try {
                    // Proviamo a parsare la risposta come JSON
                    jsonReply = JSON.parse(data.message?.content);
                } catch {
                    // Se fallisce, fallback a stringa semplice
                    jsonReply = { error: "not-a-json", raw: data.message?.content };
                }

                res.json({ reply: jsonReply });




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