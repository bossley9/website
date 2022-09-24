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
    if ($_REQUEST['select2-1'] == 'A2-1'){
        redirect('part3-1.php');
    }elseif($_REQUEST['select2-1'] == 'B2-1'){
        redirect('part3-4.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You carefully approach the fruit and bring it to your mouth. The sweet juice fills your mouth as you swallow it whole. Strength starts to surge through your entire body. Suddenly, the ground shakes, and a huge worm-like creature bursts out of the ground, looking at its prey - you. You have absolutely no way to defend yourself, and before you can think or react, its gaping mouth pummels you, swallowing you whole. Immediately your skin starts to glow. As a result, you are unharmed by the stomach acid. What do you do?
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select2-1"> 
  <optgroup label="A">
  <option value="A2-1">Sit tight in the worm's stomach</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B2-1">Burst out of the worm's stomach using your strength</option> 
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
