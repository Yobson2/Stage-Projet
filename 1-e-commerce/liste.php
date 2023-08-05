<?php

/**
 * Liste des utilisateurs
 */

require "conn/config.php";

$success = null;

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
        
<h2> Affichage d'utilisateur</h2>

<?php if ($success) echo $success; ?>


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
       
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>

<a href="index.php">Retour à l'acceuil</a>

<?php require "templates/footer.php"; ?>