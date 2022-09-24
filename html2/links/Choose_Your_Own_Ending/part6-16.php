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
        redirect('part6-1.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part6-2.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part6-3.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part6-4.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You cut him off and jab the sword at his neck. "Make a move and you die," you say. Just then, Link appears on the scene. "There you are!" he exclaims. The he hits Ganondorf on the head with the end of his sword and knocks him unconcious. "Thank you, noble knight," he says to you, and gives you the sword. "The master sword is yours to keep." Once he leaves, you look around the area for anything to kill with your new sword. Instead, you find another path near the rock, leading to an electric fence with a mansion enclosed. A sign reads: <i>"WARNING: High Voltage (400 amps)"</i> and in small print: <i>"We are not responsible for your death. Also, don't pee on the fence - even though it may look cool."</i> There is a lock on the fence. What should you do?

</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Scale the fence</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Pee on the fence, disregarding the sign to look cool</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Dig under the fence(with your hands)</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Attempt to pick the lock</option> 
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
