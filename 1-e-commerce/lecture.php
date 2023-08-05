<?php

/**
 * Rechercher un utilisateur
 *
 */


require "conn/config.php";

$sql = null ;
$result = null;

if (isset($_POST['submit'])) {

  try  {
    $connection = new PDO($dsn, $username, $password);

    $sql = "SELECT * 
            FROM utilisateur
            WHERE id_uti = :id_uti";

    $id_uti = $_POST['id_uti'];
    $statement = $connection->prepare($sql);
    $statement->bindParam(':id_uti', $id_uti, PDO::PARAM_STR);
    $statement->execute();

    $result = $statement->fetchAll();
  } catch(PDOException $error) {
      echo $sql . "<br>" . $error->getMessage();
  }
}
?>
<?php require "templates/header.php"; ?>
        
<?php  
if (isset($_POST['submit'])) {
  if ($result && $statement->rowCount() > 0) { ?>
    <h2>Results</h2>

    <table>
      <thead>
        <tr>
          <th>identifiant</th>
          <th>Nom</th>
          <th>Prenom</th>
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
    <?php } else { ?>
      <blockquote>Aucun résultat trouvé pour l'utilisateur N0 <?php echo $_POST['id_uti']; ?>.</blockquote>
    <?php } 
} ?> 

<h2>Trouver un utilisateur à partir de son identifiant</h2>

<form method="post">
  <label for="id_uti">Identifiant</label>
  <input type="text" id="id_uti" name="id_uti">
  <input type="submit" name="submit" value="View Results">
</form>

<a href="index.php">Retour à l'acceuil</a>

<?php require "templates/footer.php"; ?>