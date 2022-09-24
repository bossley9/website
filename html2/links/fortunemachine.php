<html>
<head>
<title>The Fortune Machine</title>
<style type="text/css">
@import url(../css/input.css);
.ferp {
  font-size:15;
}
</style>
<?php
include "../../conn.php";
$quotes = "SELECT fortune FROM fortunes ORDER BY RANDOM() LIMIT 1";
$result = pg_query($connect, $quotes);
?>
</head>
<body>
<br><br><br>
<center><table height="300" width="600">
  <tr><td>
<br><br>
    <form action="" method="get"><center><input type="submit" name="fort_button" value="Click for a new fortune"></center></form>
  </td></tr>
  <tr><td><center>
    <?php
      echo "Your fortune reads this:";
    ?>
<center></tr></td>
<tr><td>
<i><center>
<font class="ferp">
<?php
      WHILE ($row = pg_fetch_array($result)):
         echo $row['fortune'];
      ENDWHILE; 
      extract ($row);
?>
</font>
</center></i>
 </td></tr>
</table></center>
<br>
<center>Back to</center>
<center><a href="../stealth.html"><img src="../assets/stealthblack.png"></a></center>
</body>
</html>
