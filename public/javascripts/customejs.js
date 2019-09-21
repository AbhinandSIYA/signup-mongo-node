$(document).ready(function(){
    $('.editEvent').on('click', editEvent);

});

function editEvent(){
    let a=$(this);
    $.ajax({
        type:'POST',
        url: '/update-form/delete',
        data: {id:$(this).data('id')}

    }).done(function(res){
        console.log(res);
        if (res===true){
            a.closest("tr").remove();
            toastr.success('Deleted Successfully')
            toastr.options.timeOut = 60;
        }else {
            toastr.error('Failed');
            toastr.options.timeOut = 60;
        }

    }).fail(function(res){
        console.log("Oops not working");
        toastr.error('Oops!')

    });

}
$(document).ajaxStart(function(){
    $.LoadingOverlay("show");
});
$(document).ajaxStop(function(){
    $.LoadingOverlay("hide");
});