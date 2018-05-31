var startDate;
var endDate;
var auth;
$(document).ready(function () {

    auth = JSON.parse(sessionStorage.getItem("auth"));

    startDate = moment().subtract(30, "day").format("YYYY-MM-DD");
    endDate = moment().format("YYYY-MM-DD");

    $("#startDate").val(startDate);
    $("#endDate").val(endDate);


    $("#goButton").click(function (event) {
        event.preventDefault();
        startDate = $("#startDate").val();
        endDate = $("#endDate").val();
        fetchItems();
    });

    fetchItems();

});

function fetchItems() {


    $.get(`/items/${auth.userId}/${startDate}/${endDate}/true`, function (items) {




        var htmlItems = `
        <div class="row">
            <div class="col-6 text-center expires">Expire Date</div>
            <div class="col-6 text-center price">Price</div>
        </div>
        <hr>`;
        var total = 0.00;

        items.forEach(item => {
            total = (Math.round((total + item.price) * 100)) / 100;
            htmlItems +=
                `<div class="row">
                <div class="col-12 text-lg text-center text-warning name">${item.name}</div>
            </div>
            <div class="row">
                <div class="col-6 text-center expires">${moment(item.expires).format("MM/DD/YYYY")}</div>
                <div class="col-6 text-center price">$${item.price}</div>
            </div>         
            <hr class="bg-light">`;
        });

        $("#itemList").html(htmlItems);
        $("#total").text(`$ ${total}`);

    }).fail(function (err) {
        console.log(err.message);
    });

}