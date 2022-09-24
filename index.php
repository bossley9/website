<html>
<head>
  <title>404 Not Found</title>
  <style>
    body {
      background-color:#FFFFFF;
      font-size: 15;
      font-family:Times New Roman; 
    }
    .good {
      background-color: #FBFBFB;
      border: 1px solid #AAA;
      border-collapse: collapse;
      border-bottom: 1px solid #888;
      border-radius: 3px;
      box-shadow: 0px 2px 2px #AAA;
      color: black;
      height:10%;
      width:90%
    }
    .bad {
      height:120%;
      width:100%;
    }
    .what {
    font-size:15;
    }
    .oh {
      background-color:#E6E6E6;
    }
  </style>
</head>
<body>
  <script>
    function Redirect() {
      window.location="html2/stealth.html";
    }
  </script>
  <h2>404 ERROR - NOT FOUND</h2>
<i>
  <?php
    echo "The requested URL "; 
    //echo getenv ("REQUEST_URI");
    echo "/gullible";
    echo " was not found on this server.";
  ?>
</i>
  <br>
<hr></hr>
  <?php
    echo date("D M j Y g:i:s a T");
  ?>
<table class="bad">
<tr><td></td></tr>
</table>
<div class="oh">
<br>
<center><table class="good">
  <tr><td>
  <font class="what">
  Did you really believe that? Didn't you notice that the page was a bit longer than it should have been? *sigh* ...you're so gullible. 
  <br>
  Well....I mean....at least you actually found this...alright, fine. I'll take you to the page.  >> 
  <button onclick="Redirect()"> XD </button>
  <<
  </font>
  </td></tr>
</table></center>
<br>
</div>
</body>
</html>
