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

btnOpenModal.onclick = () => modalAdd.style.display = 'block';
btnCloseModal.onclick = () => modalAdd.style.display = 'none';
window.onclick = (e) => {
    if(e.target === modalAdd) modalAdd.style.display = 'none';
    if(e.target === modalProfil) modalProfil.style.display = 'none';
};

const experienceContainer = document.getElementById('experience-container');
const addExperienceBtn = document.getElementById('addExperience');

addExperienceBtn.onclick = () => {
    const div = document.createElement('div');
    div.className = 'experience-entry';
    div.innerHTML = `
        <input type="text" placeholder="Entreprise" class="exp-company" required>
        <input type="date" class="exp-start" required>
        <input type="date" class="exp-end" required>
        <button type="button" class="remove-exp">Supprimer</button>`;
    
    div.querySelector('.remove-exp').onclick = () => div.remove();
    experienceContainer.appendChild(div);
};


formAdd.onsubmit = function(e) {
    e.preventDefault();
    let nom = document.getElementById('nameStaff').value;
    let role = document.getElementById('roleStaff').value;
    let photo = document.getElementById('photoStaff').value;
    let email = document.getElementById('emailStaff').value;
    let phone = document.getElementById('phoneStaff').value;

    const expEntries = document.querySelectorAll('.experience-entry');
    let experiences = [];

    for (let entry of expEntries) {
        const company = entry.querySelector('.exp-company').value;
        const start = entry.querySelector('.exp-start').value;
        const end = entry.querySelector('.exp-end').value;

        if (start && end && new Date(start) > new Date(end)) {
            alert("La date de début doit être antérieure à la date de fin !");
            return;
        }
        experiences.push({ company, start, end });
    }

    let employe = { nom, role, photo, email, phone, experiences, zone: 'non-assigné' };
    staffList.push(employe);
    afficherListe();
    formAdd.reset();
    experienceContainer.innerHTML = '<h4>Expériences professionnelles</h4>';
    modalAdd.style.display = 'none';
    checkZones();
};

function afficherListe() {
    listeStaff.innerHTML = '';
    staffList.forEach(staff => {
        if(staff.zone === 'non-assigné') {
            let div = document.createElement('div');
            div.className = 'worker-card';
            div.innerHTML = `
                <img src="${staff.photo}" class="worker-photo">
                <div>
                    <div class="worker-nom">${staff.nom}</div>
                    <div class="worker-role">${staff.role}</div>
                </div>`;
            div.onclick = function() { afficherProfil(staff); };
            listeStaff.appendChild(div);
        }
    });
}

function zoneAutorisee(staff, zone) {
    const role = staff.role;
    if(zone.classList.contains('reception') && !['Receptionniste','Manager','Nettoyage'].includes(role)) return false;
    if(zone.classList.contains('serveurs') && !['Technicien','Manager','Nettoyage'].includes(role)) return false;
    if(zone.classList.contains('securité') && !['Sécurité','Manager','Nettoyage'].includes(role)) return false;
    if(role === 'Manager') return true;
    if(role === 'Nettoyage' && zone.classList.contains('archives')) return false;
    if(role === 'Autre' && ['reception','serveurs','securité'].some(c => zone.classList.contains(c))) return false;
    return true;
}

btnZones.forEach(function(btn) {
    btn.onclick = function() {
        let zone = btn.closest('div');

         staffCards = Array.from(listeStaff.getElementsByClassName('worker-card'));
        if (staffCards.length === 0) {
            alert("Aucun employé disponible !");
            return;
        }

        let msg = "Choisir un employé en entrant le numéro :\n";
        for (let i = 0; i < staffCards.length; i++) {
            let nom = staffCards[i].querySelector('.worker-nom').innerText;
            msg += (i + 1) + ": " + nom + "\n";
        }

        let choix = parseInt(prompt(msg), 10) - 1;
        if (isNaN(choix) || choix < 0 || choix >= staffCards.length) {
            alert("Choix invalide !");
            return;
        }

        let staffName = staffCards[choix].querySelector('.worker-nom').innerText;
        let staff = staffList.find(s => s.nom === staffName);

        if (!zoneAutorisee(staff, zone)) {
            alert(staff.role + " ne peut pas être affecté à cette zone !");
            return;
        }

        let nbWorkers = zone.getElementsByClassName('worker-in-zone').length;
        if (nbWorkers >= 5) {
            alert("Zone complète ! Maximum 5 employés.");
            return;
        }

        let divWorker = document.createElement('div');
        divWorker.className = 'worker-in-zone';
        divWorker.innerHTML = `
            <img src="${staff.photo}">
            <p>${staff.nom}</p>
            <p>${staff.role}</p>
        `;
        divWorker.onclick = function() { afficherProfil(staff); };

        let btnRemove = document.createElement('button');
        btnRemove.className = 'btn-remove';
        btnRemove.innerText = 'x';
        btnRemove.onclick = function(e) {
            e.stopPropagation();
            divWorker.remove();
            staff.zone = 'non-assigné';
            afficherListe();
            checkZones();
        };
        divWorker.appendChild(btnRemove);

        zone.querySelector('.workers-container').appendChild(divWorker);

        staff.zone = zone.classList[0];
        afficherListe();
        checkZones();
    };
});

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
let imgModal = document.getElementById('img-modal');
let photoInput = document.getElementById('photoStaff');

photoInput.addEventListener('input', function() {
    if(photoInput.value.trim() !== '') {
        imgModal.src = photoInput.value;
    } else {
        imgModal.src = '';
    }
});

checkZones();
afficherListe();