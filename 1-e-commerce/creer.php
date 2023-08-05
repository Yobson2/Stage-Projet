<?php

/**
 * Utilisez un formulaire HTML pour créer une nouvelle entrée dans la table utilisateur. 
 * Us
 *
 */

require "conn/config.php";

if (isset($_POST['submit'])) {

  try  {
     $connection = new PDO($dsn, $username, $password);

    $ajout =[
      "id_uti"   => $_POST['id_uti'],
      "nom_uti"   => $_POST['nom_uti'],
      "penom_uti" => $_POST['penom_uti'],
      "email_uti" => $_POST['email_uti'],
      "age_uti"   => $_POST['age_uti'],
      "genre_uti" => $_POST['genre_uti'],
      "date"      => $_POST['date']
    ];


    $sql = "INSERT INTO utilisateur (id_uti, nom_uti,penom_uti,email_uti,age_uti,genre_uti,date) VALUES (:id_uti, :nom_uti,:penom_uti,:email_uti,:age_uti,:genre_uti,:date)";
    
    $statement = $connection->prepare($sql);
    $statement->execute($ajout);
  } catch(PDOException $error) {
      echo $sql . "<br>" . $error->getMessage();
  }
}
?>
<?php require "templates/header.php"; ?>

  <?php if (isset($_POST['submit']) && $statement) : ?>
    Ajout avec succès de <blockquote><?php echo $_POST['nom_uti']; ?>.</blockquote>
  <?php endif; ?>

  <h2>Ajouter un utilisateur</h2>

  <form method="post">
    <label for="id_uti">Identifiant</label>
     <input type="text" name="id_uti" id="id_uti">
    <label for="nom_uti">Nom</label>
    <input type="text" name="nom_uti" id="nom_uti">
    <label for="penom_uti">Prenoms</label>
    <input type="text" name="penom_uti" id="penom_uti">
    <label for="email_uti">Adresse mail</label>
    <input type="text" name="email_uti" id="email_uti">
    <label for="age_uti">Age</label>
    <input type="text" name="age_uti" id="age_uti">
    <label for="genre_uti">Genre</label>
    M<input type="radio" name="genre_uti" id="genre_uti" value="M" checked>
    F<input type="radio" name="genre_uti" id="genre_uti" value="F">
    <label for="date">Date</label>
    <input type="date" name="date" id="date">
    <input type="submit" name="submit" value="Submit">
  </form>

  <a href="index.php">Retour à l'acceuil</a>

<?php require "templates/footer.php"; ?>
