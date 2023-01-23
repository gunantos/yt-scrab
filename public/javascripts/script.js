"use strict";
const LIST_URL = [];
$(function () {
    $(".nav").find(".active").removeClass("active");

    var navlist = $('.nav .nav-link')
    if (typeof navlist == 'object') {
        var url = document.URL;
        for (let i = 0; i < navlist.length; i++) {
            if (url == navlist[i].href) {
                $(navlist[i]).addClass('active')
            }
        }
    }
    function toast(msg) {
        $('.toast>.toast-body').html(msg);
        $('.toast').toast('show');
    }
    $('#button-add').click(function () {
        var url = $('#url')
        if (url.val() != "") {
            var urls = url.val()
            if ($.inArray(urls, LIST_URL) < 0) {
                LIST_URL.push(urls);
                var ind = LIST_URL.length - 1;
                $('#list-url').append(`<li id="url-ke-${ind}" class="list-group-item d-flex justify-content-between align-items-center">https://www.youtube.com/watch?v=${urls}
            <span class="badge badge-outline-primary badge-pill" id="badge-ke-${ind}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass" viewBox="0 0 16 16">
  <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5zm2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2h-7z"/>
</svg></span>
        </li>`);
                url.val('')
            } else {
                toast('URL sudah dalam daftar');
            }
        } else {
            toast('URL masih kosong');
        }
    });
    $('#button-submit').click(function () {
        if (LIST_URL.length < 1) {
            toast('Daftar URL masih kosong');
        } else {
        
            $('#button-add').attr('disabled');
            $('#button-add').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>')
            $('#button-submit').attr('disabled');
            $('#button-submit').html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>')
            let i = 0;
            LIST_URL.map(async function (itm) {
                await saveData(i);
                i++;
            })
            $('#button-add').removeAttr('disabled');
            $('#button-submit').removeAttr('disabled');
            $('#button-add').html('ADD')
            $('#button-submit').html('PROCESS')
        }
    });
    $('#button-clear').click(function () {
        LIST_URL.length = 0;
        $('#list-url').html('')
    })
});
async function saveData(i) {
    return new Promise((resolve, reject) => {
    var data = { url: LIST_URL[i]}
    $.ajax({
        type: "POST",
        data: data,
        async: true,
        timeout: 0,
        success: function (res) {
             toast(res.message);
             if (res.status) {
                    $('#badge-ke-' + i).html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>
                        `);
                                        } else {
                                            $('#badge-ke-' + i).html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dc3545" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>`);
            }
            resolve(true);            
        }
    });
        
    })
                
}