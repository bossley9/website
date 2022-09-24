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
        redirect('part6-2.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part6-5.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part6-4.1.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part6-4.2.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You stay here, doing absolutely nothing for a few minutes. You are bored.
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">NOW pee on the fence</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Go inside the mansion</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Search around the fenced area</option> 
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
