function get(url){
    return new Promise(function(resolve, reject){

        // request strategies: ajax, jsonp
        var types = ['json', 'jsonp'];

        function call(){

            // try data type strategies one-by-one; mutates the array
            var type = types.shift();

            // no more strategies left; give up and reject the promise
            if (!type) {
                reject();
                return;
            }

            $.ajax({
                url: url,
                dataType: type,
                method: 'GET',
                success: function(resp){ resolve(resp) },
                error: function(){ call() }
            });
        }

        // attempt the first strategy
        call();
    });
}
var inputOptionsPromise = new Promise(function (resolve) {
    get("https://static.quantimo.do/data/svg-images.json?callback=?")
        .then(function(data) {
            resolve(data);
        });
})
var userInput;
$(document).on('click', '.SwalBtn1', function() {
    //Some code 1
    console.log('Button search');
    userInput = document.getElementById('swal-input1').value;
    console.log("userInput: "+userInput);
    get("https://static.quantimo.do/data/svg-images.json?callback=?")
        .then(function (data) {
            Swal.fire({
                title: 'Filtered Tag',
                input: 'select',
                inputOptions: data,
                inputPlaceholder: 'Select tag',
                confirmButtonColor: '#25C76A',
                showCancelButton: true,
                inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        if (value != '') {
                            document.getElementById('taginfo').value = value;
                            resolve();
                        }else {
                            document.getElementById('taginfo').value = "default";
                            resolve('You need to select one tag')
                        }
                    })
                }
            }).then(function (result) {
                Swal({
                    type: 'success',
                    html: 'You selected: ' + result
                })
            })
        })
});
$(function(){
    $("#taginfo").click(function(){
        console.log("click on tag info");
        Swal.fire({
            title: 'Select Tag',
            input: 'select',
            inputOptions: inputOptionsPromise,
            inputPlaceholder: 'Select tag',
            confirmButtonColor: '#25C76A',
            html:'<input id="swal-input1" class="swal2-input" placeholder="Search...">' +
                '<button type="button" role="button" tabindex="0" class="SwalBtn1 customSwalBtn">' + 'Search' + '</button>',
            showCancelButton: true,
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                    if (value != '') {
                        document.getElementById('taginfo').value = value;
                        resolve();
                    }else {
                        document.getElementById('taginfo').value = "default";
                        resolve('You need to select one tag')
                    }
                })
            }
        }).then(function (result) {
            swal({
                type: 'success',
                html: 'You selected: ' + result
            })
        })
    });
});
