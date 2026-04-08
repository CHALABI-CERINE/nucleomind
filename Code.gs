// ============================================================
// NucleoMind — Google Apps Script Web App
// Paste this in: script.google.com → New project
// Link it to the spreadsheet via Tools → Script editor
// Deploy → New deployment → Web App → Anyone → Deploy
// Copy the /exec URL into app.js SHEETS_WEBHOOK_URL
// ============================================================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Inscriptions");
    const data  = JSON.parse(e.postData.contents);

    // Write header row on first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Horodatage", "Langue", "Nom", "Prénom", "Âge", "Téléphone", "Email",
        "Wilaya", "Genre", "Allergies / Maladie", "Statut",
        "Université", "Matricule étudiant", "N° CIN",
        "Motivation", "Thématique", "Profil dans l'équipe",
        "Immatriculation véhicule", "Questions supplémentaires", "Consentement"
      ]);
    }

    sheet.appendRow([
      data.timestamp            || new Date().toISOString(),
      data.langue               || "fr",
      data.nom                  || "",
      data.prenom               || "",
      data.age                  || "",
      data.telephone            || "",
      data.email                || "",
      data.wilaya               || "",
      data.genre                || "",
      data.allergies            || "",
      data.statut               || "",
      data.universite           || "",
      data.matricule_etudiant   || "",
      data.num_cin              || "",
      data.motivation           || "",
      data.thematique           || "",
      data.profil               || "",
      data.vehicule             || "",
      data.questions            || "",
      data.consentement ? "Oui" : "Non"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: "Inscription enregistrée." }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET for connectivity check
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "NucleoMind webhook actif." }))
    .setMimeType(ContentService.MimeType.JSON);
}