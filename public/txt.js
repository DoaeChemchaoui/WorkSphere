btnZones.forEach(btn => {
    btn.onclick = () => {
        let zone = btn.closest('div');
        let msg = "Choisir un employé :\n";
        staffList.forEach((s, i) => {
            msg += `${i + 1}: ${s.nom} (${s.zone})\n`;
        });

        let choix = parseInt(prompt(msg)) - 1;
        if (isNaN(choix) || choix < 0 || choix >= staffList.length) return;

        let staff = staffList[choix];
        document.querySelectorAll('.worker-in-zone').forEach(w => {
            if (w.dataset.name === staff.nom) w.remove();
        });

        let divWorker = document.createElement('div');
        divWorker.className = 'worker-in-zone';
        divWorker.dataset.name = staff.nom;
        divWorker.innerHTML = `
            <img src="${staff.photo}">
            <p>${staff.nom}</p>
            <p>${staff.role}</p>
        `;

        let btnRemove = document.createElement('button');
        btnRemove.className = 'btn-remove';
        btnRemove.innerText = 'x';
        btnRemove.onclick = function (e) {
            e.stopPropagation();
            divWorker.remove();
            staff.zone = "non-assigné";
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

// staffList = [  { "nom": "Bob", "role": "Technicien", "photo": "https://intranet.youcode.ma/storage/users/profile/1704-1760996374.png", "email": "bob@example.com", "phone": "0698765432", "experiences": [ {"company":"Entreprise B","start":"2019-03-01","end":"2020-02-28"} ], "zone": "non-assigné" }, { "nom": "Charlie", "role": "Sécurité", "photo": "https://intranet.youcode.ma/storage/users/profile/1704-1760996374.png", "email": "charlie@example.com", "phone": "0623456789", "experiences": [], "zone": "non-assigné" }, { "nom": "Diana", "role": "Manager", "photo": "https://intranet.youcode.ma/storage/users/profile/1704-1760996374.png", "email": "diana@example.com", "phone": "0634567890", "experiences": [], "zone": "non-assigné" }, { "nom": "Eve", "role": "Nettoyage", "photo": "https://intranet.youcode.ma/storage/users/profile/1704-1760996374.png", "email": "eve@example.com", "phone": "0645678901", "experiences": [], "zone": "non-assigné" }, { "nom": "Frank", "role": "Autre", "photo": "https://via.placeholder.com/50", "email": "frank@example.com", "phone": "0656789012", "experiences": [], "zone": "non-assigné" },{ nom: "Alice", "role": "Receptionniste", "photo": "https://intranet.youcode.ma/storage/users/profile/1704-1760996374.png", "email": "alice@example.com", "phone": "0612345678", "experiences": [ {"company":"Entreprise A","start":"2025-01-01","end":"2021-01-01"} ], "zone": "non-assigné" } ] 
