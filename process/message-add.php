<?php
session_start();

$root = dirname(__FILE__).'/../';

$temp_dir = $root.'temp/';

include $root.'process/includes.php';
include $root.'classes/WideImage/WideImage.php';

if (!empty($_POST)) {

    $img = false;
    $error = false;
    $message = '';

    if (!empty($_POST['message'])) {

        $message = $_POST['message'];
    }
    $_SESSION['message'] = $message;
    try {


        $img = WideImage::load($root.POSTCARD_BACK);

        if (!empty($message)) {

            $canvas = $img->getCanvas();

            $container_width = $_POST['container_width'];
            $font_size = $_POST['font_size'];

            $width = $img->getWidth();
            $calc_font_size = ($font_size / $container_width) * $width;
            $top = (10 / $container_width) * $width;

            $font = $root.FONT;
            //$font_size = 12;
            $font_size = $calc_font_size;
            $font_color = $img->allocateColor($_POST['color'][0], $_POST['color'][1], $_POST['color'][2]);


            $canvas->useFont($font, $font_size, $font_color);

            $canvas->writeText('top + '.$top, 'left + '.$top, $message);
        }

    } catch (\WideImage\Exception\Exception $e) {

        $error = 'Could not save image.';
    }

    $name_only = uniqid('image_');
    $extension = 'png';

    if (empty($img)) {

        $error = 'Could not save image.';
    }

    $file_name = time().'_'.rand().'_'.$name_only.'.'.strtolower($extension);

    $img->saveToFile($temp_dir.$file_name);


    $image_data = array(
        'path' => $temp_dir.$file_name,
        'filename' => $file_name,
        'error' => $error
    );

    header('Content-type: application/json');
    echo json_encode($image_data);
}
