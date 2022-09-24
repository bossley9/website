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
        redirect('part1-10.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part1-11.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part1-12.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part1-13.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You start to search the forest for an animal to kill. You find nothing, and you stop by a huge tree to rest. There is a cave ahead of you, a narrow path to the right, and what seems to be a castle ahead in the distance. 
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Go inside the cave</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Walk the narrow path</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Walk towards the castle</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Climb the huge tree</option> 
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
