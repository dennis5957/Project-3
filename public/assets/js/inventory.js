var auth;

$(document).ready(function() {
    auth = JSON.parse(sessionStorage.getItem("auth"));
    getItems();
});

function consume(sender) {
    var itemId = $(sender).data("itemid");
    
    console.log("remove button clicked, itemId: " + itemId);

    $.post(`/item/remove/${itemId}`, function(data) {
        console.log(data.count + " item(s) consumed");
        getItems();
    }).fail(function(err) {console.log(err.message);});
}

function getItems() {
    $.get(`/items/${auth.userId}`, function(items) {
        //console.log(items);
        var htmlItems = `<div class="row">
        <div class="col-4 expires">Expire Date</div>
        <div class="col-4 price">Price</div>
        <div class="col-4">
            Consume It
        </div>
    </div> 
    <hr>`;
        items.forEach(item => {
            htmlItems +=
            `<div class="row">
                <div class="col-12 text-center text-warning name">${item.name}</div>
            </div>
            <div class="row">
                <div class="col-4 expires">${moment(item.expires).format("MM/DD/YYYY")}</div>
                <div class="col-4 price">$${item.price}</div>
                <div class="col-4">
                    <button data-itemid="${item.id}" type="submit" onclick="consume(this)" class="btn btn-outline-warning remove-button">
                        Consume
                    </button>
                </div>
            </div>
            <hr class="bg-light">`;
        });

        $("#itemList").html(htmlItems);
    }).fail(function(err) {console.log(err.message);});
}

