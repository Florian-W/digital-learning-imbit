<?php
/**
 * Created by PhpStorm.
 * User: nick.london
 * Date: 18.02.2017
 * Time: 00:56
 */

require_once './php/SessionManager.php';
SessionManager::sessionStart('loginSession');
$sql_connection = new mysqli('localhost', 'content', 'cake@IMBIT');
$sql_connection->select_db('contentDB');

$falseLogin = false;

if(isset($_POST['submit'])){
    $result = $sql_connection->query("SELECT * FROM user WHERE email = '" . $_POST['email'] . "' AND pass=MD5('" . $_POST['pass'] . "');");
    if ($result->num_rows > 0){
        $_SESSION['usrname'] = $_POST{'email'};
        header('Location: ./admin.php');
    } else {
        $falseLogin = true;
    }
}; ?>
<!DOCTYPE html>
<html>
<head>
    <title>
        brillianIDEAS | Login
    </title>
    <script src="./js/MD5.js"></script>
    <script>
function showBanner() {
    document.getElementById('banner').setAttribute('class', 'display');
}
        
function evaluateForm( event ) {
    event.preventDefault();
    var form = document.getElementById('login');
    if (form.elements['email'].value != '' && form.elements['pass'].value != ''){
        form.elements['pass'].value = MD5(form.elements['pass'].value);
    } else {
        showBanner();
        return false;
    }
    return true;
}

    </script>
    
    <style>
        body{
            padding: 0px;
            margin: 0px;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
        }
        
        body > div {
            width: 400px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-flow: column nowrap;

        }
        body > div > div {
            display: none;
            border: 1px dotted red;
            background-color: lightcoral;
            color: black;
            padding: 10px;
            flex-grow: 1;
        }
        body > div > form {
            flex-grow: 3;
            display: flex;
            flex-flow: column nowrap;
            align-content: center;
            align-items: center;
            margin: 15px;
        }
        form > input, form > button {
            flex-grow: 1;
            margin: 5px;
            padding: 5px;
        }
        .display {
            display: block !important;
            -webkit-transition: display 1s;
            -moz-transition: display 1s;
            -ms-transition: display 1s;
            -o-transition: display 1s;
            transition: display 1s;
        }
    </style>
</head>
<body onload="<?php echo (($falseLogin)? 'showBanner();' : ''); ?>">
<div>
    <div id="banner">
        Die eingegeben Logindaten waren falsch oder das Formular nicht vollständig ausgefüllt.
    </div>
    <form id="login" action="./login.php" method="post" onSubmit="evaluateForm();">
        <input type="email" name="email" placeholder="E-Mail"/>
        <input type="password" name="pass" placeholder="Passwort"/>
        <button type="submit" name="submit" value="Login" > Login </button>
    </form>
</div>
</body>
</html>