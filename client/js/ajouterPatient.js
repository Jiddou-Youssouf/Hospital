$(function(){
    $(window).load(async function(){
        resp = await App.init();
        if(resp == false)
        {
          alert("Install MetaMask, connect you to your account and refresh web page."); 
          return ; 
        }
        $('#sign_up_cin').change(function(){
            var cin=$('#sign_up_cin').val();
            App.contracts.Utilisateur.deployed().then(async function(instance){
            let util = await instance.utilisateurs(cin);
            if(util[1] != '')
            {
                alert("Il existe déjà un compte pour cet Numéro d'identification Nationale, veuillez le changer.");
                $('#sign_up_cin').focus();
                $('#btnRegister').prop('disabled', true);
            }
            else
            {
                $('#btnRegister').prop('disabled', false);
            }
            }).catch((err) =>{
            alert(err);
            });
        });
        $('#btnRegister').click( async function(){
            var prenom = $( "#sign_up_prenom" ).val() ;
            var nom = $( "#sign_up_nom" ).val() ;
            var cin = $( "#sign_up_cin" ).val() ;
            var maladie = $( "#sign_up_maladie" ).val() ;
            if(prenom=='' || nom=='' || cin=='' || maladie=='')
            { alert('Veuillez renseigner toutes les informations, verifier bien.'); return;}
            let accounts = await window.ethereum.enable();
            App.contracts.Patient.deployed().then(async function(instance){
            return await instance.addPatient( cin, nom, prenom, maladie, {from:accounts[0]} );
            }).then(function(result){
            App.contracts.Utilisateur.deployed().then(async function(instance){
                return await instance.addUtilisateur( cin, cin, "Patient", {from:accounts[0]} );
            }).then(function(result){
                alert('Nouveau compte créé pour '+prenom);
                window.location.reload();
            }).catch((err)=>{
                alert(err);
            });
            }).catch((err)=>{
            alert(err);
            });
          });
    });
});