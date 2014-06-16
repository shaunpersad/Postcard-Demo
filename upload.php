<?php
include 'parts/header.php'; ?>

    <div class="row upload">

        <div class="col-lg-12">

            <img class="bg" src="images/bg-2.jpg" />

            <div class="row">
                <div class="col-lg-12 col-lg-offset-0 col-xs-10 col-xs-offset-1" id="upload-header">

                    <div class="white-line"></div>

                    <div class="row">

                        <div class="col-xs-3">
                            <button type="button" id="btn-upload-photo" class="btn on"></button>
                        </div>
                        <div class="col-xs-3">
                            <button id="btn-edit-photo" class="btn" disabled></button>
                        </div>
                        <div class="col-xs-3">
                            <button id="btn-add-message" class="btn" disabled></button>
                        </div>
                        <div class="col-xs-3">
                            <button id="btn-preview" class="btn" disabled></button>
                        </div>
                    </div>

                </div>
            </div>

            <div id="upload-photo" class="row upload-row">

                <div class="col-lg-12 col-lg-offset-0 col-xs-10 col-xs-offset-1">

                    <form autocomplete="off" class="skinny-content" role="form" action="process/image-upload.php" enctype="multipart/form-data" method="post">

                        <div class="form-group">
                            <h2>STEP 1/4: <span>UPLOAD</span></h2>
                        </div>
                        <div class="form-group">
                            <label for="name">NAME</label>
                            <input type="text" name="name" class="form-control required" id="name">
                        </div>

                        <div class="form-group">
                            <label for="email">EMAIL ADDRESS</label>
                            <input type="text" name="email" class="form-control required email" id="email">
                        </div>

                        <div class="form-group form-group-file">
                            <label for="file">UPLOAD A PHOTO</label>
                            <br />
                            <div class="file-upload btn btn-custom">
                                <span>BROWSE</span>
                                <input name="photo" class="required" accept="image/*" type="file" id="file">
                            </div>
                            <div class="filepath">
                            </div>
                            <p class="help-block">This will be your postcard photo. Max file size: 10MB <img id="checkmark" src="images/icon-check.png" /></p>

                        </div>

                        <div class="form-group form-group-button">

                            <button id="upload-button" type="submit" class="btn btn-custom">NEXT <img src="images/icon-arrow-right.png" /></button>
                        </div>


                    </form>

                </div>

            </div>


            <div id="edit-photo" class="row upload-row">

                <div class="col-lg-12 col-lg-offset-0 col-xs-10 col-xs-offset-1">

                    <form class="skinny-content" method="post">

                        <div class="form-group">
                            <h2>STEP 2/4: <span>EDIT</span></h2>
                        </div>
                        <div class="form-group">

                            <div class="image-viewport-container">

                                <div class="image-viewport">

                                    <div id="image-container">


                                    </div>

                                </div>

                            </div>
                        </div>

                        <div class="form-group">

                            <div id="image-zoomer" data-toggle="tooltip" data-placement="top" title="zoom"></div>

                        </div>

                        <div class="form-group">

                            <div class="btn-group rotate-buttons">
                                <button id="rotate-left" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="rotate counterclockwise"><img src="images/icon-rotate-counterclockwise.png" /></button>
                                <button id="rotate-right" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="rotate clockwise"><img src="images/icon-rotate-clockwise.png" /></button>
                            </div>

                        </div>

                        <div class="form-group form-group-button">
                            <button id="save-photo-button" type="submit" class="btn btn-custom">NEXT <img src="images/icon-arrow-right.png" /></button>
                        </div>


                    </form>

                </div>

            </div>

            <div id="add-message" class="row upload-row">

                <div class="col-lg-12 col-lg-offset-0 col-xs-10 col-xs-offset-1">

                    <form class="skinny-content" role="form" method="post" action="process/message-add.php">

                        <div class="form-group">
                            <h2>STEP 3/4: <span>MESSAGE</span></h2>
                        </div>

                        <div class="form-group">

                            <div class="image-viewport-container">

                                <div class="image-viewport">

                                    <div id="message-image-container">

                                        <textarea placeholder="Enter your message here." name="message" id="message" class="form-control required" rows="3"></textarea>

                                    </div>

                                </div>

                            </div>


                        </div>


                        <div class="form-group form-group-button">
                            <button id="add-message-button" type="submit" class="btn btn-custom">NEXT <img src="images/icon-arrow-right.png" /></button>
                        </div>


                    </form>


                </div>

            </div>


            <div id="preview" class="row upload-row">

                <div class="col-lg-12 col-lg-offset-0 col-xs-10 col-xs-offset-1">

                    <div class="skinny-content">
                        <h2>STEP 4/4: <span>PREVIEW</span></h2>
                    </div>
                    <div class="row">

                        <div class="col-lg-4 col-lg-offset-2 col-md-6">

                            <div class="skinny-content">
                                <div class="image-viewport-container">

                                    <div class="image-viewport">

                                        <div id="preview-front">

                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>

                        <div class="col-lg-4 col-md-6">

                            <div class="skinny-content">

                                <div class="image-viewport-container">

                                    <div class="image-viewport">

                                        <div id="preview-back">

                                        </div>

                                    </div>

                                </div>

                            </div>


                        </div>

                    </div>

                    <div class="row">

                        <!--<form method="post" action="process/accept.php">-->

                            <div class="form-group form-group-button">
                                <a id="accept-button" href="thanks.php" class="btn btn-custom">FINISH <img src="images/icon-arrow-right.png" /></a>
                            </div>

                        <!--</form>-->
                    </div>

                </div>

            </div>


        </div>

    </div>

<?php
include 'parts/footer.php';