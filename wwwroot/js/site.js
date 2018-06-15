// Write your JavaScript code.
$(document).ready(function () {

    // Ensures that no null values are passed (they create a compiler error).
    function checkInputField(selectedPage) {
        let noNullLastName = "";
        let startDate = $("#startDate").val();
        let endDate = $("#endDate").val();
        
        if ($("#LastName").val().trim() === "") {
            // If no string is entered by the user return a string of "GetAllUsers".
            noNullLastName = "GetAllUsers";
        } else {
            noNullLastName = $("#LastName").val().trim();
        }
        FilterUsers(noNullLastName, startDate, endDate, selectedPage);
    }

    // Performs the AJAX POST call to the controller.
    function FilterUsers(LastName, startDate, endDate, selectedPage) {
        // POST function call with LastName as an arguement.
        $.post("FilterUsers/", { LastName: LastName, startDate: startDate, endDate: endDate, selectedPage: selectedPage }, function (data) {
            // Remove old values (<td> and nested <tr>) from table body.
            $("#tableBody tr").remove();
            // Populate new data (for each result from method create a new tr and td and insert into table).
            $.each(data, function (key, val) {
                let tableEntry =
                    '<tr> <td>' + val.id + '</td> <td>' + val.first_name + '</td> <td>' + val.last_name + '</td> <td>' + val.email + '</td><td>' + val.created_at + '</td></tr>';
                $("#tableBody").append(tableEntry);

            });
        });
    }

    // The event listeners
    $("#LastName").keyup(function () {
        checkInputField();
    });
    $("#startDate, #endDate").on("change", function () {
        checkInputField();
    })
    $(".PageNumber").click(function(){
        console.log($(this).text());
        checkInputField($(this).text());
    });

});