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
        redirect('part6-9.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part6-5.2.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part6-7.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part6-5.1.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  It says:
<center><i><u>Team Rocket Grunt</u></i></center>
<center><i>Team Rocket Grunts are found in many places and are enemies of the player. Team Rocket Grunts usually have no brains and are very annoying to fight when you really don't have to fight them. They get in the way and usually have weak pokemon."</i></center>
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Throw out a Pokemon that you don't have</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Pull out your Pokedex</option>
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Bag</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">Run</option> 
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
