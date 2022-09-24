<html>
    <head>
        <meta http-equiv="content-type" charset="utf-8" />
        <title>PIPELINE</title>
        <style>
            body {
                font-family:verdana,georgia;
                font-size:23px;
                color:#0000FF;
                background-color:#000;
            }

            #Halo {
                position:fixed;
                display:table;
                top:0;
                width:100%;
                background-color:white;
                height:100%;
                text-align:center;
                margin:0;
                padding:0;
                overflow:hidden;
                z-index:10000;
            }

            #middle1 {
                position:relative;
                overflow:none;
                text-align:center;
                background-color:#000;
            }

            a {
                color:#FF0000;
                text-decoration:none;
            }

            a:hover {
                text-decoration:underline;
            }

            #bot1 {
                margin-left:0.5%;
                margin-bottom:0.1%;
                position:relative;
                float:left;            
                color:#FFF;
                font-size:12px;
            }

            #bot2 {
                margin-right:0.5%;
                margin-bottom:0.1%;
                position:relative;
                float:right;   
                color:#FFF;
                font-size:12px;
            }
        </style>
        <script src="jquery-1.11.2.min.js"></script>
<!--[if IE]> 
        <script type="text/javascript">
alert("Yo. You're using IE. Might wanna switch to a better browser...");
        </script>
<![end if]-->
        <script type="text/javascript">
            $(window).load(function() {
                $('#Halo').delay(8000).fadeOut("fast");
            });
        </script>
    </head>
    <body>
    <!--<div id="Halo">
        <div style="display:table-cell;vertical-align:middle;">
            <img src="Halo_1.gif" width="100%" \>
        </div>
    </div>-->
        <div id="middle1">
            <br \>
            <h1 style="color:#FFF;">Choose your subdirectory:</h1>
            [HTML BELOW]
            <p style="font-size:12px;color:#FF0000;"><span style="color:#FFF;">*</span> denotes a work not currently presentable to the general public</p>
        </div>
        <div style="position:absolute;left:50%;transform:translateX(-50%);">
            <ul>
                <li><p><a href="test">test</a></p></li>
                <li><p><a href="test2">Menu Testing</a></p></li>
                <li><p><a href="boma2">boma</a></p></li>
                <li><p><a href="sass">sass</a></p></li>
                <li><p><a href="sass3">sass[OLD]</a></p></li>
                <li><p><a href="sass2">sass</a> <span style="color:#FFF;">*</span> (Javascript testing)</p></li>
                <li><p><a href="theme_1">Theme 1</a></p></li>
                <li><p><a href="bak_2">Theme 2</a> <span style="color:#FFF;">*</span> </p></li>
                <li><p><a href="theme_2">Theme 2.5</a> <span style="color:#FFF;">*</span> </p></li>
                <li><p><a href="theme_3">Theme 3</a> <span style="color:#FFF;">*</span> </p></li>
            </ul>
        </div>
        <div style="position:fixed;bottom:0;background-color:rgba(0,0,0,0.1);width:100%;left:0;">
            <div id="bot1">
                P<span style="font-size:14px;">] [</span>PELINE v1.2 | &copy; Sam Bossley 2015
            </div>
            <div id="bot2">
                <?php echo date("D M j Y g:i:s a T"); ?>
            </div>
        </div>
    </body>
</html>
