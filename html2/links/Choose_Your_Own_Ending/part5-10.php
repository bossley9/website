<html>
<head>
<title>Middle Earth</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
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
        redirect('part5-9.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part5-9.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part5-10.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part5-11.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  She only responds with, "你在说什么?" 
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Punch her</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Yell at her</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Say "What?"</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Flirt with her</option> 
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
