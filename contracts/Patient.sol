pragma solidity ^0.5.0;

contract Patient 
{

    uint public patientCount = 0;
    //PatientStructure[] public patientTab;

  struct PatientStructure {
    string cin;
    string nom;
    string prenom;
    string type_maladie;
  }

  mapping(uint => PatientStructure) public patients;

  function addPatient(string memory _cin, string memory _nom, string memory _prenom, string memory _type_maladie) public {
    patients[patientCount] = PatientStructure(_cin, _nom,_prenom, _type_maladie);
    //patientTab.push(PatientStructure(_adresse, _cin, _nom,_prenom));
    patientCount ++;
  }
  function editPatient(uint _indice, string memory _cin,string memory _nom, string memory _prenom, string memory _type_maladie) public {
    patients[_indice] = PatientStructure(_cin, _nom,_prenom, _type_maladie);
  }
}