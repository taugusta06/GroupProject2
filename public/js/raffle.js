$(document).ready(function() {
  // Getting references to the name input and raffle container, as well as the table body
  var nameInput = $("#raffle-name");
  var raffleList = $("tbody");
  var raffleContainer = $(".raffle-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an raffle
  $(document).on("submit", "#raffle-form", handleRaffleFormSubmit);
  $(document).on("click", ".delete-raffle", handleDeleteButtonPress);
  $("#enter-raffle").on("submit", handleEntryFormSubmit);

  // Getting the initial list of raffles
  getRaffles();

  function handleEntryFormSubmit(event) {
    event.preventDefault();
    if (!entryName.val().trim()) {
      return;
    }
    upsertEntry({
      userName: entryName.val().trim(),
      email: entryEmail.val().trim()
    });
  }

  // A function to handle what happens when the form is submitted to create a new Raffle
  function handleRaffleFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim()) {
      return;
    }
    // Calling the upsertRaffle function and passing in the value of the name input
    upsertRaffle({
      raffleName: nameInput.val().trim(),
      entryCount: 0
    });
  }

  // A function for creating an Raffle. Calls getRaffles upon completion
  function upsertRaffle(raffleData) {
    $.post("/api/raffles", raffleData, function(data) {
      console.log(data);
    });
  }

  function upsertEntry(entryData) {
    $.entry("/api/entries", entryData).then(getEntries);
  }

  // Function for creating a new list row for Raffles
  function createRaffleRow(raffleData) {
    console.log(raffleData);
    var newTr = $("<tr>");
    newTr.data("raffle", raffleData);
    newTr.append("<td>" + raffleData.name + "</td>");
    newTr.append(
      "<td># of entries will display when we learn joins in the next activity!</td>"
    );
    newTr.append(
      "<td><a href='/raffle?raffle_id=" +
        raffleData.id +
        "'>Create a Entry</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-raffle'>Delete Raffle</a></td>"
    );
    return newTr;
  }

  // Function for retrieving raffles and getting them ready to be rendered to the page
  function getRaffles() {
    $.get("/api/raffles", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createRaffleRow(data[i]));
      }
      renderRaffleList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of Raffles to the page
  function renderRaffleList(rows) {
    raffleList
      .children()
      .not(":last")
      .remove();
    raffleContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      raffleList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no raffles
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Raffle before you can add a Entry.");
    raffleContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("raffle");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/raffles/" + id
    }).then(getRaffle);
  }
});
