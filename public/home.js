'use strict';

$(() => {
    renderPeople();

    $('.newGrade').click(openNewTodoModal);

    // $('form.newGradeForm').submit(createNewGrade);

    $('form.newGradeForm').submit(updateGrade);

    $('table').on('click', openModel);
    $('.gradeList').on('click', '.isDelete', deleteGrade);
});

function renderPeople() {

  $.ajax(`/api/grades`, {
      method: 'GET'
  }).done(data => {

    for (var i=0; i<data.length; i++) {

      var $grade = $('.template').clone();
      $grade.removeClass('template');
      $grade.find('.id').text(data[i].id);
      $grade.find('.descript').text(data[i].descript);
      $grade.find('.val').text(data[i].val);
      $grade.find('.categoryid').text(data[i].categoryid);
      $('.gradeList').append($grade);
    }
  }).fail(err => {
      console.error('ERROR!!!!', err);
  });
}

// Update
function updateGrade(e) {
  e.preventDefault();

  var id = $('#id').val();
  var descript = $('#descript').val();
  var val = $('#val').val();
  var categoryid = $('#categoryid').val();

  var homeinventory = {
    id: id,
    descript: descript,
    val: val,
    categoryid: categoryid
  }

  var url = `api/grades/${id}`;
  $.ajax({
    url: url,
    type: 'PUT',
    data: homeinventory
  })
  .done(function(data) {
    // update record
    $('#myModal').on('hidden.bs.modal',function() {
      location.reload(true);
    })

  })
  .fail(function (err) {
    console.log(err);
  });
}

function deleteGrade(e){

  var id = $(this).parent().parent().children()[0].textContent;
  var url = `api/grades/${id}`;
  $.ajax({
    url: url,
    type: 'DELETE'
  })
  .done(function(data) {
    $(`td:contains(${id})`).parent().remove();
  })
  .fail(function (err) {
    console.log(err);
  });
}

function openModel(e) {
    var s = $(e.target).is('input');
    if (s === true) {
      return;
    }

    $('#myModal').modal('show');
    var id = $(e.target).closest('tr').children(0)[0].textContent;
    var descript = $(e.target).closest('tr').children(0)[1].textContent;
    var val = $(e.target).closest('tr').children(0)[2].textContent;
    var categoryid = $(e.target).closest('tr').children(0)[3].textContent;

    $('#id').val(id);
    $('#descript').val(descript);
    $('#val').val(val);
    $('#categoryid').val(categoryid);
}

function changeCheckbox(e) {
    e.preventDefault();

    var id = $(e.target).closest('tr').data('id');

    $.ajax(`/api/todos/${id}/toggle`, {
        method: 'PUT'
    }).done(data => {
        $(e.target).prop('checked', data.newValue);
    }).fail(err => {
        console.error('ERROR!!!!', err);
    });
}

function createNewGrade(e) {
    e.preventDefault();

    var homeinventory = {
      id: $('#id').val(),
      descript: $('#descript').val(),
      val: $('#val').val(),
      categoryid: $('#categoryid').val(),
    }

    $.post('/api/grades', homeinventory).done(newHomeinventory => {
        newHomeinventory = newHomeinventory[0];

        var $grade = $('.template').clone();
        $grade.removeClass('template');

        $grade.find('.id').text(newHomeinventory.id);
        $grade.find('.descript').text(newHomeinventory.descript);
        $grade.find('.val').text(newHomeinventory.val);
        $grade.find('.categoryid').text(newHomeinventory.categoryid);

        $('.gradeList').append($grade);
        modalValueClear();
        $('.modal').modal('hide');
    }).fail(err => {
        console.error('ERROR', err);
    });
}

function modalValueClear() {
  // fields clear before open dlg;
  $('#id').val('');
  $('#descript').val('');
  $('#val').val('');
  $('#categoryid').val('');
}

function openNewTodoModal() {
  // modalValueClear();
  $('.modal').modal('show');
}
