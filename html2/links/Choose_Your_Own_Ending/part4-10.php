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
        redirect('part4-10.1.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part1-7.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part1-8.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part1-9.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You crush up some leaves and chew them to get them wet. Then, you wipe the slimey mess on your arm. Immediately your arm starts to glow, then fade. The green tint starts to disappear. You start to feel your stomach rumble - man need food!
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Eat some leaves</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Hunt for food</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Chew grass</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Pray to the Greek gods</option> 
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
