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
        redirect('part3-7.2.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part3-8.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part3-9.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part1-2.1.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You wipe it in the dirt. It looks shinier than ever!!!
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Wipe it off in the dirt</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Rub your hand on the blade</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Practice swordfighting</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Put it back</option> 
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
