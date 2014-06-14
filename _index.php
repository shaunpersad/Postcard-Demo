<?php
include 'parts/header.php';

//This function transforms the php.ini notation for numbers (like '2M') to an integer (2*1024*1024 in this case)
function convertPHPSizeToBytes($sSize)
{
    if ( is_numeric( $sSize) ) {
        return $sSize;
    }
    $sSuffix = substr($sSize, -1);
    $iValue = substr($sSize, 0, -1);
    switch(strtoupper($sSuffix)){
        case 'P':
            $iValue *= 1024;
        case 'T':
            $iValue *= 1024;
        case 'G':
            $iValue *= 1024;
        case 'M':
            $iValue *= 1024;
        case 'K':
            $iValue *= 1024;
            break;
    }
    return $iValue;
}

function getMaximumFileUploadSize()
{
    return min(convertPHPSizeToBytes(ini_get('post_max_size')), convertPHPSizeToBytes(ini_get('upload_max_filesize')));
}
?>

    <div id="upload-photo" class="row">

        <div class="col-lg-10 col-lg-offset-1">

            <h3>Step 1: Upload</h3>

            <div class="panel panel-default">
                <div class="panel-body">

                    <form role="form" action="process/image-upload.php" enctype="multipart/form-data" method="post">

                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" class="form-control required" id="name" placeholder="Enter name">
                        </div>

                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="text" name="email" class="form-control required email" id="email" placeholder="Enter email">
                        </div>

                        <div class="form-group">
                            <label for="file">Upload a photo</label>


                            <input name="photo" class="required" accept="image/*" type="file" id="file">
                            <p class="help-block">This will be your postcard photo. Max file size: <?=floor(getMaximumFileUploadSize()/ 1000000)?>MB</p>

                        </div>

                        <div class="row">

                            <div class="col-lg-offset-5 col-md-offset-4 col-lg-2 col-md-4">

                                <button id="upload-button" type="submit" class="btn btn-default btn-block btn-success">Upload <i class="fa fa-fw fa-check"></i></button>

                            </div>

                        </div>

                    </form>

                </div>
            </div>

        </div>


    </div>

    <div id="edit-photo" class="row hidden-first">

        <div class="col-lg-10 col-lg-offset-1">

            <h3>Step 2: Edit</h3>

            <div class="panel panel-default">
                <div class="panel-body text-center">

                    <div class="image-viewport-container">

                        <div class="image-viewport">

                            <div id="image-container">


                            </div>

                        </div>

                    </div>

                    <div class="btn-group rotate-buttons">
                        <button id="rotate-left" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="rotate counterclockwise"><i class="fa fa-fw fa-reply"></i></button>
                        <button id="rotate-right" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="rotate clockwise"><i class="fa fa-fw fa-share"></i></button>
                    </div>

                    <div id="image-zoomer" data-toggle="tooltip" data-placement="top" title="zoom"></div>

                    <div class="row">

                        <div class="col-lg-offset-5 col-md-offset-4 col-lg-2 col-md-4">
                            <form method="post" action="process/image-edit.php">
                                <button id="save-photo-button" type="submit" class="btn btn-default btn-block btn-success pull-left">Save <i class="fa fa-fw fa-check"></i></button>
                            </form>

                        </div>

                    </div>

                </div>
            </div>

        </div>

    </div>

    <div id="add-message" class="row hidden-first">

        <div class="col-lg-10 col-lg-offset-1">

            <h3>Step 3: Details</h3>

            <div class="panel panel-default">
                <div class="panel-body">

                    <form role="form" method="post" action="process/message-add.php">

                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea name="message" id="message" class="form-control required" rows="3"></textarea>
                        </div>


                        <div class="row">

                            <div class="col-lg-offset-5 col-md-offset-4 col-lg-2 col-md-4">

                                <button id="add-message-button" type="submit" class="btn btn-default btn-block btn-success">Add <i class="fa fa-fw fa-check"></i></button>

                            </div>

                        </div>

                    </form>

                </div>
            </div>

        </div>


    </div>

    <div id="preview" class="row hidden-first">

        <div class="col-lg-10 col-lg-offset-1">

            <h3>Step 4: Preview</h3>

            <div class="panel panel-default">
                <div class="panel-body">

                    <div class="image-viewport-container">

                        <div class="image-viewport">

                            <div id="preview-front">

                            </div>

                        </div>

                    </div>

                    <div class="image-viewport-container">

                        <div class="image-viewport">

                            <div id="preview-back">

                            </div>

                        </div>

                    </div>


                    <div class="row">

                        <div class="col-lg-offset-5 col-md-offset-4 col-lg-2 col-md-4">

                            <form method="post" action="process/accept.php">

                                <button id="accept-button" type="submit" class="btn btn-default btn-block btn-success">Accept <i class="fa fa-fw fa-check"></i></button>

                            </form>

                        </div>

                    </div>

                </div>
            </div>

        </div>


    </div>


    <div id="success" class="row hidden-first">

        <div class="col-lg-10 col-lg-offset-1">

            <h3>Success!</h3>

            <div class="panel panel-default">
                <div class="panel-body">

                    <div class="alert alert-success">
                        <strong>Well done!</strong> You successfully made a postcard.<br />
                        <a target="_blank" id="postcard-front" href="#">download front</a><br />
                        <a target="_blank" id="postcard-back" href="#">download back</a>
                    </div>

                </div>
            </div>

        </div>


    </div>

<?php
include 'parts/footer.php';