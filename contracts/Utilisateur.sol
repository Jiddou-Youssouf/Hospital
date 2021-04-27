pragma solidity ^0.5.0;

contract Utilisateur 
{
    //mapping(address=>string) public utilisateurs;
    mapping(string=>UtilisateurStructure) public utilisateurs;
    uint public utilisateurCount=0;
    //UtilisateurStructure[] public utilisateurTab;

    struct UtilisateurStructure {
        string cin;
        string motPasse;
        string role;
    }
    function addUtilisateur(string memory _cin,string memory _motPasse,string memory _role) public {
        //utilisateurs[_address] = _motpasse;
        utilisateurs[_cin] = UtilisateurStructure(_cin, _motPasse, _role);
        //utilisateurTab.push(UtilisateurStructure(_address, _motpasse, _role));
        utilisateurCount++;
    }
}