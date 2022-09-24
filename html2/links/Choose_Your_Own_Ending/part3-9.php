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
        redirect('part4-5.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part4-1.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part3-9.1.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part5-12.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You swing the sword around like a little kid, imagining bad guys all around you. You eventually get tired and try to put it down, but it is stuck to your hand. Then you remember that it was cursed. "Darn China-made products," you mutter under your breath. What do you do? 
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">keep walking and forget about it</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Rip the sword off with brute force</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Yell at China for cheap products</option>
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Go to Ali Baba's hut and ask for help</option> 
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
