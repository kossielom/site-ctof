<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $targetDir = "videos/";
  $title = htmlspecialchars($_POST['title']);
  $file = $_FILES['video'];
  $fileName = basename($file['name']);
  $targetFile = $targetDir . $fileName;

  $allowed = ['mp4', 'mov', 'webm'];
  $ext = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

  if (!in_array($ext, $allowed)) {
    echo "❌ Format non autorisé.";
    exit;
  }

  if (move_uploaded_file($file['tmp_name'], $targetFile)) {
    echo "✅ Vidéo uploadée avec succès !<br>";
    echo "<a href='admin.html'>Retour</a>";
    // Facultatif : enregistrer dans un fichier JSON ou DB
  } else {
    echo "❌ Erreur lors du téléchargement.";
  }
}
?>
