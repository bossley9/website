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
        redirect('part2-3.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part2-4.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You wake up in the middle of a clearing in a huge overgrown forest. Three paths stretch out ahead of you, one going straight ahead, another going east, and another going west. You have no idea how you got here, and the only thing you can do is move on. What do you choose to do?
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Go straight North</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Go to the East</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Go West</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Stay here</option> 
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
