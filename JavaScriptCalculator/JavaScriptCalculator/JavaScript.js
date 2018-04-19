var debug = true;

$("#search").on('click', function () {
    if (debug) { console.log("search function called"); }
    $("#splash").attr("style", "display:none");
    $("#post-splash").attr("style", "");
});

$("#Submit").on('click', function () {
    if (debug) { console.log("Submit function called"); }
    var searchTerm = $('#input').val();
    if (debug) { console.log("searchTerm = ", searchTerm); }
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=" + searchTerm + "&namespace=*";

    // Using jQuery
    $.ajax({
        url: url,
        async: false,
        dataType: 'json',
        type: 'GET',
        //    headers: { 'Api-User-Agent': 'Example/1.0' },
        success: function (data) {
            if (debug) { console.log("Wiki data returned = ", data); }
            // do something with data
            var table = document.getElementById("myTable");
            table.innerHTML = "";   // Blank the table before displaying
            // Insert Heading Row
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "<strong>Term</strong>";
            cell2.innerHTML = "<strong>Description</strong>";
            for (var i = 0; i < data[1].length; i++) {
                var row = table.insertRow(i + 1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = data[1][i];
                cell2.innerHTML = "<a href=" + data[3][i] + " target=_blank>" + data[2][i] + "</a";
                //cell3.innerHTML = data[3][i];
            }
        },
        error: function (errorMessage) {
            alert("Error");
        }
    });
 
});

