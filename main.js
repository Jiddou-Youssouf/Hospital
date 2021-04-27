require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 9002;
 
app.use(express.static('client'));
app.use(express.static('build/contracts'));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
  });
app.get('/medecin_bienvenue', (req, res) => {
    res.sendFile(`${__dirname}/client/bienvenueMedecin.html`);
  });
app.get('/patient_bienvenue', (req, res) => {
    res.sendFile(`${__dirname}/client/bienvenuePatient.html`);
  });
app.get('/list_patient', (req, res) => {
    res.sendFile(`${__dirname}/client/listPatient.html`);
  });
app.get('/edit_patient', (req, res) => {
    res.sendFile(`${__dirname}/client/editPatient.html`);
  });
app.get('/medecin_mon_compte', (req, res) => {
    res.sendFile(`${__dirname}/client/dashboardMedecin.html`);
  });
app.get('/patient_mon_compte', (req, res) => {
    res.sendFile(`${__dirname}/client/dashboardPatient.html`);
  });
app.get('/ajouter_patient', (req, res) => {
    res.sendFile(`${__dirname}/client/ajouterPatient.html`);
  });
 
  app.get('*', (req, res) => {
    res.status(404);
    res.send('Ooops... this URL does not exist');
  });
 
  app.listen(PORT, () => {
    console.log(`Hopital App running on port ${PORT}...`);
  });