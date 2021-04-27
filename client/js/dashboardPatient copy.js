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
        App.contracts.Patient.deployed().then(async function(instance){
            medCount = await instance.patientCount.call();
            for(var i=0;i<medCount;i++)
            {
                util = await instance.patients(i);
                if(util[0] == cin)
                {
                    $('#hello').html('Hello '+util[2].toString());
                    $('#h3').html(util[2].toString()+' '+util[1].toString());
                    $('#top').html(util[2].toString()+' '+util[1].toString());
                    $('#maladieAff').html(util[3]);
                    $('#cinAff').html(util[0]);
                    $('#prenom').val(util[2]);
                    $('#nom').val(util[1]);
                    $('#cin').val(util[0]);
                    $('#maladie').val(util[3]);
                    $('#cinCompte').val(util[0]);
                    App.contracts.Utilisateur.deployed().then(async function(instance){
                        let utili = await instance.utilisateurs(cin);
                        $('#pass').val(utili[1]);
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
            $('#retour').attr('href','/patient_bienvenue');
        });
    } );
});