<?php

/**
 * Supprimer un utilisateur
 */

require "conn/config.php";

$success = null;

if (isset($_POST["submit"])) {

  try {
    $connection = new PDO($dsn, $username, $password);
  
    $id = $_POST["submit"];

    $sql = "DELETE FROM utilisateur WHERE id_uti = :id";

    $statement = $connection->prepare($sql);
    $statement->bindValue(':id', $id);
    $statement->execute();

    $success = "Utilisateur supprimé avec succès";
  } catch(PDOException $error) {
    echo $sql . "<br>" . $error->getMessage();
  }
}

try {
  $connection = new PDO($dsn, $username, $password);

  $sql = "SELECT * FROM utilisateur";

  $statement = $connection->prepare($sql);
  $statement->execute();

  $result = $statement->fetchAll();
} catch(PDOException $error) {
  echo $sql . "<br>" . $error->getMessage();
}
?>
<?php require "templates/header.php"; ?>
        
<h2>Suppression d'utilisateur</h2>

<?php if ($success) echo $success; ?>

<form method="post">
  <table>
    <thead>
      <tr>
        <th>Identifiant</th>
        <th>Nom</th>
        <th>Prenoms</th>
        <th>Email</th>
        <th>Age</th>
        <th>Genre</th>
        <th>Date</th>
        <th>Spprimer</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($result as $row) : ?>
      <tr>
        <td><?php echo $row["id_uti"]; ?></td>
        <td><?php echo $row["nom_uti"]; ?></td>
        <td><?php echo $row["penom_uti"]; ?></td>
        <td><?php echo $row["email_uti"]; ?></td>
        <td><?php echo $row["age_uti"]; ?></td>
        <td><?php echo $row["genre_uti"]; ?></td>
        <td><?php echo $row["date"]; ?> </td>
        <td><button type="submit" name="submit" value="<?php echo $row["id_uti"]; ?>">Supprimer</button></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</form>

<a href="index.php">Retour à l'acceuil</a>

<?php require "templates/footer.php"; ?>