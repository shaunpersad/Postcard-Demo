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


        $img = WideImage::load($root.BLANK_POSTCARD);
        $img = $img->resize(POSTCARD_WIDTH, POSTCARD_HEIGHT, 'fill');

        if (!empty($message)) {

            $canvas = $img->getCanvas();

            $font = $root.FONT;
            $font_size = 16;
            $font_color = $img->allocateColor(0, 0, 0);

            $canvas->useFont($font, $font_size, $font_color);

            $canvas->writeText('top + 20', 'left + 20', $message);
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
