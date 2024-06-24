function persegi (panjang) {
    var pinggir = "";
    var antara = "";
    var tengah = "";

    var x = ((panjang - 5) / 2) + 1;
    var y = (panjang - 1) / 2;

    

    for (i = 0; i < x; i++) {
        pinggir += "# ";
    }
    for (i = 0; i < y; i++) {
        antara += "# ";
    }
    for (i = 0; i < y; i++) {
        tengah += "* ";
    }

    console.log(`* ${pinggir}* ${pinggir}*`);
    for (i = 0; i < x; i++) {
        console.log(antara + "* " + antara);
    }
    console.log(tengah + "# " + tengah);
    for (i = 0; i < x; i++) {
        console.log(antara + "* " + antara);
    }
    console.log(`* ${pinggir}* ${pinggir}*`);

      
};

persegi(11);

//-2 0 1 2 3 4 5
// 2 3 4 5 6 7 8
// 1 3 5 7 9 11 13