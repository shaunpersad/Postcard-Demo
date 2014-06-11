var rotate_angle = 0;

var image_data = {};
var $bar;




function setupImage(url) {

    $('#edit-photo').fadeIn('fast');
    $('html, body').animate({
        scrollTop: $("#edit-photo").offset().top
    }, 'fast');

    var $image = $('<img id="image" />');
    $image.load(function() {

        $('#image-container').html($image).css('background', 'none');

        var image_width = $image.width();

        $image.draggable({
            cursor: 'move'
        });

        $( '#image-zoomer' ).slider({
            value:image_width,//500 is slider's width,
            min: 0,
            max:image_width,
            slide: function( event, ui ) {
                $image.width(ui.value);
            },
            change: function( event, ui ) {
                $image.width(ui.value);
            }
        });
        $('#image-zoomer').slider('value', $('#image-container').width());

    });
    $image.attr('src', url);


}

function showModal() {

    var percentVal = '0%';
    $bar.attr('aria-valuenow', 0);
    $bar.width(percentVal);
    $bar.find('span').html(percentVal);

    $.fancybox.open(
        {
            //content: '<div style="width: 100%; height: 100%"></div> ',
            href: '#popup',
            minWidth: 200,
            modal: true,
            afterShow: function() {
                //$.fancybox.showLoading();
            },
            openEffect: 'fade',
            closeEffect: 'fade',
            autoSize: true,
            autoResize: true,
            autoCenter: true,
            padding: 0,
            margin: 0
        }
    );
}

function hideModal() {

    var percentVal = '100%';
    $bar.attr('aria-valuenow', 100);
    $bar.width(percentVal);
    $bar.find('span').html(percentVal);

    $.fancybox.close();
}

function showError(one, two, three) {

    alert(three);
}

function progressIndicator(event, position, total, percentComplete) {

    var percentVal = percentComplete + '%';
    $bar.attr('aria-valuenow', percentComplete);
    $bar.width(percentVal);
    $bar.find('span').html(percentVal);
}

(function addXhrProgressEvent($) {
    var originalXhr = $.ajaxSettings.xhr;
    $.ajaxSetup({
        progress: function() { console.log("standard progress callback"); },
        progressUpload: function() { console.log("standard upload progress callback"); },
        xhr: function() {
            var req = originalXhr(), that = this;
            if (req.upload) {
                if (typeof req.upload.addEventListener == "function") {
                    req.upload.addEventListener("progress", function(evt) {
                        that.progressUpload(evt);
                    },false);
                }
            }
            return req;
        }
    });
})(jQuery);

/**
 * Creates and returns a blob from a data URL (either base64 encoded or not).
 *
 * @param {string} dataURL The data URL to convert.
 * @return {Blob} A blob representing the array buffer data.
 */
function dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}

$(document).ready(function(e) {

    $bar = $('.progress-bar');

    var preload = [
        'js/fancybox/blank.gif',
        'js/fancybox/fancybox_loading.gif',
        'js/fancybox/fancybox_loading@2x.gif',
        'js/fancybox/fancybox_overlay.png',
        'js/fancybox/fancybox_sprite.png',
        'js/fancybox/fancybox_sprite@2x.png',
        'images/loading.gif'
    ];

    $.each(preload, function(index, src) {

        var $img = $('<img />');
        $img.attr('src', src);
    });

    //showModal();


    if (FileAPI.support.html5 && FileAPI.support.dataURI) {

        $(document)
            .on('submit', '#upload-photo form', function(e) {

                e.preventDefault();

                $(this).validate();

                if ($(this).valid()) {

                    var url = $(this).attr('action');
                    var method = $(this).attr('method');

                    var files = FileAPI.getFiles($('#file'));

                    // Filter the List
                    FileAPI.filterFiles(
                        files,
                        function (file/**Object*/, info/**Object*/){

                            return /^image/.test(file.type);

                        },
                        function (list/**Array*/, other/**Array*/){
                        if( list.length ){

                            var image_file = list[0];




                            // Resize image on by max side.
                            FileAPI.Image(image_file)
                                .resize(1600, 1600, 'max')
                                .get(function (err/**String*/, img/**HTMLElement*/){


                                    if (!err) {

                                        img.toBlob(
                                            function (blob) {

                                                console.log(blob);
                                                var data = new FormData();

                                                data.append('name', $('input[name="name"]').val());
                                                data.append('email', $('input[name="email"]').val());
                                                data.append('photo', blob);


                                                $.ajax({
                                                    processData: false,
                                                    contentType: false,
                                                    progress: function(evt) {
                                                        if (evt.lengthComputable) {
                                                            var percentComplete = Math.floor(evt.loaded / evt.total * 100);
                                                            progressIndicator(null, null, null, percentComplete);                                                }
                                                        else {
                                                            console.log("Length not computable.");
                                                        }
                                                    },
                                                    progressUpload: function(evt) {
                                                        if (evt.lengthComputable) {
                                                            var percentComplete = Math.floor(evt.loaded / evt.total * 100);
                                                            progressIndicator(null, null, null, percentComplete);                                                }
                                                        else {
                                                            console.log("Length not computable.");
                                                        }
                                                    },
                                                    type: method,
                                                    url: url,
                                                    data: data,
                                                    error: showError,
                                                    beforeSend: showModal,
                                                    complete: hideModal,
                                                    success: function(response){

                                                        if (response) {

                                                            if (response.error) {

                                                                alert(response.error);
                                                            } else {

                                                                setupImage('temp/'+response.filename);
                                                            }

                                                        }
                                                    }
                                                });

                                            }
                                        );




                                    } else {

                                        alert(err);
                                    }

                                })
                            ;

                        } else {

                            alert('This file type is not accepted.');
                        }
                    });

                }
            })



    } else {

        $(document)
            .on('submit', '#upload-photo form', function(e) {

                e.preventDefault();

                $(this).validate();

                if ($(this).valid()) {

                    $(this).ajaxSubmit({
                        dataType: 'json',
                        beforeSubmit: showModal,
                        complete: hideModal,
                        error: showError,
                        uploadProgress: progressIndicator,
                        success: function(response, statusText, xhr, $form) {

                            if (response) {

                                if (response.error) {

                                    alert(response.error);
                                } else {

                                    setupImage('temp/'+response.filename);
                                }

                            }
                        }
                    });
                }

            })

    }

    $(document)
        .on('click', '#rotate-left', function() {

            $("#image").rotate({angle: rotate_angle-=90});
        })
        .on('click', '#rotate-right', function() {

            $("#image").rotate({angle: rotate_angle+=90});
        })

        .on('submit', '#edit-photo form', function(e) {

            e.preventDefault();

            var $image = $('#image');
            image_data = {

                width: $image.width(),
                height: $image.height(),
                top: $image.position().top,
                left: $image.position().left,
                rotation: $image.getRotateAngle(),
                container_width: $('#image-container').width(),
                container_height: $('#image-container').height()
            };

            var $edited_image = $('<img id="edited-image" />');
            $edited_image.load(function() {

                $('#preview-front').html($edited_image);
            });

            $edited_image.width(image_data.width);
            $edited_image.rotate({angle: image_data.rotation[0]});

            $edited_image.css('top', $image.css('top'));
            $edited_image.css('left', $image.css('left'));
            $edited_image.attr('src', $image.attr('src'));

            $('#add-message').fadeIn('fast', function() {

            });
            $('html, body').animate({
                scrollTop: $("#add-message").offset().top
            }, 'fast');


        })
        .on('submit', '#add-message form', function(e) {

            e.preventDefault();

            $(this).validate();

            if ($(this).valid()) {

                var data = {
                    message: $(this).find('textarea[name="message"]').val()
                };


                $(this).ajaxSubmit({
                    data: data,
                    dataType: 'json',
                    beforeSubmit: showModal,
                    complete: hideModal,
                    error: showError,
                    uploadProgress: progressIndicator(),
                    success: function(response, statusText, xhr, $form) {

                        if (response) {

                            if (response.error) {

                                alert(response.error);
                            } else {

                                $('#preview').fadeIn('fast', function() {

                                });
                                $('html, body').animate({
                                    scrollTop: $("#preview").offset().top
                                }, 'fast');

                                var $message_image = $('<img id="message-image" />');
                                $message_image.load(function() {

                                    $('#preview-back').html($message_image);
                                });
                                $message_image.attr('src', 'temp/'+response.filename);

                            }

                        }
                    }
                });
            }

        })
        .on('submit', '#preview form', function(e) {

            e.preventDefault();

            $(this).ajaxSubmit({
                data: image_data,
                dataType: 'json',
                beforeSubmit: showModal,
                complete: hideModal,
                error: showError,
                uploadProgress: progressIndicator,
                success: function(response, statusText, xhr, $form) {

                    if (response) {

                        if (response.error) {

                            alert(response.error);
                        } else {

                            $('#success').fadeIn('fast');
                            $('html, body').animate({
                                scrollTop: $("#success").offset().top
                            }, 'fast');

                            $('#postcard-front').attr('href','uploads/' + response.postcard_front_filename);
                            $('#postcard-back').attr('href','uploads/' + response.postcard_back_filename);

                        }

                    }
                }
            });

        })
    ;


});
