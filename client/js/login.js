$(function() {
  $(window).load( async function() {
    resp = await App.init();
    if(resp == false)
    {  
      $('.freeze').attr('disabled',true); 
      alert("Install MetaMask, connect you to your account and refresh web page."); 
      return ; 
    }
    $('.reduire').click(function(event){ event.preventDefault(); ocultar_login_sign_up(); });
    $('#sign_up_Domaine').hide();
    $('#sign_up_maladie').hide();
    $('input[type=radio]').on( "click", function() {
      if($( "input:checked" ).val() === "Medecin" )
      {
          $('#sign_up_maladie').hide();
          $('.cont_forms_active_sign_up').css("height","590px");
          $('#sign_up_Domaine').show();
      }
      else
      {
          $('#sign_up_Domaine').hide();
          $('.cont_forms_active_sign_up').css("height","590px");
          $('#sign_up_maladie').show();
        }
    });
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
    $('#btnConnexion').click( async function(){
      var cin = $('#loginCIN').val();
      var pass = $('#loginPassword').val();
      if(cin ==='' || pass ==='')
      {
        alert("Votre Numéro d'identification Nationale et votre Mot de Passe sont tous les deux requises...");
      }
      else
      {//alert(Object.keys(App.contracts).length);
        App.contracts.Utilisateur.deployed().then(async function(instance){
          let util = await instance.utilisateurs(cin);
          if(util[1].toString() == '')
            alert("Le Numéro d'Identification Nationale saisie n'est pas reconnue...");
          else if(util[1] === pass)
          {
            sessionStorage.setItem('cin',util[0]);
            if(util[2] === "Medecin")
              window.location.href=window.location.href+"medecin_bienvenue";
            else if(util[2] === "Patient")
              window.location.href=window.location.href+"patient_bienvenue";
          }
          else 
            alert("Mot de passe incorrect...");
        }).catch((err) =>{
          alert(err);
        });
      }
    });
    $('#btnRegister').click( async function(){
      var pass = $('#sign_up_mot_passe').val();
      var confirm = $( "#sign_up_confirm" ).val() ;
      var prenom = $( "#sign_up_prenom" ).val() ;
      var nom = $( "#sign_up_nom" ).val() ;
      var domaine = $( "#sign_up_Domaine" ).val() ;
      var cin = $( "#sign_up_cin" ).val() ;
      var radio = $( "input:checked" ).val() ;
      var maladie = $( "#sign_up_maladie" ).val() ;
      if(pass=='' || confirm=='' || prenom=='' || nom=='' || cin=='')
      { alert('Veuillez renseigner toutes les informations, verifier bien.'); return;}
      else if(radio!="Medecin" && radio!="Patient")
      { alert('Vous êtes un médecin ou un patient veuillez faire la selection.'); return;}
      else if(confirm != pass)
      { alert("Le mot de passe saisie n'est pas le même qui a été confirmé."); return; }
      else if(radio=="Medecin" && domaine=='')
      { alert('Vous devez renseigner votre domaine.'); return;}
      else if(radio=="Patient" && maladie=='')
      { alert('Vous devez renseigner votre maladie.'); return;}
      let accounts = await window.ethereum.enable();
      //alert(Object.keys(App.contracts).length);
      if(radio=="Medecin")
      {
        App.contracts.Medecin.deployed().then(async function(instance){
          return await instance.addMedecin(cin, nom, prenom, domaine, {from:accounts[0]} );
        }).then(function(result){
          App.contracts.Utilisateur.deployed().then(async function(instance){
            return await instance.addUtilisateur( cin, pass, radio, {from:accounts[0]} );
          }).then(function(result){
            $(':text, :password').val('');
            $(':radio').removeAttr("checked");
            $('.cont_forms_active_sign_up').css("height","520px");
            $('#sign_up_maladie').hide();
            $('#sign_up_Domaine').hide();
            ocultar_login_sign_up();
            alert('Nouveau compte créé pour '+prenom);
          }).catch((err)=>{
            alert(err);
          });
        }).catch((err)=>{
          alert(err);
        });
      }
      else
      {
        App.contracts.Patient.deployed().then(async function(instance){
          return await instance.addPatient( cin, nom, prenom, maladie, {from:accounts[0]} );
        }).then(function(result){
          App.contracts.Utilisateur.deployed().then(async function(instance){
            return await instance.addUtilisateur( cin, pass, radio, {from:accounts[0]} );
          }).then(function(result){
            $(':text, :password').val('');
            $(':radio').removeAttr("checked");
            $('.cont_forms_active_sign_up').css("height","520px");
            $('#sign_up_maladie').hide();
            $('#sign_up_Domaine').hide();
            ocultar_login_sign_up();
            alert('Nouveau compte créé pour '+prenom);
          }).catch((err)=>{
            alert(err);
          });
        }).catch((err)=>{
          alert(err);
        });
      }
    });
  });
});