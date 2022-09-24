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
        redirect('part2-1.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part2-2.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part0-1.1.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part2-4.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You start walking North. The forest starts to grow much denser the further you go, until it gets to the point where you must push through all the foilage. Suddenly you reach a wide circular-shaped clearing with a small plant in the middle. It has thorns poking out from its stem, and a golden-colored fruit on the top. Should you eat it?
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Cautiously approach and eat the fruit</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Run further into the forest, away from the fruit</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Don't eat the fruit, but go back the way you came</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Uproot the plant to kill it</option> 
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
