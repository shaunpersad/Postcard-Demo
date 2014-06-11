<?php
$width = $_POST['width'];
$height = $_POST['height'];
$top = $_POST['top'];
$left = $_POST['left'];
$container_width = $_POST['container_width'];
$container_height = $_POST['container_height'];
$degrees = 0;

if (!empty($_POST['rotation']) && is_array($_POST['rotation'])) {

    $degrees = intval($_POST['rotation'][0]);

    if ($degrees < 0) {

        $degrees+=360;
    }

}

echo "degrees: $degrees<br />";
echo "top: $top<br />";
echo "left: $left<br />";

/*
 * x' = x cos f - y sin f
 * y' = y cos f + x sin f
 */
/*
 * x' = x cos f - y sin f
 * y' = y cos f + x sin f
 */

$half_height = $height / 2;
$half_width = $width / 2;


$x = -$half_width;
$y = $half_height;

if ($degrees == 90 || $degrees == 270) {

    $x = -$half_height - $x;
    $y = $half_width - $y;

}
echo "new x: $x<br />";
echo "new y: $y<br />";

$left = $x + $left;
$top = $y + $top;

echo "new top: $top<br />";
echo "new left: $left<br />";


