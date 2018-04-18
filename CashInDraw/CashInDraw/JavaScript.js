// Define cashInDraw object
var cashInDraw = {
    "COINS": {
        "PENNY": 0,
        "NICKEL": 0,
        "DIME": 0,
        "QUARTER": 0,
        "ONE": 0,
        "FIVE": 0,
        "TEN": 0,
        "TWENTY": 0,
        "ONE HUNDRED": 0,
    },

    cents: function (coin) {  // value of coins
        var numCents = 0;
        switch (coin) {
            case "PENNY":
                numCents = 1;
                break;
            case "NICKEL":
                numCents = 5;
                break;
            case "DIME":
                numCents = 10;
                break;
            case "QUARTER":
                numCents = 25;
                break;
            case "ONE":
                numCents = 100;
                break;
            case "FIVE":
                numCents = 500;
                break;
            case "TEN":
                numCents = 1000;
                break;
            case "TWENTY":
                numCents = 2000;
                break;
            case "ONE HUNDRED":
                numCents = 10000;
                break;
        }
        //console.log("coin.value = ", this.COINS[coin]);
        //return (numCents /100).toFixed(2);
        return (numCents);
    },

    sumCash: function () {    // Sum of cash in the draw
        var sum = 0;
        var result = Object.values(this.COINS).reduce(function (accumulator, current) {
            if (!isNaN(parseFloat(current))) {
                sum += parseFloat(current);
            }
            return accumulator;
        }, []);
        //console.log("sum = ", sum);
        return sum.toFixed(2);
        //console.log("result = ", result);
    },


    retChange: function (money) {    // Return sorted array of change
        //console.log("retChange = ", money);
        changeCents = money * 100;
        //console.log("changeCents = ", changeCents);
        var resultWhole;
        //console.log("this = ", this);
        var coinOrder = ["ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE", "QUARTER", "DIME", "NICKEL", "PENNY"];
        var result = coinOrder.reduce(function (accumulator, current) {
            //console.log("current = ", current);
            //if ( whole number devides into change  && I have that cash ) {
            resultWhole = parseInt(changeCents / cashInDraw.cents(current));
            //console.log("resultWhole = ", resultWhole);
            availCashCents = (cashInDraw.COINS[current] * 100);
            //console.log("availCashCents = ", availCashCents);
            if (resultWhole > 0) {
                if (availCashCents > (resultWhole * cashInDraw.cents(current))) {
                    //console.log("cashInDraw.cents(current) = ", cashInDraw.cents(current));
                    accumulator.push([current, resultWhole * cashInDraw.cents(current) / 100]);
                    //console.log("accumulator = ", accumulator);
                    changeCents = changeCents - (resultWhole * cashInDraw.cents(current));
                    //console.log("changeCents = ", changeCents);
                }
                else {
                    //console.log("cashInDraw.cents(current) = ", cashInDraw.cents(current));
                    accumulator.push([current, availCashCents / 100]);
                    //console.log("accumulator = ", accumulator);
                    changeCents = changeCents - (availCashCents);
                    //console.log("changeCents = ", changeCents);

                }
            }

            return accumulator;
        }, []);
        if (changeCents > 0) {
            return "Insufficient Funds";
        }
        else {
            return result;
        }
    }
};

function checkCashRegister(price, cash, cid) {
    var change;
    var reply;
    // Here is your change, ma'am.
    // Create object holding cid (Cash In Draw)
    //console.log("cid = ", cid);
    for (var item = 0; item < cid.length; item++) {
        cashInDraw.COINS[cid[item][0]] = cid[item][1];
    }
    change = cash.toFixed(2) - price.toFixed(2);
    //console.log("change = ", change);
    var drawCash = cashInDraw.sumCash();
    if (change > drawCash) {
        reply = "Insufficient Funds";
        //console.log("reply = ", reply);
        return reply;
    }
    else {
        if (change == drawCash) {
            reply = "Closed";
            //console.log("reply = ", reply);
            return reply;
        }
    }
    var changeStr = cashInDraw.retChange(change);
    //console.log("change = ", change);
    //console.log("changeStr = ", changeStr);
    return changeStr;

}

//var cashInDraw = cashInDrawObj;

checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);

var coin = "NICKEL";
console.log("coin = ", coin);
console.log("cents = ", cashInDraw.cents(coin));
console.log("sumCash = ", cashInDraw.sumCash());

