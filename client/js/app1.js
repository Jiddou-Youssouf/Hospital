var Web3 = require('web3');
var TruffleContract = require('@truffle/contract');
 
App = {
    web3Provider: null,
    contracts: {},
    currentAccount:{},
    initWeb3 : async function (){
        if (process.env.MODE == 'development' || typeof window.ethereum === 'undefined'){
            App.web3Provider = new Web3.providers.HttpProvider(process.env.LOCAL_NODE);
        }
        else{
             App.web3Provider = Web3.givenProvider;
        }
        web3 = new Web3(App.web3Provider);
        return  await App.initContractHelloWorld(); 
    },
    initContractHelloWorld : async function (){
        await $.getJSON('Medecin.json',function(data){
            var MedecinArtifact = data;
            App.contracts.Medecin = TruffleContract(MedecinArtifact);
            App.contracts.Medecin.setProvider(App.web3Provider);        
        })
        return App.configAccount();
    },
    configAccount : async function(){
        let accounts;
        if(typeof window.ethereum === 'undefined')
        {   accounts = await web3.eth.getAccounts(); }
        else
        {   accounts = await window.ethereum.enable(); }
        App.currentAccount = accounts[0];
        return App.bindEvents();
    },
    bindEvents: function() {
        $('#buttonSave').click(App.save);
        $('#btnRechercher').click(App.rechercher);
    },
    rechercher : async function (){
        App.contracts.Medecin.deployed().then(async function(instance){
            const medecinCount = await instance.medecinCount();
            var trouve = false;
            for(var i=1; i<=medecinCount; i++)
            {
                const medec = await instance.medecins(i);
                if(medec[0].toNumber() == parseInt($("#matricule").val()))
                {
                    trouve = true;
                    $("#searchNotFound").hide();
                    $(".cinResult").html(medec[0].toNumber());
                    $(".nomResult").html(medec[1].toString());
                    $("#searchResult").show();
                    break
                }
            }
            if(!trouve)
            {
                $("#searchResult").hide();
                $("#searchNotFound").html('<center style="margin-top:200px;"><span style="color:red; font-size: 80px;">AUCUNE INFORMATION SUR LE MEDECIN DE CIN '+$("#matricule").val()+'</span></center>');
                $("#searchNotFound").show();
            }
        }).catch((err) =>{
            App.showError(err);
        })
    },
    showMessage: function (msg){
        $('#output').html(msg.toString());
        $('#errorHolder').hide();
        $('#output').show();
    },
    showError: function(err){
        $('#errorHolder').html(err.toString());
        $('#errorHolder').show();
        $('#output').hide();
    },
    save: async function (){
        if ($('#name').val() && $('#cin').val()){
            App.contracts.Medecin.deployed().then(function(instance){
              return instance.addMedecin(parseInt($('#cin').val()), $('#name').val(),{from:App.currentAccount})
            }).then(function(result){
                App.showMessage('Saved Successfully');
            }).catch(function (error){
                App.showError(error);
            })
        }
        else{
            App.showError('Error: CIN and Name are both required.');
        }
        
    },
    init : async function (){
        await App.initWeb3();      
    }
 
}  
 
$(function() {
    $(window).load(function() {
        $('#errorHolder').hide();
        $('#output').hide();         
        $("#searchResult").hide();
        $("#searchNotFound").hide();
      App.init();
    });
  });