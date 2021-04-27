$(function(){
    $(window).load( async function() {
        resp = await App.init();
        if(resp == false)
        {
          alert("Install MetaMask, connect you to your account and refresh web page."); 
          return ;
        }
        $('#cin, #cinCompte, #btnEdit').attr('disabled',true);
        cin = sessionStorage.getItem('cin');
        App.contracts.Medecin.deployed().then(async function(instance){
            medCount = await instance.medecinCount.call();
            for(var i=0;i<medCount;i++)
            {
                util = await instance.medecins(i);
                if(util[0].toString() == cin)
                {
                    indice = i;
                    $('#hello').html('Hello '+util[2].toString());
                    $('#h3').html(util[2].toString()+' '+util[1].toString());
                    $('#top').html(util[2].toString()+' '+util[1].toString());
                    $('#domaineAff').html(util[3]);
                    $('#cinAff').html(util[0]);
                    $('#prenom').val(util[2]);
                    $('#nom').val(util[1]);
                    $('#cin').val(util[0]);
                    $('#domaine').val(util[3]);
                    $('#cinCompte').val(util[0]);
                    cin = $('#cin').val();
                    prenom = $('#prenom').val();
                    nom = $('#nom').val();
                    domaine = $('#domaine').val();
                    App.contracts.Utilisateur.deployed().then(async function(instance){
                        let utili = await instance.utilisateurs(cin);
                        $('#pass').val(utili[1]);
                        pass = $('#pass').val();
                    })
                    .catch((err) =>{
                        alert(err);
                    });
                    break
                }
            }
        }).catch((err) =>{
            alert(err);
        });
        $('#retour').click(function(event){
            $('#retour').attr('href','/medecin_bienvenue');
        });
        $('#btnEdit').click(async function(event){
            event.preventDefault();
            if($('#prenom').val()==prenom && $('#nom').val()==nom && $('#domaine').val()==domaine && $('#pass').val()==pass)
            {
                alert("Aucune information n'a été changée...")
                return;
            }
            else
            {
                let accounts = await window.ethereum.enable();
                if(($('#prenom').val()!=prenom || $('#nom').val()!=nom || $('#domaine').val()!=domaine) && $('#pass').val()!=pass)
                {
                    if($('#confirmation').val()=='')
                    {
                        alert("Veuillez confirmer le nouveau Mot de Passe...");
                        return;
                    }
                    if($('#confirmation').val()!=$('#pass').val())
                    {
                        alert("Le Mot de passe saisie n'est pas le même qui a été confirmé...");
                        return;
                    }
                    prenom = $('#prenom').val();
                    nom = $('#nom').val();
                    domaine = $('#domaine').val();
                    pass = $('#pass').val();
                    App.contracts.Medecin.deployed().then(async function(instance){
                        return await instance.editMedecin(indice,cin,nom,prenom,domaine,{from:accounts[0]});
                    }).then(function(){
                        App.contracts.Utilisateur.deployed().then(async function(instance){
                            return await instance.addUtilisateur(cin,pass,"Medecin",{from:accounts[0]})
                        }).then(function(){ window.location.reload(); })
                        .catch((err)=>{
                            alert(err);
                        });
                    })
                    .catch((err)=>{ alert(err); });
                    return;
                }
                else if($('#prenom').val()!=prenom || $('#nom').val()!=nom || $('#domaine').val()!=domaine)
                {
                    prenom = $('#prenom').val();
                    nom = $('#nom').val();
                    domaine = $('#domaine').val();
                    App.contracts.Medecin.deployed().then(async function(instance){
                        return await instance.editMedecin(indice,cin,nom,prenom,domaine,{from:accounts[0]});
                    }).then(function(){ window.location.reload(); })
                    .catch((err)=>{
                        alert(err);
                    });
                    return;
                }
                else
                {
                    if($('#confirmation').val()=='')
                    {
                        alert("Veuillez confirmer le nouveau Mot de Passe...");
                        return;
                    }
                    else if($('#confirmation').val()!=$('#pass').val())
                    {
                        alert("Le Mot de passe saisie n'est pas le même qui a été confirmé...");
                        return;
                    }
                    else
                    {
                        pass = $('#pass').val();
                        App.contracts.Utilisateur.deployed().then(async function(instance){
                            return await instance.addUtilisateur(cin,pass,"Medecin",{from:accounts[0]})
                        }).then(function(){ window.location.reload(); })
                        .catch((err)=>{
                            alert(err);
                        });
                        return;
                    }
                }
            }
        });
        $('#prenom, #nom, #domaine, #pass').change(function(){
            if($('#prenom').val()=='')
            {
                $('#prenom').val(prenom);
            }
            else if($('#nom').val()=='')
            {
                $('#nom').val(nom);
            }
            else if($('#domaine').val()=='')
            {
                $('#domaine').val(domaine);
            }
            else if($('#pass').val()=='')
            {
                $('#pass').val(pass);
            }
        });
    });
});