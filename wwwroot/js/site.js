// Write your JavaScript code.
$(document).ready(function () {

    // Ensures that no null values are passed (they create a compiler error).
    function checkInputField(selectedPage, resultsPerPage) {
        let noNullLastName = "";
        let startDate = $("#startDate").val();
        let endDate = $("#endDate").val();

        if ($("#LastName").val().trim() === "") {
            // If no string is entered by the user return a string of "GetAllUsers".
            noNullLastName = "GetAllUsers";
        } else {
            noNullLastName = $("#LastName").val().trim();
        }
        FilterUsers(noNullLastName, startDate, endDate, selectedPage, resultsPerPage);
    }

    // Performs the AJAX POST call to the controller.
    function FilterUsers(LastName, startDate, endDate, selectedPage, resultsPerPage) {
        // POST function call with LastName as an arguement.
        $.post("FilterUsers/", { LastName: LastName, startDate: startDate, endDate: endDate, selectedPage: selectedPage, resultsPerPage: resultsPerPage }, function (data) {
            // Remove old values (<td> and nested <tr>) from table body.
            $("#tableBody tr").remove();
            // Populate new data (for each result from method create a new tr and td and insert into table).
            $.each(data, function (key, val) {
                let tableEntry =
                    '<tr> <td class="userId">' + val.id + '</td> <td>' + val.first_name + '</td> <td>' + val.last_name + '</td> <td>' + val.email + '</td><td>' + val.created_at + '</td></tr>';
                $("#tableBody").append(tableEntry);
            });
            // Determine the number of pages to display. response = number of pages required for the current batch of results.
            // $.post("GetNumOfPages", { numberOfUsersReturned: $("totalResults").text(), resultsPerPage: resultsPerPage }, function (response) {
            //     $(".PageNumber").remove();
            //     for (var idx = 0; idx < response; idx++) {
            //         $("#pageLinks").append('<a class="PageNumber">' + (idx + 1) + '</a>');
            //     }
            // });
        });
    }

    // The event listeners
    // Filters based on last name.
    $("#LastName").keyup(function () {
        checkInputField();
    });

    // Filters based on date range
    $("#startDate, #endDate").on("change", function () {
        checkInputField();
    })
    // Navigates to anther page of results
    $(".PageNumber").click(function () {
        // The "this.text()" argument below is the "selectedPage" valule.
        checkInputField($(this).text(), $("#resultsPerPage").val());
    });
    // Changes the amount of results displayed per page.
    $("#resultsPerPage").on("change keyup", function () {
        checkInputField(1, $(this).val());
    })

});