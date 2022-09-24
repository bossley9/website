<?php
$connect = pg_connect("host=localhost user=sam password=tyning8 dbname=webstuff") or die("This is not cool." . pg_last_error());
?>
