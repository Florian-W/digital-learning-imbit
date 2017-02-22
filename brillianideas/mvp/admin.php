<?php
/**
 * Created by PhpStorm.
 * User: nick.london
 * Date: 18.02.2017
 * Time: 00:55
 */
require_once './php/SessionManager.php';
SessionManager::sessionStart('loginSession');
if (!isset($_SESSION['usrname'])) {
    header('Location: ./login.php');
}

if (isset($_POST['submit_new'])) {
    $end = end($_POST);
    $targetDOM = new DOMDocument();
    $targetDOM->formatOutput = true;
    $targetDOM->preserveWhiteSpace = true;
    $targetDOM->validateOnParse = false;
    $targetDOM->strictErrorChecking = true;
    $targetDOM->recover = true;
    $targetDOM->load('./xml/Learnings.xml');
    $targetNode = $targetDOM->firstChild->appendChild($targetDOM->createElement('Learning'));
    foreach ($_POST as $key => $value)
        if ($value != $end)
            $targetNode->appendChild($targetDOM->createElement($key, $value));
    $targetDOM->save('./xml/Learnings.xml');


}

$categories = new DOMDocument();
$categories->load('./xml/categories.xml');
$XPath = new DOMXPath($categories);
$result = ($XPath->query('/Categories/LearningType/Abbr'));

$types = array();

for ($i = 0; $i < $result->length; $i++) {
    $types[$result->item($i)->nodeValue] = $result->item($i)->parentNode->getElementsByTagName('Medium')->item(0)->nodeValue;
};

$XPath = new DOMXPath($categories);
$result = ($XPath->query('/Categories/Classes/Number'));

$classes = array();


for ($i = 0; $i < $result->length; $i++) {
    $classes[$result->item($i)->nodeValue] = $result->item($i)->parentNode->getElementsByTagName('Name')->item(0)->nodeValue;
};

if ($classes->length == 0 || $types->length == 0)
    header('HTTP/1.0 500 Not Found', 500);
?>
<!DOCTYPE html>
<html>
<head>
    <title>
        brillianIDEAS | Admin Interface
    </title>
</head>
<body>
<form method="POST" name="addNew" action="admin.php">
    <h1>Add new Item to Learning</h1>
    <table>
        <tr>
            <td>GUID</td>
            <td><input name="GUID" minlength="36" maxlength="36" type="text"/></td>
        </tr>
        <tr>
            <td>Titel</td>
            <td><input name="Titel" type="text"/></td>
        </tr>
        <tr>
            <td>Description</td>
            <td><input name="Description" type="text"/></td>
        </tr>
        <tr>
            <td>Type</td>
            <td><select name="Type">
                    <?php
                    foreach ($types as $abbr => $name) {
                        ?>
                        <option value="<?php echo $abbr; ?>"><?php echo $name; ?></option>
                        <?php
                    };
                    ?>
                </select></td>
        </tr>
        <tr>
            <td>Embedded</td>
            <td><input name="Embedded" type="checkbox"/></td>
        </tr>
        <tr>
            <td>src</td>
            <td><input name="src" type="url"/></td>
        </tr>
        <tr>
            <td>Youtube_ID</td>
            <td><input name="Youtube_ID" type="text"/></td>
        </tr>
        <tr>
            <td>IOS_ID</td>
            <td><input name="IOS_ID" type="text"/></td>
        </tr>
        <tr>
            <td>Android_ID</td>
            <td><input name="Android_ID" type="text"/></td>
        </tr>
        <tr>
            <td>Free_of_charge</td>
            <td><input name="Free_of_charge" type="checkbox"/></td>
        </tr>
        <tr>
            <td>Fixed_StartDate</td>
            <td><input name="Fixed_StartDate" type="checkbox"/></td>
        </tr>
        <tr>
            <td>Certificate</td>
            <td><input name="Certificate" type="checkbox"/></td>
        </tr>
        <tr>
            <td>Certificate_Costs</td>
            <td><input name="Certificate_Costs" type="text"/></td>
        </tr>
        <tr>
            <td>Prestigious</td>
            <td><input name="Prestigious" type="checkbox"/></td>
        </tr>
        <tr>
            <td>Duration</td>
            <td><input name="Duration" type="text"/></td>
        </tr>
        <tr>
            <td>Author</td>
            <td><input name="Author" type="text"/></td>
        </tr>
        <tr>
            <td>Copyright</td>
            <td><input name="Copyright" type="text"/></td>
        </tr>
        <tr>
            <td>Last_Modified</td>
            <td><input name="Last_Modified" type="date"/></td>
        </tr>
        <tr>
            <td>Thumb</td>
            <td><input name="Thumb" type="url"/></td>
        </tr>
        <tr>
            <td>Area</td>
            <td><select name="Area">
                    <option value="International Management">International Management</option>
                    <option value="Business">Business</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Sprachen">Sprachen</option>
                </select></td>
        </tr>
        <tr>
            <td>Number</td>
            <td><select name="Number">
                    <?php
                    foreach ($classes as $abbr => $name) {
                        ?>
                        <option value="<?php echo $abbr; ?>"><?php echo $name; ?></option>
                        <?php
                    };
                    ?>
                </select></td>
        </tr>
        <tr>
            <td>Learning_Unit</td>
            <td><input name="Learning_Unit" type="text"/></td>
        </tr>
        <tr>
            <td>Abdeckungsgrad</td>
            <td><input name="Abdeckungsgrad" type="number"/></td>
        </tr>
        <tr>
            <td>Language</td>
            <td><input name="Language" type="text" minlength="3" maxlength="3"/></td>
        </tr>
        <tr>
            <td>Tech_Requirements</td>
            <td><input name="Tech_Requirements" type="text"/></td>
        </tr>
        <tr>
            <td>Semester</td>
            <td><input name="Semester" type="number"/></td>
        </tr>
        <tr>
            <td>Recommended</td>
            <td><input name="Recommended" type="checkbox"/></td>
        </tr>
        <tr>
            <td></td>
            <td>
                <button type="submit" name="submit_new" value="erstellen">Abschicken</button>
            </td>
        </tr>
    </table>
</form>
</body>
</html>
