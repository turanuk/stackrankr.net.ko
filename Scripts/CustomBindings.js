ko.bindingHandlers.makeSortable = {
  init: function (element) {
    $(element).sortable({
      connectWith: '.peopleContainer',
      placeholder: 'ui-state-highlight',
      helper: 'clone',
      scroll: true,
      forcePlaceholderSize: true,
      stop: function (event, ui) {
        var ranking = $(ui.item).parents('.ranking');
        var personId = ui.item.attr('id');
        var rankingId = ranking.attr('data-rankingId');
        var sortableArray = $(ui.item).parent().sortable('toArray');
        var index = sortableArray.indexOf(personId);
        $.post('/endpoints/moveperson', { PersonId: personId, RankingId: rankingId, Index: index });
      }
    });
  }
}