$(document).ready(function () {
    //Change the navbar background color based on the scroll amount 
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 880) { // this refers to window
            $('nav.navbar').css('background', 'rgba(51,51,51,0.9)');
        } else {
            $('nav.navbar').css('background', 'transparent');
        }
    });

    //AGENCY SECTION ANIMATION
    $("#agency").waypoint(function () {
        $("#agency").addClass('animated fadeInDown');
    }, { offset: '100%' });

    $("#agency1").waypoint(function () {
        $("#agency1").addClass('animated jello');
    }, { offset: '100%' });

    $("#agency2").waypoint(function () {
        $("#agency2").addClass('animated bounce');
    }, { offset: '100%' });

    $("#agency3").waypoint(function () {
        $("#agency3").addClass('animated bounce');
    }, { offset: '100%' });

    $("#agency4").waypoint(function () {
        $("#agency4").addClass('animated jello');
    }, { offset: '100%' });

    //NEWS SECTION ANIMATION
    $("#news1").waypoint(function () {
        $("#news1").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    $("#news2").waypoint(function () {
        $("#news2").addClass('animated fadeInDown');
    }, { offset: '100%' });

    $("#news3").waypoint(function () {
        $("#news3").addClass('animated fadeInUp');
    }, { offset: '100%' });

    $("#news4").waypoint(function () {
        $("#news4").addClass('animated fadeInRight');
    }, { offset: '100%' });

    //BLOG SECTION ANIMATION
    $("#blog").waypoint(function () {
        $("#blog").addClass('animated fadeIn');
    }, { offset: '100%' });

    $("#blog1").waypoint(function () {
        $("#blog1").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    $("#blog2").waypoint(function () {
        $("#blog2").addClass('animated fadeInUp');
    }, { offset: '100%' });

    $("#blog3").waypoint(function () {
        $("#blog3").addClass('animated fadeInDown');
    }, { offset: '100%' });

    $("#blog4").waypoint(function () {
        $("#blog4").addClass('animated fadeInRight');
    }, { offset: '100%' });

    // QUICK SECTION ANIMATION

    $("#quick1").waypoint(function () {
        $("#quick1").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    $("#quick2").waypoint(function () {
        $("#quick2").addClass('animated fadeInRight');
    }, { offset: '100%' });


    // KEY SECTION ANIMATION
    $("#phone").waypoint(function () {
        $("#phone").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    $("#key-section-title").waypoint(function () {
        $("#key-section-title").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    $("#key-section-text").waypoint(function () {
        $("#key-section-text").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    $("#key-section-box-1").waypoint(function () {
        $("#key-section-box-1").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    $("#key-section-box-2").waypoint(function () {
        $("#key-section-box-2").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    $("#key-section-box-3").waypoint(function () {
        $("#key-section-box-3").addClass('animated fadeInLeft');
    }, { offset: '100%' });

    // Responsavel pelo upload do arquivo
    bs_input_file();

    // Responsavel pelo controle do destaque da navegação
    $("#home").addClass('active-link');
    $(".nav-link").on('click', function (e) {
        $(".nav-link").removeClass('active-link');
        $(this).addClass('active-link');
    });

    // Responsavel por colocar o nome no input do arquivo
    $('#inputGroupFile02').on('change', function () {
        //get the file name
        var fileName = $(this).val().replace(/^.*\\/, "");
        //replace the "Choose a file" label
        $(this).next('.custom-file-label').html(fileName);
    })

    // Responsavel por selecionar a secao de contato caso ocorra algum erro
    $('#contato').on('click', function () {
        $('a[href="#contact-section"]').click();
        $("#exampleModalScrollable").modal('hide');
    })

    $("#btnSubmit").click(function (event) {

        //stop submit the form, we will post it manually.
        event.preventDefault();

        $("#overlay").removeClass('hidden');

        var form = $('#fileUploadForm')[0];
        var formData = new FormData();

        formData.append("file", form[0].files[0], form[0].files[0].name);


        // disabled the submit button
        // $("#btnSubmit").prop("disabled", true);

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://localhost:8000/textextractor",
            processData: false,
            contentType: false,
            cache: false,
            data: formData,
            timeout: 80000000,
            success: function (data) {
                
                $("#overlay").addClass('hidden');
                $("#conteudo-json").removeClass('hidden');
                $("#json").html("");
                conteudoJson(data);
                $('a[href="#conteudo-json"]').click();
            },
            error: function (e) {

                $("#overlay").addClass('hidden');
                $("#conteudo-json").addClass('hidden');

                $("#exampleModalScrollable").modal('show');
                
            }
        });

    });

});

// TEAM SECTION
$("#team").waypoint(function () {
    $("#team").addClass('animated fadeIn');
}, { offset: '100%' });

$("#team1").waypoint(function () {
    $("#team1").addClass('animated fadeInLeft');
}, { offset: '100%' });

$("#team2").waypoint(function () {
    $("#team2").addClass('animated fadeInUp');
}, { offset: '100%' });

$("#team3").waypoint(function () {
    $("#team3").addClass('animated fadeInDown');
}, { offset: '100%' });

$("#team4").waypoint(function () {
    $("#team4").addClass('animated fadeInRight');
}, { offset: '100%' });

//Contact Section
$("#form-inputs").waypoint(function () {
    $("#form-inputs").addClass('animated fadeInRight');
}, { offset: '100%' });

$("#form-text-area").waypoint(function () {
    $("#form-text-area").addClass('animated fadeInLeft');
}, { offset: '100%' });

$("#form-button").waypoint(function () {
    $("#form-button").addClass('animated fadeInUp');
}, { offset: '100%' });

function bs_input_file() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}

function conteudoJson(data) {

    var jsonViewer = new JSONViewer();
    var textedJson = JSON.stringify(data, undefined, 4);
    var jsonObj = JSON.parse(textedJson);

    document.querySelector("#json").appendChild(jsonViewer.getContainer());
    jsonViewer.showJSON(jsonObj);

}

// Usar apenas para teste
function getJsonTeste() {

    var myData = {
        "address": {
            "House_Number": 505,
            "Street_Direction": "",
            "Street_Name": "Claremont ssdf sdf asdasd as dasd as dasd asd asd ad asd adas da da d",
            "Street_Type": "Street asd asd a da da dad asd asdasd asdasdas d da da d",
            "Apt": "15L",
            "Burough": "Brooklyn",
            "State": "NY",
            "Zip": "10451",
            "Phone": "718-777-7777"
        },
        "car": {
            "House_Number": 505,
            "Street_Direction": "",
            "Street_Name": "Claremont ssdf sdf asdasd as dasd as dasd asd asd ad asd adas da da d",
            "Street_Type": "Street asd asd a da da dad asd asdasd asdasdas d da da d",
            "Apt": "15L",
            "Burough": "Brooklyn",
            "State": "NY",
            "Zip": "10451",
            "Phone": "718-777-7777"
        },
        "house": {
            "House_Number": 505,
            "Street_Direction": "",
            "Street_Name": "Claremont ssdf sdf asdasd as dasd as dasd asd asd ad asd adas da da d",
            "Street_Type": "Street asd asd a da da dad asd asdasd asdasdas d da da d",
            "Apt": "15L",
            "Burough": "Brooklyn",
            "State": "NY",
            "Zip": "10451",
            "Phone": "718-777-7777"
        },
        "street": {
            "House_Number": 505,
            "Street_Direction": "",
            "Street_Name": "Claremont ssdf sdf asdasd as dasd as dasd asd asd ad asd adas da da d",
            "Street_Type": "Street asd asd a da da dad asd asdasd asdasdas d da da d",
            "Apt": "15L",
            "Burough": "Brooklyn",
            "State": "NY",
            "Zip": "10451",
            "Phone": "718-777-7777"
        },
        "casehead": 0,
        "adults": [{
            "Last_Name": "Foo",
            "First_Name": "A",
            "Sex": "M",
            "Date_Of_Birth": "01011980"
        }],
        "children": []
    };

    return myData;
}

