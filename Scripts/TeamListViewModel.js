var TeamListViewModel = function () {
  var self = this;
  self.teams = ko.observableArray([{ "Id": 25, "Name": "Foo"}]);

  //This passes a data- payload to the modal dialog's "Save" button that contains the teamId.
  self.sharePrep = function (team) {
    $('#shareButton').attr('data-teamId', team.Id);
  }

  self.share = function (viewModel, event) {
    var teamId = $(event.srcElement).attr('data-teamId');

  }

  self.newTeam = function () {
    alert('newTeam');
  }

  self.settings = function (team) {
    alert('settings');
  }

  $.getJSON('/endpoints/getteamlist', function (teams) {
    self.teams(teams);
  })
}

$(function () {
  ko.applyBindings(new TeamListViewModel());
});