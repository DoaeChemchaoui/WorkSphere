let listeStaff = document.getElementById('listeStaff');
let btnOpenModal = document.getElementById('btnOpenModal');
let btnCloseModal = document.getElementById('btnCloseModal');
let modalAdd = document.getElementById('modalAdd');
let formAdd = document.getElementById('formAdd');
let modalProfil = document.getElementById('modalProfil');
let profilContent = document.getElementById('profilContent');
let zones = document.querySelectorAll('.plan div');
let btnZones = document.querySelectorAll('.btn-zone');
let staffList = [];

btnOpenModal.onclick = function() { modalAdd.style.display = 'block'; };
btnCloseModal.onclick = function() { modalAdd.style.display = 'none'; };

window.onclick = function(e) {
    if(e.target == modalAdd) modalAdd.style.display = 'none';
    if(e.target == modalProfil) modalProfil.style.display = 'none';
};

formAdd.onsubmit = function(e){
    e.preventDefault();
    let nom = document.getElementById('nameStaff').value;
    let role = document.getElementById('roleStaff').value;
    let photo = document.getElementById('photoStaff').value;
    let email = document.getElementById('emailStaff').value;
    let phone = document.getElementById('phoneStaff').value;
    let exp = document.getElementById('expStaff').value;

    if(nom === '') { alert("Nom obligatoire"); return; }

    let employe = {
        nom: nom,
        role: role,
        photo: photo,
        email: email,
        phone: phone,
        exp: exp,
        zone: 'non-assigné'
    };
    staffList.push(employe);
    afficherListe();
    formAdd.reset();
    modalAdd.style.display = 'none';
    checkZones();
};