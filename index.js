const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS || '';
const YOUR_OBJECT_TYPE = '2-49896952'; // Ejemplo: '2-49896952' (reemplaza con tu propio id de objeto personalizado)

// Ruta para la página de inicio: obtiene los objetos personalizados y los muestra en homepage.pug
app.get('/', async (req, res) => {
    const customObjectsUrl = `https://api.hubapi.com/crm/v3/objects/${YOUR_OBJECT_TYPE}?properties=estado_de_la_maquinaria&properties=tipo_de_maquinaria&properties=nombre`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    try {
        const resp = await axios.get(customObjectsUrl, { headers });
        const data = resp.data.results || [];
        res.render('homepage', {
            title: 'Lista de objetos personalizados',
            data
        });
    } catch (error) {
        console.error(error);
        res.render('homepage', {
            title: 'Lista de objetos personalizados',
            data: []
        });
    }
});

// Ruta para mostrar el formulario HTML en la plantilla pug "actualizaciones"
app.get('/update-cobj', (req, res) => {
    res.render('actualizaciones', { title: 'Actualizar formulario de objeto personalizado | Integración con HubSpot I Practicum' });
});

// Ruta para procesar el formulario y crear un nuevo objeto personalizado
app.post('/update-cobj', async (req, res) => {
    const { estado_de_la_maquinaria, tipo_de_maquinaria, nombre } = req.body;
    const customObjectsUrl = `https://api.hubapi.com/crm/v3/objects/${YOUR_OBJECT_TYPE}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    const payload = {
        properties: {
            estado_de_la_maquinaria,
            tipo_de_maquinaria,
            nombre
        }
    };
    try {
        await axios.post(customObjectsUrl, payload, { headers });
    } catch (error) {
        console.error(error);
    }
    res.redirect('/');
});

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));