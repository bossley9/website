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
        redirect('part5-2.1.php');
    }elseif($_REQUEST['select1-1'] == 'B1-1'){
        redirect('part5-2.2.php');
    }elseif($_REQUEST['select1-1'] == 'C1-1'){
        redirect('part5-2.3.php');
    }elseif($_REQUEST['select1-1'] == 'D1-1'){
        redirect('part5-5.php');
    }
 ?>
<br><br><br><br><br>
<center><table style="height:50%;width:50%;">
<tr><td><center>
  "Through fire and water. From the lowest dungeon to the highest peak, I fought with the Balrog of Morgoth. Until at last, I threw down my enemy and smote his ruin upon the mountainside. Darkness took me. And I strayed out of thought and time. Stars wheeled overhead and everyday was as long as a life-age of the earth. But it was not the end. I felt life in me again. I've been sent back until my task is done."
</center></td></tr>

<tr><td><center>
  <form> 
  <select name="select1-1"> 
  <optgroup label="A">
  <option value="A1-1">Say "What is your name? Is it not Gandalf?"</option> 
  </optgroup>
  <optgroup label="B">
  <option value="B1-1">Say "Why are you even here? Who were those people?"</option> 
  </optgroup>
  <optgroup label="C">
  <option value="C1-1">Say "Are you totally ripped under that white cloak?"</option> 
  </optgroup>
  <optgroup label="D">
  <option value="D1-1">say "Can I accompany you?"</option> 
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
