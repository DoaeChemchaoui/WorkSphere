# WorkSphere

**WorkSphere** est une plateforme web moderne et interactive permettant de gérer les employés d’une entreprise, de visualiser leurs zones d'affectation, de consulter leurs profils et de gérer leurs expériences professionnelles.  
Le projet offre une expérience fluide, intuitive et centrée sur l'organisation interne.

---

## Contexte du projet

L’entreprise souhaite disposer d’un outil visuel pour :

- Gérer facilement les employés  
- Les assigner aux zones de travail selon leurs rôles  
- Visualiser en temps réel l’occupation des espaces  
- Centraliser les informations (profil, rôle, contact, expériences)  
- Garantir une interface moderne, responsive et simple d’utilisation  

L’objectif est de créer une application dynamique, ergonomique, et totalement manipulable via JavaScript .

---

## User Stories

- Ajouter un employé avec : nom, rôle, photo, email, téléphone  
- Ajouter plusieurs expériences professionnelles (formulaire dynamique)  
- Consulter la liste des employés non assignés  
- Voir le profil complet d’un employé  
- Déplacer un employé vers une zone spécifique (avec restrictions logiques)  
- Retirer un employé d’une zone et le remettre dans "Unassigned"  
- Prévisualiser la photo lors de l’ajout  
- Valider les données du formulaire avec REGEX  
- Avoir des zones intelligentes qui changent de couleur si elles sont vides  
- S’assurer qu’une zone respecte le nombre maximum de personnes  
- Interface totalement responsive (Desktop → Mobile)

---

# Technologies utilisées

- **HTML5** – structure générale  
- **CSS3** – design moderne, responsive (Grid, Flexbox, animations)  
- **JavaScript ES6** – logique métier, DOM, événements, modales  
- **Trello** – organisation du travail (Scrum)  
- **Git & GitHub** – versionning du code et hébergement  
- **Vercel** – déploiement final du projet  

---

## Rôles & Missions

### Conception & Design
- Création d’interfaces Desktop & Mobile  
- Palette de couleurs cohérente  
- Design moderne : boutons arrondis (vert/orange/rouge), animations fluides  

### Développement Front-End
- Structure HTML avec sidebar (Unassigned Staff)  
- Modale d’ajout d’un employé : Nom, Rôle, Photo, Email, Téléphone  
- Formulaire dynamique pour les expériences (ajout/suppression en live)  
- **Prévisualisation automatique de la photo**  
- Validation REGEX (email, téléphone, nom)  
- Affichage du bâtiment avec 6 zones :
  - Salle de conférence  
  - Réception  
  - Salle des serveurs  
  - Salle de sécurité  
  - Salle du personnel  
  - Salle des archives  

- Système de **restrictions par rôle** :  
  - Réception → Réceptionnistes uniquement  
  - Salle des serveurs → Techniciens IT  
  - Salle de sécurité → Agents de sécurité  
  - Manager → partout  
  - Nettoyage → partout **sauf Salle des archives**  
  - Autres rôles → zones standards  

- Ajout d’un bouton “X” sur chaque employé pour le retirer d’une zone  
- Ouverture de la modale Profil (photo, infos, expériences, zone actuelle)  
- Bouton “+” dans chaque zone pour ajouter un employé admissible  
- Zones obligatoires colorées en rouge clair si vides  
- Limitations du nombre d’employés par zone  
- Entièrement responsive (mobile-friendly)  
- Validation HTML & CSS via W3C  

### Gestion de projet (Scrum)
- Trello organiser les User Stories  
- Préparation et démonstration du projet final  

---

## Pages et Sections du Projet

###  Interface principale
- Sidebar : liste des employés non assignés (« Unassigned Staff »)  
- Bouton “Add New Worker” ouvrant la modale d’ajout  
- Zones du bâtiment affichées sous forme de cartes  

###  Modale d’ajout d’un employé
- Champs : Nom, Rôle, Photo (URL), Email, Téléphone  
- Ajout dynamique d’expériences professionnelles  
- Prévisualisation de la photo  
- Validation REGEX  
- Bouton “Save Worker”  

###  Zones d’affectation
- 6 zones avec restrictions d’accès  
- Bouton “+” pour ajouter un employé  
- Bouton “X” pour retirer un employé  
- Mise à jour automatique de la zone et du DOM  
- Zones rouges si vides et obligatoires  

###  Profil d’un employé
- Photo grand format  
- Infos : nom, rôle, email, téléphone  
- Liste des expériences  
- Zone actuelle  
- Design propre et lisible  

---

## Fonctionnalités principales développées

- Gestion des employés  
- Validation avec REGEX  
- Mise à jour en temps réel du DOM  
- Gestion des exceptions et messages d’erreur  
- Formulaire dynamique pour les expériences  
- Affichage responsive avec CSS Grid et Flexbox  
- Système complet de restrictions selon les rôles  
- Zones dynamiques + indicateurs visuels  
- Modales interactives (profil + ajout employé)  
- Filtrage logique des employés selon zone  
