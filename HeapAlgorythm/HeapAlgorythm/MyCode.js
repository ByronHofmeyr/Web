
function permAlone(str) {

    //create variable to store number of perms without a repeat
    var noDupes = 0;

    //split string into array
    var strArray = str.split("");

    // Call with an array of the original string
    findPerm(strArray.length, strArray);

    return noDupes;

    //Heap's Algorithm
    function findPerm(n, arr) {
        // If only 1 element, just output the array
        if (n == 1) {
            //check for duplicates
            if (!(/([a-zA-Z])\1+/).test(arr.join(""))) {
                noDupes += 1;
            }
            return;
        }

        for (var i = 0; i < n; i += 1) {
            findPerm(n - 1, arr);

            // If n is even
            if (n % 2 === 0) {
                swap(i, n - 1);
            } else {
                swap(0, n - 1);
            }
        }

        function swap(idxA, idxB) {
            var tmp = arr[idxA];
            arr[idxA] = arr[idxB];
            arr[idxB] = tmp;
        }
    }
}

//call permAlone() with any string
//permAlone("aab");

