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
        redirect('part4-4.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part4-2.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part4-3.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part1-5.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You lay in the stomach of the worm. It doesn't realize that you are still alive and it keeps on moving. Then it stops, as if sensing something. It retches and spits you out. You appear to be in a huge underground tunnel system. The worm quickly burrows back the way it came as if it was scared... you see some light from behind you... what makes it even worse is that your skin has faded back to its normal color... 
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Dig underground</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Run to the nearest tunnel</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Do some pushups</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Follow the worm</option> 
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
