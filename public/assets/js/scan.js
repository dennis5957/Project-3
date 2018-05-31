const SCANDIT_KEY = "AdN7biAFPA5+RD4fsww/i5QIhIDaNRp3AkIAAeBETpydYeKRqwnsCNF8yv/FY/vlnHkd5p5R4tMKVg1EcGjBgAwmn2t1VxLu+3vJq/NKJbobTCQnJF++kPJ3OMoxGj+7QV5XXlg7uFKD7unR+tQKGhraEc4uz3jLpWMteDyqXsmpo7y/J7OSYk6mUx08qCgqb/v2FFxlM4jQts+l6aHKpiDbVLThd6WFZqWCDDf8Y4KDMT5MY4dqM71aLndswzNhAgfRQwTxE6yHfjNmQybqrihKXEh271ugRQzi+y/ijkwyZEzCDLax5TzWaHHtIXWHyNQShoehVS/raw2APxB5lPkcXoQ4TjWxP+e/MqBFQ4Oz8H/buCE96N+8iUD5sXEpgKE8nLPUX7spVIV7vzqd6Zj4HWhXKMDsBtrinsHaS7xJoSxrWiixphTdRdRPHpLh9bMYUY6T4UO2x1b4kGKa8pQQ2AdHG0HIr3VRGmBMNROwPmAdms0loTCMuDEmPGf6PxPkDCcblxwm6qX2AsOwlXs9rGMBJxC27njkw4QewvI5IaGAeYLUmTrJe5ULIqpW/BQH61cti4IrYZaHzB0S7141Oz8yi4XC/Yrxk3MjEPNDbUlVF7ISL+u6fn3boF/EeeGTJmgr1Rj0dR2C4ErFmXePfxFMRELX1Pre12udOSuwido3ST8ZNMP1iG6Ivlhnr2t25Y0fJjHWvFpRvMA5NsuGWYUr/1FPJvwd/uRt2qdsIEXsd839MdybAfWctp7OYgYdhYAqrFpa2wRsuWvr+i8a5Mq4ftELXI59qzMbb0bqpP7zdpxF";
let auth;
let upc;
let name;
let expires;
let price;

$(document).ready(function () {
    resetForm();
    // $("#productInfo").hide();
    // config();
    $("#myForm").on("submit", function (event) {
        event.preventDefault();
        $.post(`/item/add/${auth.userId}/${upc}/${name}/${expires}/${price}`, function (data) {
            if (data.success) {
                console.log("Post item success: " + data.body.name);
            } else {
                console.log("Post item failed: " + data.body);
            }
        }).fail(function (err) {
            console.log(`Post new Item (${name}) failed`);
        });
    });

    $("#upcSubmitButton").click(function () {
        getProductInfo();
    });

    scanConfig();
});

function resetForm() {
    document.getElementById("myForm").reset();
    $("#expireDate").val(moment().add(7, "day").format("YYYY-MM-DD"));
}

function scanConfig() {
    ScanditSDK.configure(
        SCANDIT_KEY, {
            engineLocation: "/scandit/engine"
        }).then(function () {
        ScanditSDK.BarcodePicker.create(document.getElementById("scandit-barcode-picker"), {
                playSoundOnScan: true,
                vibrateOnScan: false
            })
            .then(function (barcodePicker) {

                // apply the scanner's settings
                var scanSettings = new ScanditSDK.ScanSettings({
                    enabledSymbologies: [
                        "ean13",
                        "upca",
                        "upce",
                        "code128"
                    ],
                    codeDuplicateFilter: 1200
                });
                barcodePicker.applyScanSettings(scanSettings);

                barcodePicker.onReady(function () {
                    $(".scanner").show();
                    $(".loader").hide();
                });


                // Event listener for when a scan is made 
                barcodePicker.onScan(function (scanResult) {
                    var barcode = scanResult.barcodes[0];
                    var barcodeType = ScanditSDK.Barcode.Symbology.toHumanizedName(barcode.symbology);
                    var barcodeData = barcode.data;


                    // UPC-A is a 12 numeric digit format
                    // Sometimes an extra zero is prepended to barcodes to add compatibility with EAN-13 (13 digits)
                    // Here we remove the leading zero if found on the barcode because our database is a UPC database
                    if (barcodeData.length > 12 && barcodeData.charAt(0) === "0") {
                        //console.log("LOGIT: ", barcodeData);
                        barcodeData = barcodeData.substring(1);
                    }
                    $("#barcodeResult").val(barcodeData);

                    getProductInfo();
                });

                barcodePicker.onScanError(function (error) {
                    console.error(error.message);
                });
            });
    }).catch(function (err) {
        alert("Scandit.Config error: " + err);
    });
}
//884912249296 (Cocoa Pebbles)
function getProductInfo() {
    var barcode = $("#barcodeResult").val();
    console.log(barcode);
    $.get(`/product/info/${barcode}`, function (data) {
        // console.log(data);
        item = JSON.parse(data).items[0];
        //console.log(item);        
        $("#productName").val(item.name);
        $("#productImage").attr("src", item.thumbnailImage);
        $("#price").val(item.salePrice);

        auth = JSON.parse(sessionStorage.getItem("auth"));
        upc = item.upc;
        name = item.name;
        expires = $("#expireDate").val();
        price = item.salePrice;


    }).fail(function (err) {
        console.log("ajax get product info failed", err.message);
    });
}