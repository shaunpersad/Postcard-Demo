var rotate_angle = 0;
var wordwrap_len = 30;

var image_data = {};
var $bar;




function setupImage(url) {

    showUploadRow('#edit-photo', function() {

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
    });

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
        progress: function() {  },
        progressUpload: function() {},
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

function wordwrap(str, int_width, str_break, cut) {
    //  discuss at: http://phpjs.org/functions/wordwrap/
    // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // improved by: Nick Callen
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Sakimori
    //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // bugfixed by: Michael Grier
    // bugfixed by: Feras ALHAEK
    //   example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
    //   returns 1: 'Kevin |van |Zonnev|eld'
    //   example 2: wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n');
    //   returns 2: 'The quick brown fox <br />\njumped over the lazy<br />\n dog.'
    //   example 3: wordwrap('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
    //   returns 3: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod \ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim \nveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea \ncommodo consequat.'

    var m = ((arguments.length >= 2) ? arguments[1] : 75);
    var b = ((arguments.length >= 3) ? arguments[2] : '\n');
    var c = ((arguments.length >= 4) ? arguments[3] : false);

    var i, j, l, s, r;

    str += '';

    if (m < 1) {
        return str;
    }

    for (i = -1, l = (r = str.split(/\r\n|\n|\r/))
        .length; ++i < l; r[i] += s) {
        for (s = r[i], r[i] = ''; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j))
            .length ? b : '')) {
            j = c == 2 || (j = s.slice(0, m + 1)
                .match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(
                    m)
                .match(/^\S*/))[0].length;
        }
    }

    return r.join('\n');
}

function showUploadRow(row_to_show, callback) {

    $('.upload-row').hide();
    $(row_to_show).fadeIn('fast', function() {

        $('html, body').animate({
            scrollTop: 0
        }, 'fast', callback);
    });

    $('.on').removeClass('on');
    var button = row_to_show.replace('#', '#btn-');
    $(button).prop('disabled', false).addClass('on');

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
        'images/loading.gif',
        'images/btn-edit-off.png',
        'images/btn-edit-on.png',
        'images/btn-facebook.png',
        'images/btn-google.png',
        'images/btn-twitter.png',
        'images/btn-message-off.png',
        'images/btn-message-on.png',
        'images/btn-upload-off.png',
        'images/btn-upload-on.png',
        'images/btn-preview-on.png',
        'images/btn-preview-off.png',
        'images/bg-btn-custom.png'
    ];

    $.each(preload, function(index, src) {

        var $img = $('<img />');
        $img.attr('src', src);
    });

    //showModal();


    $( '#image-zoomer' ).slider({

    });

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
                                .resize(1200, 1200, 'max')
                                .get(function (err/**String*/, img/**HTMLElement*/){


                                    if (!err) {

                                        img.toBlob(
                                            function (blob) {

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
                                                        }
                                                    },
                                                    progressUpload: function(evt) {
                                                        if (evt.lengthComputable) {
                                                            var percentComplete = Math.floor(evt.loaded / evt.total * 100);
                                                            progressIndicator(null, null, null, percentComplete);                                                }
                                                        else {
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
        .on('change', '#file', function() {

            $('.filepath').html($(this).val().replace('fakepath', '...'));
            $('#checkmark').css('visibility', 'visible');
        })
        .on('keyup', 'textarea[name="message"]', function() {

            var old_val = $(this).val();

            $(this).val(wordwrap(old_val, wordwrap_len, '\n', true));
        })
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

            showUploadRow('#add-message');

        })
        .on('submit', '#add-message form', function(e) {

            e.preventDefault();

            $(this).validate();

            if ($(this).valid()) {

                var $textarea = $(this).find('textarea[name="message"]');
                var color =  $textarea.css('color').match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                var data = {
                    message: $textarea.val(),
                    font_size: parseInt($textarea.css('font-size')) * 72 / 96,
                    container_width: $('#message-image-container').width(),
                    wordwrap: wordwrap_len,
                    color: [color[1], color[2], color[3]]

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

                                showUploadRow('#preview');


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
        .on('click', '#upload-header .btn', function() {

            if (!$(this).prop('disabled')) {

                var row_to_show = $(this).attr('id').replace('btn-', '');
                showUploadRow('#' + row_to_show);

            }
        })
        /*
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
        */
    ;

});
