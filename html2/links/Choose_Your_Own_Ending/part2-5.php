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
    if ($_REQUEST['select1-3'] == 'A1-3'){
        redirect('part2-7.php');
    }elseif($_REQUEST['select1-3'] == 'B1-3'){
        redirect('part1-3.1.php');
    }elseif($_REQUEST['select1-3'] == 'C1-3'){
        redirect('part2-9.php');
    }elseif($_REQUEST['select1-3'] == 'D1-3'){
        redirect('part1-3.2.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  Ali Baba says, "Ok... I must be hearing things again...or you're lying." He looks at you quizically, then shrugs and closes the door.
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-3"> 
  <optgroup label="A">
  <option value="A1-3">Knock on the door</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-3">Ring the imaginary doorbell</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-3">Yell "Ali Baba! Bring me a towel!"</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-3">Sit on the doorstep and pout</option> 
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
