function isEven(n) {
    return n % 2 == 0;
}


function permAlone(str) {
    // first build an array of all combinations.
    // How to build the array
    // str abc will return abc, bac, bca, acb, cab, acb.
    // then count permutations with no consecutive repeats.

    console.log("str = ", str);
    var strArray = str.split('');
    console.log("strArray = ", strArray);
    var c = [];
    var n = str.length;
    console.log("str.length = ", n);
    for (i = 0; i < n; i++) {
        console.log("i = ", i);
        c.push(0);
    }

    console.log("c = ", c);
    var output = [];
    var temp;
    i = 0;
    while (i < n) {
        //console.log("i = ", i);
        //console.log("c[i] = ", (c[i]));
        if ((c[i]) < i) {
            if (isEven(i)) {
                console.log("Is Even ");
                //swap(A[0], A[i])
                temp = strArray[0];
                strArray[0] = strArray[i];
                strArray[i] = temp;
                console.log("strArray = ", strArray);
            }
            else {
                //swap(A[c[i]], A[i])
                console.log("Is Odd ");
                temp = strArray[(c[i])];
                strArray[(c[i])] = strArray[i];
                strArray[i] = temp;
                console.log("strArray = ", strArray);
            }
            console.log("Push string");
            console.log("strArray = ", strArray);
            output.push(strArray);
            c[i] += (c[i]) + 1;
            i = 0;
        }
        else {
            c[i] = 0;
            i++;
        }
    }
    console.log("output = ", output);
    console.log("str = ", str);
    return str;
}

permAlone('aab');
