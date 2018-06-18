# AjaxPagination
Ajax Pagination example web site. Uses C#, ASP.NET 4 MVC, jQuery, LINQ, Bootstrap, and MySQL.

# Instructions
1) Git clone this directory
2) Run "dotnet restore"
3) Run "dotnet watch run" or "dotnet run".
4) Navigate to "localhost:5000" in your browser.

# Documentation

The current configuration (6/15/2018) displays three (3) results per page by default. This is due to my working with a very small set of test data.
If you wish to increase the default amount simply change the "ResultsPerPage" default variable in the two methods where it is used (In the HomeController Index Method and FilterUsers Method).


# Notes
The number of available pages does not update based on the number of records returned for the user's specific search filters. In order to perform that, I would need to run a COUNT on the total number of records that match the seach filters (and not just the results returned, since those are limited per page and probably do not accurately the total number of matching records) and return that number somehow to the jQuery which would then populate a new set of page links. The problem with this is that there does not appear to be a goo way to go about making that database COUNT query, nor passing that number to the jQuery method. jQuery doesn't read ViewBag (from what I can find), and the FilterUsers method returns a Json object of a List<User>. How to get that number to the jQuery? 
  
A possible solution would be to create a different method, however, that would require essentially recreating the entire original search parameters and queries, which seems ridiculous, to be frank.

There is an Entity Framework package called PagedList.Mvc that would perform this functionality without it having to be custommade.
