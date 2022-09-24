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
    if ($_REQUEST['select0-1'] == 'A0-1'){
        redirect('part1-1.php');
    }elseif($_REQUEST['select0-1'] == 'B0-1'){
        redirect('part1-2.php');
    }elseif($_REQUEST['select0-1'] == 'C0-1'){
        redirect('part1-3.php');
    }elseif($_REQUEST['select0-1'] == 'D0-1'){
        redirect('part1-4.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  Three paths stretch out ahead of you, one going straight ahead, another going east, and another going west. What do you choose to do?
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select0-1"> 
  <optgroup label="A">
  <option value="A0-1">Go straight North</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B0-1">Go to the East</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C0-1">Go West</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D0-1">Stay here</option> 
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
