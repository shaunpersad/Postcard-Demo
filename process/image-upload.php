<?php
session_start();

$root = dirname(__FILE__).'/../';

$temp_dir = $root.'temp/';

include $root.'process/includes.php';
include $root.'classes/WideImage/WideImage.php';

if (!empty($_POST)) {

    $img = false;
    $error = false;

    try {

        $img = WideImage::load('photo');

    } catch (\WideImage\Exception\Exception $e) {

        $error = 'Could not upload image.';
    }

    $name_only = uniqid('image_');
    $extension = 'png';

    if (empty($img)) {

        $error = 'Could not upload image.';
    }

    $file_name = time().'_'.rand().'_'.$name_only.'.'.strtolower($extension);

    $original_path = $temp_dir.$file_name;

    $img->saveToFile($original_path);

    $_SESSION['original_path'] = $original_path;


    $image_data = array(
        'path' => $original_path,
        'filename' => $file_name,
        'error' => $error
    );

    header('Content-type: application/json');
    echo json_encode($image_data);
}
