$(document).ready(function() {
    // Getting references to the name input and raffle container, as well as the table body
    var entryName = $("#entryName");
    var entryEmail = $("#entryEmail");
    var ticket = $("#raffle");
    // Adding event listeners to the form to create a new object, and the button to delete
    // an raffle
    $("#enter-raffle").on("submit", handleEntryFormSubmit);
  
    // getEntries();

    function handleEntryFormSubmit(event) {
      event.preventDefault();
      if (!entryName.val().trim() || !entryEmail.val().trim() ) {
        return;
      }
      updateEntry({
        userName: entryName.val().trim(),
        email: entryEmail.val().trim(),
        // RaffleId: ticket.val().trim(),
        ticket: ticket.val().trim()
      });
    }
    function updateEntry(entryData) {
        $.post("/api/entries", entryData, function(data){
            console.log(data);
        });
      }
// Function for retrieving raffles and getting them ready to be rendered to the page
function getEntries() {
    $.get("/api/entries", function(data) {
        // var entriesToAdd = [];
        // for (var i = 0; i < data.length; i++) {
        //   entriesToAdd.push(data[i]);
        // }
        res.send(data);
      entryName.val("");
      entryEmail.val("");
      ticket.val("");
      console.log(entryName, entryEmail, ticket);
    });
  }
});
   