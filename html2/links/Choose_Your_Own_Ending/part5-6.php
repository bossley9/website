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
        redirect('part5-10.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part5-9.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part5-10.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You stop digging. Now you're in China, you don't speak Chinese, and you have no idea what to do. A lady comes up to you and says, "你是誰?"
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Yell at her</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Say "I don't speak Chinese."</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Run away</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Say "Hello?"</option> 
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
