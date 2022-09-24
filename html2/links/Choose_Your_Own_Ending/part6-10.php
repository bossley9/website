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
        redirect('part6-11.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part6-12.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part6-13.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part1-2.2.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You summon the power of the Triforce to make this the Master Sword, and immediately the sword starts to glow. However, Ganondorf jumps from the clearing to grab the sword before you can even react. "Now I finally have the sword of legend!" he says. "Then I will slay Zelda and Link, and I shall control the Triforce!!!"
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Tell him he's an idiot</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Step on his toe</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Grab the sword from him</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Tell him to look at the tag</option> 
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
