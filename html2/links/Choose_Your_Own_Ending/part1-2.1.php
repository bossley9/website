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
    if ($_REQUEST['select1-2'] == 'A1-2'){
        redirect('part3-7.php');
    }elseif($_REQUEST['select1-2'] == 'B1-2'){
        redirect('part3-2.php');
    }elseif($_REQUEST['select1-2'] == 'C1-2'){
        redirect('part6-10.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You slide it back in the rock. "That was pointless," you think to yourself. What do you do?
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-2"> 
  <optgroup label="A">
  <option value="A1-2">Try to pull the sword out of the rock</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-2">Punch the rock until it breaks</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-2">Summon the power of the Triforce to make this sword the Master Sword of Legend</option> 
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
