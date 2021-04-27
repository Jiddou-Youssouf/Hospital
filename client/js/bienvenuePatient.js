$(function(){

/***************** Nav Transformicon ******************/

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});


$(window).load( async function() {
	$('.learn-more-btn').click(function(){ sessionStorage.removeItem('cin') ; sessionStorage.removeItem('patientCIN') ; });

	$('.nav_slide_button').click(function() {
		$('.pull').slideToggle();
	});
    resp = await App.init();
    if(resp == false)
    { 
      alert("Install MetaMask, connect you to your account and refresh web page."); 
      return ; 
    }
	var cin = sessionStorage.getItem('cin');
	App.contracts.Patient.deployed().then(async function(instance){
		medCount = await instance.patientCount.call();
		for(var i=0;i<medCount;i++)
		{
			var element = await instance.patients(i);
			if(element[0] == cin)
			{
				$('#utilisateurConnecte').html(element[2].toUpperCase());
				break;
			}
		}
	  }).catch((err) =>{
		alert(err);
	  });

});
});