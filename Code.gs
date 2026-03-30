function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || "",
    data.nom || "",
    data.prenom || "",
    data.age || "",
    data.telephone || "",
    data.email || "",
    data.wilaya || "",
    data.genre || "",
    data.allergies || "",
    data.statut || "",
    data.universite || "",
    data.matricule_etudiant || "",
    data.num_cin || "",
    data.motivation || "",
    data.thematique || "",
    data.profil || "",
    data.idee || "",
    data.vehicule || "",
    data.questions || "",
    data.consentement || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}