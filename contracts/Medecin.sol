pragma solidity ^0.5.0;
 
contract Medecin {

uint public medecinCount = 0;
//MedecinStructure[] public medecinTab;

  struct MedecinStructure {
    string cin;
    string nom;
    string prenom;
    string domaine;
  }

  mapping(uint => MedecinStructure) public medecins;

  function addMedecin(string memory _cin, string memory _nom, string memory _prenom, string memory _domaine) public {
    medecins[medecinCount] = MedecinStructure(_cin, _nom, _prenom, _domaine);
    //medecinTab.push(MedecinStructure(_adresse, _cin, _nom, _prenom, _domaine));
    medecinCount ++;
  }
  function editMedecin(uint _indice, string memory _cin,string memory _nom, string memory _prenom, string memory _domaine) public {
    medecins[_indice] = MedecinStructure(_cin, _nom,_prenom, _domaine);
  }
}
