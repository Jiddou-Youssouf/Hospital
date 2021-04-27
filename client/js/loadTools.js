var Web3 = require('web3');
var TruffleContract = require('@truffle/contract');
 
App = {
    web3Provider: null,
    contracts: {},
    utilisateurConnecte: '',
    accountsList:{},
    currentAccount:{},
    initWeb3 : async function (){
        if (process.env.MODE == 'development' && typeof window.ethereum === 'undefined'){
            App.web3Provider = new Web3.providers.HttpProvider(process.env.LOCAL_NODE);
        }
        else if(typeof window.ethereum != 'undefined') {
             App.web3Provider = Web3.givenProvider;
        }
        else
        {
            return false
        }
        web3 = new Web3(App.web3Provider);
        return true;
    },
    freeze: function(){
        $('.freeze').off('click');
        alert("Install MetaMask, connect you to your account and refresh web page.");
    },
    initContract : async function (){
        await $.getJSON('Medecin.json',function(data){
            var MedecinArtifact = data;
            App.contracts.Medecin = TruffleContract(MedecinArtifact);
            App.contracts.Medecin.setProvider(App.web3Provider);        
        })
        await $.getJSON('Utilisateur.json',function(data){
            var UtilisateurArtifact = data;
            App.contracts.Utilisateur = TruffleContract(UtilisateurArtifact);
            App.contracts.Utilisateur.setProvider(App.web3Provider);        
        })
        await $.getJSON('Patient.json',function(data){
            var PatientArtifact = data;
            App.contracts.Patient = TruffleContract(PatientArtifact);
            App.contracts.Patient.setProvider(App.web3Provider);        
        });
        return App.loadAccount();
    },
    loadAccount: async function(){
        let v_accounts;
        if(typeof window.ethereum === 'undefined')
        {   v_accounts = await web3.eth.getAccounts(); }
        else
        {   v_accounts = await window.ethereum.enable(); }
        App.currentAccount = v_accounts[0];
        App.accountsList = v_accounts;
    },
    init : async function (){
        const res = await App.initWeb3(); 
        if(res)
        {    
            await App.initContract();
            return true
        }
        return false;    
    },
    initContractMed : async function (){
        await $.getJSON('Medecin.json',function(data){
            var MedecinArtifact = data;
            App.contracts.Medecin = TruffleContract(MedecinArtifact);
            App.contracts.Medecin.setProvider(App.web3Provider);        
        })
        return App.loadAccount();
    },
    initMed : async function (){
        const res = await App.initWeb3(); 
        if(res)
        {    
            App.initContractMed();
            return true
        }
        return false;    
    },
    /*initCreate : function(){
        App.contracts.Medecin.deployed().then(async function(instance){
            return await instance.addMedecin( App.currentAccount, '161731', 'Youssouf', 'Jiddou', 'Cardiologue', {from:App.currentAccount} );
          }).then(function(result){
            App.contracts.Utilisateur.deployed().then(async function(instance){
              return await instance.addUtilisateur( App.currentAccount, 'mafamille', "Medecin", {from:App.currentAccount} );
            }).then(function(result){
                
            }).catch((err)=>{
              alert(err);
            });
          }).catch((err)=>{
            alert(err);
          });
    }*/
}