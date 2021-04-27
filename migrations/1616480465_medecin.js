var Medecin = artifacts.require('Medecin');
var Patient = artifacts.require('Patient');
var Utilisateur = artifacts.require('Utilisateur');
 
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(Medecin);
  deployer.deploy(Patient);
  deployer.deploy(Utilisateur);
};