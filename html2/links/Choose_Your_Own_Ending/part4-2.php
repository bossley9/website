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
        redirect('part5-1.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part5-2.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part5-3.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part5-4.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  You run to the nearest tunnel and dash down the cave. Suddenly it gets very hot, and you stop at a ledge leading to a huge chasm with half of a bridge intact. An old man is hanging off the bridge. You look past the bridge to a group consisting of 4 hobbits, a dwarf, an elf, and 2 men. One hobbit is shouting, "Gandalf!". The old man seems to be struggling to stay up, and he exclaims, "Fly, you fools!", and falls off the bridge. Then the others start crying and making constipated looks silently in slow-motion, while one of the men tells them to run outside. You are confused for a moment, then you are shot by a stray arrow from an Orc and fall into the chasm with the old man. You become unconscious. When you awake, you find yourself on a snowy mountain with the old man walking towards you. How romantic. Behind him is a dead beast. Monster. Thing. Whatever it is. What do you do? 
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Jump off the mountain</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Talk to him</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Yell "Get away from me, you old man!"</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Beat him up</option> 
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
