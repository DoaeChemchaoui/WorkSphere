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

function afficherListe(){
    listeStaff.innerHTML = '';
    for(let i=0; i<staffList.length; i++){
        if(staffList[i].zone === 'non-assigné'){
            let div = document.createElement('div');
            div.className = 'worker-card';
            div.innerHTML = '<img src="'+staffList[i].photo+'" class="worker-photo">'+
                            '<div><div class="worker-nom">'+staffList[i].nom+'</div>'+
                            '<div class="worker-role">'+staffList[i].role+'</div></div>';
            (function(index){
                div.onclick = function(){ afficherProfil(staffList[index]); }
            })(i);

            listeStaff.appendChild(div);
        }
    }
}

function checkZones(){
    for(let i=0;i<zones.length;i++){
        let z = zones[i];

        if(z.classList.contains('conf')|| z.classList.contains('perso')|| z.classList.contains('vide')){
            z.classList.remove('empty-required');
            continue;
        }

        let hasWorker = false;
        let children = z.getElementsByClassName('worker-in-zone');
        for(let j=0;j<children.length;j++){ hasWorker = true; }

        if(!hasWorker) z.classList.add('empty-required');
        else z.classList.remove('empty-required');
    }
}
checkZones();
afficherListe();
