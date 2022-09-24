<html>
<head>
<title>Fortune Database</title>
<style type="text/css">
@import url(css/input.css);
</style>
</head>
<body>
<?php
include "../conn.php";
?>
<?php
$insert = "insert into fortunes(fortune) values ('" . $_POST['fort'] . "')";
$results = pg_query($connect, $insert) or die (pg_last_error());
?>

<?php
echo "Fortune added: \n<br />"; 
echo $_POST['fort'];
?>

<table>
<tr><th>Ref#</th><th>Fortune</th></tr>

<?php
$query = "SELECT fortune_id, fortune FROM fortunes"; 
$results = pg_query($connect, $query) or die(pg_last_error());
while ($row = pg_fetch_array($results)){
extract ($row);
echo "<tr><td>";
echo $fortune_id;
echo "</td><td>";
echo $fortune;
echo "</td></tr>";
}
?>

</table>
<meta HTTP-EQUIV="REFRESH" content="0; url=input.html">
</body>
</html>
