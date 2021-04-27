$(function(){
    $(window).load( async function(){
        resp = await App.init();
        if(resp == false)
        {
          alert("Install MetaMask, connect you to your account and refresh web page."); 
          return ; 
        }
        let v_patientCount;
        App.contracts.Patient.deployed().then(async function(instance){
            v_patientCount = await instance.patientCount.call();
            let v_patient = null;
            if(v_patientCount == 0)
            {
                $('tfoot').html('<tr><th colspan="4">Aucun patient enregistré.</th></tr>');
            }
            else
            {    
                $('tbody').html('');
                $('tfoot').html('');
                for(var i=0;i<v_patientCount;i++)
                {
                    v_patient = await instance.patients(i);
                    ligne = '<tr> <td data-title="CIN">'+v_patient['cin']+'</td> <td data-title="Prénom & Nom">'+v_patient['prenom']+' '+v_patient['nom']+'</td> <td data-title="Maladie">'+v_patient['type_maladie']+'</td> <td class="select"><a href="/edit_patient" onclick="save(document.getElementById(\''+v_patient['cin'].toString()+'\'));" class="button" id="'+v_patient['cin'].toString()+'">Edit</a></td></tr>';
                    $('tbody').append(ligne);
                }
            }
        })
        .catch((err)=>{
            alert(err);
        });
    });
});
function save(ob)
{
    sessionStorage.setItem( 'patientCIN', ob.id );
}