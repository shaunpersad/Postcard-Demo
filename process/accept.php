<?php
session_start();

$root = dirname(__FILE__).'/../';

$temp_dir = $root.'temp/';
$upload_dir = $root.'uploads/';

include $root.'process/includes.php';
include $root.'classes/WideImage/WideImage.php';

$message = '';

if (!empty($_SESSION['message'])) {

    $message = $_SESSION['message'];
}

if (!empty($_POST)) {

    $width = $_POST['width'];
    $container_width = $_POST['container_width'];

    $ratio = $width / $container_width;

    $resize_width = $ratio * POSTCARD_WIDTH;

    $postcard_front = false;
    $error = false;

    try {

        $background = WideImage::load($root.BLANK_POSTCARD);
        $background = $background->resize(POSTCARD_WIDTH, POSTCARD_HEIGHT, 'fill');

        $postcard_front = WideImage::load($_SESSION['original_path']);

        $postcard_front = $postcard_front->resize($resize_width);

        if (!empty($_POST['rotation'])) {

            $degrees = $_POST['rotation'][0];

            $postcard_front = $postcard_front->rotate($degrees);

        }

        $ratio = POSTCARD_WIDTH / $container_width;

        $resize_left = $ratio * $_POST['left'];
        $resize_top = $ratio * $_POST['top'];


        $postcard_front = $background->merge($postcard_front, $resize_left, $resize_top);

        $postcard_back = $background;

        if (!empty($message)) {

            $canvas = $postcard_back->getCanvas();

            $font = $root.FONT;
            $font_size = 16;
            $font_color = $postcard_back->allocateColor(0, 0, 0);

            $canvas->useFont($font, $font_size, $font_color);

            $canvas->writeText('top + 20', 'left + 20', $message);
        }

        $postcard_front_name = uniqid('postcard_front_');
        $postcard_back_name = uniqid('postcard_back_');
        $extension = 'png';

        $prefix = time().'_'.rand().'_';

        $postcard_front_filename = $prefix.$postcard_front_name.'.'.$extension;
        $postcard_front->saveToFile($upload_dir.$postcard_front_filename);

        $postcard_back_filename = $prefix.$postcard_back_name.'.'.$extension;
        $postcard_back->saveToFile($upload_dir.$postcard_back_filename);

        $image_data = array(
            'postcard_front_filename' => $postcard_front_filename,
            'postcard_back_filename' => $postcard_back_filename,
            'error' => $error
        );

        header('Content-type: application/json');
        echo json_encode($image_data);


    } catch (\WideImage\Exception\Exception $e) {

        $error = 'Could not save image.';
    }
}