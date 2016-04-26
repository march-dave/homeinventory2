'use strict';

$(() => {
    $('.newGrade').click(openNewTodoModal);
    $('form.newGradeForm').submit(createNewGrade);
    // $('form.newGradeForm').submit(updateGrade);

    $('table').on('click', openModel);
    $('.gradeList').on('click', '.isDelete', deleteGrade);
});

// Update
function updateGrade(e) {
  e.preventDefault();

  var id = $('#id').val();
  var make = $('#make').val();
  var model = $('#model').val();
  var serialnumber = $('#serialnumber').val();

  var homeinventory = {
    id: id,
    make: make,
    model: model,
    serialnumber: model
  }

  var url = `api/grades/${id}`;
  $.ajax({
    url: url,
    type: 'PUT',
    data: grade
  })
  .done(function(data) {

   $('.modal').modal('hide');

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
    var make = $(e.target).closest('tr').children(0)[1].textContent;
    var model = $(e.target).closest('tr').children(0)[2].textContent;
    var serialnumber = $(e.target).closest('tr').children(0)[3].textContent;

    $('#id').val(id);
    $('#make').val(make);
    $('#model').val(model);
    $('#serialnumber').val(serialnumber);
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
      make: $('#make').val(),
      model: $('#model').val(),
      serialnumber: $('#serialnumber').val(),
    }

    $.post('/api/grades', homeinventory).done(newHomeinventory => {

        var $grade = $('.template').clone();
        $grade.removeClass('template');

        $grade.find('id').text(newHomeinventory.id);
        $grade.find('.make').text(newHomeinventory.maked);
        $grade.find('.model').text(newHomeinventory.model);
        $grade.find('.serialnumber').text(newHomeinventory.serialnumber);

        // Bug: !!!!!! Not working properly!!!!!!!
        $('.gradeList').append($grade);

        $('.modal').modal('hide');
    }).fail(err => {
        console.error('ERROR', err);
    });
}

function openNewTodoModal() {
    $('.modal').modal('show');
}
