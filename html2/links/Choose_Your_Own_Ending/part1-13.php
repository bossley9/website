<html>
<head>
<title>Middle Earth</title>
</head>
<style>
@import url(../../css/input.css);
</style>
<body>
 <?PHP
    function redirect($where){      
       header("Location: $where");
    }
    if ($_REQUEST['select1-1'] == 'A1-1'){
        redirect('part2-10.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part2-11.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You struggle to climb the tree, and by the time you reach the top, you can barely stand because of hunger. Nearby you see a small wooden platform on the tree with a zipline going down from the top of the tree. What should you do?
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Ride the zipline down</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Climb back down the tree</option> 
  </optgroup>
</center></td></tr>

<tr><td><center>
  <input type="submit" value="next"/>
  </select> 
  </form>
</center></td></tr>

</table></center>

<br>
<center>Back to</center>
<center><a href="../../stealth.html"><img src="../../assets/stealthblack.png"></a></center>

</body>
</html>
