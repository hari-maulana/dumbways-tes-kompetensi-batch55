function hitungBarang(x, y) {
        var harga;
        var potongan;

        if (x === "A") {
            harga = 4550;
            if (y > 13) {
                potongan = 231 * y;
            } else {
                potongan = 0;
            }
            
        } 
        
        
        else if (x === "B") {
            harga = 5330;
            if (y > 7) {
                potongan = (((harga * y) / 100) * 23);
            } else {
                potongan = 0;
            }
            
        } 
        
        else if (x === "C") {
            harga = 8653;
            potongan = 0;
        }

        const totalHarga = harga * y;
        const totalBayar = totalHarga - potongan;
        
        console.log("Barang kualitas: " + x);
        console.log("Total harga barang: " + totalHarga);
        console.log("Potongan: " + potongan);
        console.log("Yang harus dibayar: " + totalBayar);
};

const A = "A";
const B = "B";
const C = "C";

hitungBarang(C, 14);