<?php
/**
 * User: nick.london
 * Date: 17.02.2017
 * Time: 20:25
 */

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);
error_reporting(-1);

$files = array(
    'categories_xml' => './categories.xml',
    'categories_xsl' => './selection.xsl',
    'learnings_xml' => './Learnings.xml',
    'learnings_xsl' => './Learning.xsl',
    'grid_xsl' => './Grid.xsl',
    'playlist_xsl' => 'playlist.xsl'
);

try{
    doTransformation();
} catch (Exception $e) {
    header("HTTP/1.0 400 Bad Request", 400);
}

/**
 * @throws Exception containing the HTTP error code
 */
function doTransformation(){
    if(isset($_GET['base'])){
        switch ($_GET['base']){
            case 'categories':
                prepareTransformCategorie('categories');
                break;
            case 'learning':
                prepareTransformLearning();
                break;
            case 'grid':
                prepareTransformCategorie('grid');
                break;
            default:
                throw new Exception(400);
        }
    } else {
        throw new Exception(400);
    }
}

/**
 * @throws Exception containing the HTTP error code
 */
function prepareTransformCategorie($base){
    if (isset($_GET['type'])){
        switch ($_GET['type']){
            case 'class':
                transformCategorie($base, 'class');
                break;
			case 'newcontent':
                transformCategorie($base, 'newcontent');
                break;
            case 'learning':
                if(isset($_GET['detail'])){
                    switch ($_GET['detail']){
                        case 'true':
                            transformCategorie($base,'learning', 'true');
                            break;
                        default:
                            transformCategorie($base, 'learning');
                    }
                } else {
                    transformCategorie($base, 'learning');
                }
                break;
            default:
                throw new Exception(400);
        }
    } else {
        throw new Exception(400);
    }
}

function transformCategorie($base, $type, $detail = 'false'){

    $filter = ((isset($_GET['filter'])) ? $_GET['filter'] : '');

    $params = array(
        'type' => $type,
        'detail' => $detail,
        'filter' => $filter
    );

    transformXML(
        $GLOBALS['files']['categories_xml'],
        $GLOBALS['files'][$base . '_xsl'],
        $params
    );
    //transformXML('./categories.xml', './selection.xsl', $params);
}

/**
 * @param $xmlFile String Path to XML File
 * @param $xslFile String Path to XSL File
 * @param $params ArrayObject Transformation Parameters
 */
function transformXML($xmlFile, $xslFile, $params){
    $xsl = new DOMDocument();
    $xsl->load(($xslFile));

    $xml = new DOMDocument();
    $xml->load(($xmlFile));

    $proc = new XSLTProcessor();
    $proc->importStylesheet($xsl);

    foreach ($params as $name => $value){
        $proc->setParameter('', $name, $value);
    }

    $result = $proc->transformToDoc($xml);

    echo $result->saveHTML();
}

function prepareTransformLearning(){
    $guid = '';
    if(isset($_GET['guid'])){
        $guid = $_GET['guid'];
    }
    $detail = 'false';
    if(isset($_GET['detail'])){
        $detail = $_GET['detail'];
    }
    $withLink = 'false';
    if(isset($_GET['withLink'])){
        $withLink = $_GET['withLink'];
    }
    $class = '';
    if(isset($_GET['class'])){
        $class = $_GET['class'];
    }
    $type = '';
    if(isset($_GET['type'])){
        $type = $_GET['type'];
    }
    $params = array(
        'guid' => $guid,
        'detail' => $detail,
        'class' => $class,
        'type' => $type,
        'withLink' => $withLink
    );

    transformXML(
        $GLOBALS['files']['learnings_xml'],
        $GLOBALS['files']['learnings_xsl'],
        $params
    );
}

