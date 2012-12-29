var TeamListViewModel = function () {
  var self = this;
  self.teams = ko.observableArray();

  //This passes a data- payload to the modal dialog's "Save" button that contains the teamId, and clears out the input.
  self.sharePrep = function (team) {
    $('#shareButton').attr('data-teamId', team.Id);
    $('#usernameInput').val('')
  }

  self.share = function (viewModel, event) {
    var teamId = $(event.srcElement).attr('data-teamId');

  }

  //This clears out the input to the dialog 
  self.newTeamPrep = function () {
    $('#newTeamInput').val('');
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