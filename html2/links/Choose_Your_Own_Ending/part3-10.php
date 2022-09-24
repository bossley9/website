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
    if ($_REQUEST['select2-9'] == 'A2-9'){
        redirect('part5-7.php');
    }elseif($_REQUEST['select2-9'] == 'B2-9'){
        redirect('part5-8.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  "Splendid!" he exclaims. "Let me get my guide." He walks back in his house and fumbles around in a chest. Then he comes back and hands you a badly bound book entitled, <i>"Hitchhiker's Guide to the Galaxy"</i>. "Is this the guide you want?" 
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select2-9"> 
  <optgroup label="A">
  <option value="A2-9">Say "Yes!"</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B2-9">Say "No.....like, a guide for how to get out of the forest..."</option> 
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
