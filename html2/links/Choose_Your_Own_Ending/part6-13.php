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
        redirect('part1-1.1.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part6-14.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part6-15.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part6-16.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
You jump out and grab the sword straight from his hand. "Hey!" he yells, and readies his fists.
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Run away!</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Call for help</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Drop the sword in the conveniently placed acid pool nearby</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Engage Ganondorf</option> 
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
