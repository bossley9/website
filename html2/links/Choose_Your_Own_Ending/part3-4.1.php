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
        redirect('part4-10.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part3-4.1.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part4-11.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You carefully grab some slime and slop it into your wound. Great, now it's poisoned AND infected. What do you do?
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Use tree leaves and wipe them on your arm</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">wipe the worm's oozing slime on your arm</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Jump in the glowing pool of water</option> 
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
