$(document).ready(function () {
  getAnimals();

  $('#animalSubmit').on('click', postAnimal);
});

function getAnimals() {
  $('#animalList').empty();
  $.ajax({
    type: 'GET',
    url: '/animals',
    success: function (animals) {

      //forEach function loops over each animal object
      animals.forEach(function (animal) {
        console.log(animal);

      //Setting container variable for reuse
        $container = $('<div class="container"></div>');
        $container.append("<p>Animal Type: " + animal.animal_type + "</p>",
        "<p>Animal Count: " + animal.animal_number + "</p>");

        $('#animalList').append($container);

        });
      }
    });
  }

  function postAnimal(event) {
    event.preventDefault();
    var animal = {};

    $.each($('#animalForm').serializeArray(), function (i, field) {
      animal[field.name] = field.value;
    });

  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animal,
    success: function (data) {
      getAnimals();
     },
    });
}
