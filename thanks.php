<?php
include 'parts/header.php'; ?>

    <div class="row intro-detail">

        <div class="col-lg-12">

            <img class="bg" src="images/bg-1.jpg" />

            <div class="row">
                <div class="col-lg-12 col-lg-offset-0 col-xs-10 col-xs-offset-1" id="intro-detail-header">

                    <img src="images/movement-participant-media-thanks.png" />
                </div>
            </div>

            <div class="row">

                <div class="col-xs-10 col-xs-offset-1" id="intro-detail-content">

                    <h2>THANK YOU!</h2>

                    <p>

                        Thank you for joining us and like-minded people around the country in helping our world
                        become one step closer to sustainability.
                    </p>
                    <p>
                        If you’d like to learn more about what we’re doing to help drive this issue,
                        please visit <a href="http://takepart.com" target="_blank">www.takepart.com</a>
                    </p>
                    <p>

                    <ul>
                        <li>
                            <h2>SHARE ON:</h2>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?=urlencode($site_url)?>"><img src="images/btn-facebook.png" /></a>
                        </li>
                        <li>
                            <a target="_blank" href="https://twitter.com/share?url=<?=urlencode($site_url)?>&text=<?=urlencode($share_copy)?>"><img src="images/btn-twitter.png" /></a>
                        </li>
                        <li>
                            <a target="_blank" href="https://plus.google.com/share?url=<?=urlencode($site_url)?>"><img src="images/btn-google.png" /></a>
                        </li>

                    </ul>

                    </p>

                </div>

            </div>
            <div class="row">

                <div class="col-lg-12 footer">

                    <span>Powered by </span><a href="index.php"><img src="images/logo-postcard.png" /></a>
                </div>
            </div>

        </div>

    </div>

<?php
include 'parts/footer.php';