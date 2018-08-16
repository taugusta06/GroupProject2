$(document).ready(function() {
  /* global moment */

  // entryContainer holds all of our posts
  var entryContainer = $(".entry-container");
  var raffleCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleRaffleDelete);
  $(document).on("click", "button.edit", handleRaffleEdit);
  // Variable to hold our Raffles
  var entries;

  // The code below handles the case where we want to get entry posts for a specific raffle
  // Looks for a query param in the url for raffle_id
  var url = window.location.search;
  var raffleId;
  if (url.indexOf("?raffle_id=") !== -1) {
    raffleId = url.split("=")[1];
    getRaffles(raffleId);
  }
  // If there's no raffleId we just get all Raffles as usual
  else {
    getRaffles();
  }

  // This function grabs Raffles from the database and updates the view
  function getRaffles(raffle) {
    raffleId = raffle || "";
    if (raffleId) {
      raffleId = "/?raffle_id=" + raffleId;
    }
    $.get("/raffle" + raffleId, function(data) {
      console.log("raffles", data);
      raffles = data;
      if (!raffles || !raffles.length) {
        displayEmpty(raffle);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteRaffle(id) {
    $.ajax({
      method: "DELETE",
      url: "/raffle/" + id
    }).then(function() {
      getRaffles(raffleCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside entryContainer
  function initializeRows() {
    entryContainer.empty();
    var entriesToAdd = [];
    for (var i = 0; i < entries.length; i++) {
      entriesToAdd.push(createNewRow(entries[i]));
    }
    entryContainer.append(entriesToAdd);
  }

  // This function constructs a entry's HTML
  function createNewRow(entry) {
    var formattedDate = new Date(entry.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newEntryCard = $("<div>");
    newEntryCard.addClass("card");
    var newEntryCardHeading = $("<div>");
    newEntryCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newEntryTitle = $("<h2>");
    var newEntryDate = $("<small>");
    var newEntryRaffle = $("<h5>");
    newEntryRaffle.text("Written by: Raffle name display is in next activity when we learn joins!");
    newEntryRaffle.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newEntryCardBody = $("<div>");
    newEntryCardBody.addClass("card-body");
    var newEntryBody = $("<p>");
    newEntryTitle.text(entry.title + " ");
    newEntryBody.text(entry.body);
    newEntryDate.text(formattedDate);
    newEntryTitle.append(newEntryDate);
    newEntryCardHeading.append(deleteBtn);
    newEntryCardHeading.append(editBtn);
    newEntryCardHeading.append(newEntryTitle);
    newEntryCardHeading.append(newEntryRaffle);
    newEntryCardBody.append(newEntryBody);
    newEntryCard.append(newEntryCardHeading);
    newEntryCard.append(newEntryCardBody);
    newEntryCard.data("entry", entry);
    return newEntryCard;
  }

  // This function figures out which Entry we want to delete and then calls deleteEntry
  function handleEntryDelete() {
    var currentEntry = $(this)
      .parent()
      .parent()
      .data("entry");
    deleteEntry(currentEntry.id);
  }

  // This function figures out which Entry we want to edit and takes it to the appropriate url
  function handleEntryEdit() {
    var currentEntry = $(this)
      .parent()
      .parent()
      .data("entry");
    window.location.href = "/api/entries?entry_id=" + currentEntry.id;
  }

  // This function displays a message when there are no Entrys
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Raffle #" + id;
    }
    entryContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No entries yet" + partial + ", navigate <a href='/cms" + query + "'>here</a> in order to get started.");
    entryContainer.append(messageH2);
  }
});
