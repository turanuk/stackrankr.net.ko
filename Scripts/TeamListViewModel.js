var TeamListViewModel = function () {
  var self = this;
  self.teams = ko.observableArray();

  //TODO: Add progress images

  //This passes a data- payload to the modal dialog's "Save" button that contains the teamId, and clears out the input.
  self.sharePrep = function (team) {
    $('#shareButton').attr('data-teamId', team.Id);
    $('#shareMsg').html('');
    $('#usernameInput').val('');
  }

  self.share = function (viewModel, event) {
    var teamId = $(event.srcElement).attr('data-teamId');
    var username = $('#usernameInput').val();
    $('#shareProgress').show();
    $.post('/endpoints/shareteam', { TeamId: teamId, Username: username }, function () {
      $('#shareMsg').html('<span style="color: green">Shared with ' + username + '.</span>');
    }).complete(function () {
      $('#shareProgress').hide();
      $('#usernameInput').val('');
      $('#usernameInput').focus();
    }).error(function () {
      $('#shareMsg').html('<span style="color: red">Username ' + username + ' doesn\'t exist or already has access!</span>');
    });
  }

  self.renamePrep = function (team) {
    $('#renameInput').val(team.Name);
    $('#renameError').html('');
    $('#renameButton').attr('data-teamId', team.Id);
  }

  self.rename = function (viewModel, event, foo) {
    var teamId = $(event.srcElement).attr('data-teamId');
    var newTeamName = $('#renameInput').val();
    $.post('/endpoints/updateteam', { NewTeamName: newTeamName, TeamId: teamId }, function () {
      //Update local view model
      //Close dialog
    }).error(function () {
      $('#renameError').html('Error renaming team - please try again later.');
    });
  }

  //This clears out the input to the dialog 
  self.newTeamPrep = function () {
    $('#newTeamInput').val('');
    $('newTeamMsg').html('');
  }

  self.newTeam = function () {
    var newTeamName = $('#newTeamInput').val();
    $.post('/endpoints/newteam', { TeamName: newTeamName }, function (newTeamId) {
      window.location.href = '/ViewTeam/' + newTeamId;
    }).error(function () {
      $('#newTeamError').html('Error creating team - please try again later.');
    });
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