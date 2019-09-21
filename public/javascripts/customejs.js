$(document).ready(function(){
    $('.editEvent').on('click', editEvent);

});

function editEvent(){

    $.ajax({
        type:'POST',
        url: '/update-form/delete',
        data: {id:$(this).data('id')}
    }).done(function(res){
        console.log(res);
    }).fail(function(res){
        console.log("Oops not working");
    });
}