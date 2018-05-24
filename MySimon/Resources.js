/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function () {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
    function load(urlOrArr) {
        if (urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function (url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _load(urlOrArr);
        }
    }

    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    function _load(url) {
        if (resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function () {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if (isReady()) {
                    readyCallbacks.forEach(function (func) { func(); });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }



    var circles = [];
    circles[circles.length] = Circle({ x: 369, y: 116, label: "A" });
    circles[circles.length] = Circle({ x: 231, y: 278, label: "1" });
    circles[circles.length] = Circle({ x: 133, y: 396, label: "D" });
    circles[circles.length] = Circle({ x: 234, y: 511, label: "C" });
    circles[circles.length] = Circle({ x: 351, y: 232, label: "B" });
    circles[circles.length] = Circle({ x: 348, y: 388, label: "4" });
    circles[circles.length] = Circle({ x: 164, y: 199, label: "5" });
    circles[circles.length] = Circle({ x: 522, y: 425, label: "3" });
    circles[circles.length] = Circle({ x: 229, y: 120, label: "E" });
    circles[circles.length] = Circle({ x: 493, y: 237, label: "2" });
    //
    //var canvas = document.getElementById('myCanvas');
    var context = ctx;
    //
    //circles.forEach(function (circle) { circle.draw(); });
    // --------------------
    function Circle(I) {
    I.radius = 30;
        I.draw = function () {
            context.beginPath();
            context.arc(I.x, I.y, I.radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'white';
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();
            context.font = '15pt Calibri';
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.fillText(I.label, I.x, I.y);
        };
        return I;
    }
    // ----------
    function clickIt(evt) {
        var i, xPos, yPos, saveLabel = "", xDiff, yDiff, dist, result, cX, cY;
        evt = evt || event;
        xPos = evt.offsetX || evt.pageX;
        yPos = evt.offsetY || evt.pageY;
        // check posn against centres         
        for (i = 0; i < circles.length; i++) {
            cX = circles[i].x; cY = circles[i].y;
            xDiff = Math.abs(cX - xPos);
            yDiff = Math.abs(cY - yPos);
            dist = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
            if (dist <= 30) { saveLabel = circles[i].label; }
        }
        result = (saveLabel.length > 0) ? "You hit circle " + saveLabel + "" : "Try to click on a circle";
        document.getElementById("msg").innerHTML = result;
    }
// ---------





})();
