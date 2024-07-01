
var provinsi = document.querySelectorAll('#provinsi')
var kabupaten = document.querySelectorAll('#kabupaten')
           
function showAll() {
    provinsi.forEach(function (item) {                      
        item.style.display = "initial";                  
    })
    kabupaten.forEach(function (item) {                      
        item.style.display = "initial";                  
    })                   
}
showAll()

function nyala(x) {                    
    if (x === 1) {
        var hilang = kabupaten;
        var muncul = provinsi;
    } else if (x === 2) {
        hilang = provinsi;
        muncul = kabupaten;
    }                       
    hilang.forEach(function (item) {                      
        item.style.display = "none";                  
    })
    muncul.forEach(function (item) {                      
        item.style.display = "initial";                  
    })
};        