$(function(){
    $(window).load(async function(){
        resp = await App.init();
        if(resp == false)
        {
          alert("Install MetaMask, connect you to your account and refresh web page."); 
          return ; 
        }
        $('#btnRegister').attr('disabled',true);
        var patientToEditCin = sessionStorage.getItem('patientCIN');
        App.contracts.Patient.deployed().then(async function(instance){
            v_countPatient = await instance.patientCount.call();
            for(var i=0;i<v_countPatient.toNumber();i++)
            {
                let patient = await instance.patients(i);
                if(patient[0].toString() == patientToEditCin)
                {
                    indice = i;
                    $('#sign_up_cin').val(patient[0]);
                    $('#sign_up_nom').val(patient[1]);
                    $('#sign_up_prenom').val(patient[2]);
                    $('#sign_up_maladie').val(patient[3]);
                    cin = $('#sign_up_cin').val();
                    nom = $('#sign_up_nom').val();
                    prenom = $('#sign_up_prenom').val();
                    malad = $('#sign_up_maladie').val();
                    break;
                }

            }
        })
        .catch((err)=>{
            alert(err);
        });
        $('#sign_up_nom, #sign_up_prenom, #sign_up_maladie').change(function(){
            if( $('#sign_up_nom').val() == '' || $('#sign_up_prenom').val() == '' || $('#sign_up_maladie').val() == '' )
            {
                $('#btnRegister').attr('disabled',false);
                return;
            }
            else if( $('#sign_up_nom').val() == nom && $('#sign_up_prenom').val() == prenom && $('#sign_up_maladie').val() == malad )
            {
                $('#btnRegister').attr('disabled',true);
            }
            else
            {
                $('#btnRegister').attr('disabled',false);
            }
        });
        $('#btnRegister').click(async function(){
            if( $('#sign_up_nom').val() == '' || $('#sign_up_prenom').val() == '' || $('#sign_up_maladie').val() == '' )
            {
                alert('Veuillez renseigner toutes les informations, verifier bien.');
                return;
            }
            else
            {
                cin = $('#sign_up_cin').val();
                nom = $('#sign_up_nom').val();
                prenom = $('#sign_up_prenom').val();
                malad = $('#sign_up_maladie').val();
                let accounts = await window.ethereum.enable();
                App.contracts.Patient.deployed().then( async function(instance){
                    return await instance.editPatient( indice, cin, nom, prenom, malad, {from:accounts[0]})
                }).then(function(){ window.location.reload(); })
                .catch((err)=>{
                    alert(err);
                });
            }
        });
    });
});