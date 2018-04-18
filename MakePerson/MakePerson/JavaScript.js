
var Person = function (firstAndLast) {
    // Complete the method below and implement the others similarly
    var array = firstAndLast.split(" ");

    this.getFirstName = function () {
        return array[0];
    };
    this.getLastName = function () {
        return array[1];
    };
    this.getFullName = function () {
        return array[0] + " " + array[1];
    };

    this.setFirstName = function (first) {
        array[0] = first;
    };

    this.setLastName = function (last) {
        array[1] = last;
    };

    this.setFullName = function (firstAndLast) {
        var splitArr = firstAndLast.split(" ");
        this.setFirstName(splitArr[0]);
        this.setLastName(splitArr[1]);
    };

};

var bob = new Person('Bob Ross');
bob.getFullName();

