
let listeStaff = document.getElementById('listeStaff');
let btnOpenModal = document.getElementById('btnOpenModal');
let btnCloseModal = document.getElementById('btnCloseModal');
let modalAdd = document.getElementById('modalAdd');
let formAdd = document.getElementById('formAdd');
let modalProfil = document.getElementById('modalProfil');
let profilContent = document.getElementById('profilContent');
let zones = document.querySelectorAll('.plan > div');
let btnZones = document.querySelectorAll('.btn-zone');
let staffList = [];
afficherListe();
 checkZones();
btnOpenModal.onclick = () => modalAdd.style.display = 'block';
    btnCloseModal.onclick = () =>{
        modalAdd.style.display = 'none';
    } 

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

formAdd.onsubmit = (e) => {
    e.preventDefault();

    const nom   = nameStaff.value;
    const role  = roleStaff.value;
    const photo = photoStaff.value;
    const email = emailStaff.value;
    const phone = phoneStaff.value;

    const nameRg  = /^[A-Za-z\s]+$/;
    const emailRg = /.+@.+\..+/;
    const phonerg = /^\d{10}$/;
    if(!nameRg.test(nom)) {
        alert("Nom invalide !");
        return;
    }
    if(!emailRg.test(email)) {
        alert("Email invalide !");
        return;
    }
    if(!phonerg.test(phone)) {
        alert("Téléphone invalide !");
        return;
    }

    const companies = document.querySelectorAll('.exp-company');
    const starts    = document.querySelectorAll('.exp-start');
    const ends      = document.querySelectorAll('.exp-end');

    let experiences = [];
    for (let i = 0; i < companies.length; i++) {
        const company = companies[i].value;
        const start   = starts[i].value;
        const end     = ends[i].value;
        if (start && end && new Date(start) > new Date(end)) {
            alert("La date de début doit être antérieure à la date de fin !");
            return;
        }
        experiences.push({ company, start, end });
    }
    staffList.push({
        nom, role, photo, email, phone,
        experiences,
        zone: "non-assigné"
    });
    afficherListe();
    checkZones();
    formAdd.reset();
    experienceContainer.innerHTML = '<h4>Expériences professionnelles</h4>';
    modalAdd.style.display = 'none';
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
    if (zone.classList.contains('reception')) {
        if (role !== 'Receptionniste' && role !== 'Manager' && role !== 'Nettoyage') return false;
    }
    if (zone.classList.contains('serveurs')) {
        if (role !== 'Technicien' && role !== 'Manager' && role !== 'Nettoyage') return false;
    }
    if (zone.classList.contains('securité')) {
        if (role !== 'Sécurité' && role !== 'Manager' && role !== 'Nettoyage') return false;
    }
    if (role === 'Manager') return true;
    if (role === 'Nettoyage' && zone.classList.contains('archives')) return false;
    if (role === 'Autre') {
        if (zone.classList.contains('reception')) return false;
        if (zone.classList.contains('serveurs')) return false;
        if (zone.classList.contains('securité')) return false;
    }
    return true;
}

btnZones.forEach(function(btn) {
    btn.onclick = function() {
        let zone = btn.parentElement;

        let staffCards = Array.from(listeStaff.getElementsByClassName('worker-card'));
        if (staffCards.length === 0) {
            alert("Aucun employé disponible !");
            return;
        }

        let msg = "Choisir un employé en entrant le numéro :\n";
        for (let i = 0; i < staffCards.length; i++) {
            let nom = staffCards[i].querySelector('.worker-nom').innerText;
            msg += (i) + ": " + nom + "\n";
        }

        let choix = prompt(msg);
        let index = choix;

        if (index < 0 || index >= staffCards.length) {
            alert("Choix invalide !");
            return;
        }

        let staffName = staffCards[index].querySelector('.worker-nom').innerText;
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


function afficherProfil(staff) {
    let expHTML = "";
    for (let i = 0; i < staff.experiences.length; i++) {
        let e = staff.experiences[i];
        expHTML += "<p>" + e.company + " (" + e.start + " → " + e.end + ")</p>";
    }
    profilContent.innerHTML = `
    <span class="close" onclick="document.getElementById('modalProfil').style.display='none'">x</span>
    <img src="${staff.photo}" style="width:100px;height:100px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 15px;">
    <p><b>Nom:</b> ${staff.nom}</p>
    <p><b>Rôle:</b> ${staff.role}</p>
    <p><b>Email:</b> ${staff.email}</p>
    <p><b>Téléphone:</b> ${staff.phone}</p>
    <p><b>Expériences:</b></p>
    ${expHTML}
    <p><b>Localisation:</b> ${staff.zone}</p>
    `;
    modalProfil.style.display = 'block';
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
function checkZones() {
    zones.forEach(z => {
        let hasWorker = z.getElementsByClassName('worker-in-zone').length > 0;
        if(!hasWorker && !z.classList.contains('conference') && !z.classList.contains('personel') && !z.classList.contains('vide')) {
            z.classList.add('empty-required');
        } else {
            z.classList.remove('empty-required');
        }
    });
}
checkZones();
afficherListe();