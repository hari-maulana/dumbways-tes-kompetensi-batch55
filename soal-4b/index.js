const express = require('express');
const path = require("path");
const pool = require('./database');

const app = express();
const port = 3000;


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));


//PENAMPUNG

//Routing
app.get("/", home);

//ALL ABOUT PROV
app.post("/add-provinsi", addProvinsiPost) 
app.get("/add-provinsi", addProvinsiView)
app.get("/update-provinsi/:prov_id",updateProvinsiView)
app.post("/update-provinsi/:prov_id", updateProvinsiPost)
app.post("/delete-provinsi/:prov_id", deleteProvinsiPost)

//ALL ABOUT KAB
app.post("/add-kab", addKabPost)
app.get("/add-kabupaten", addKabupatenView)
app.get("/update-kab/:kab_id",updateKabView)
app.post("/update-kab/:kab_id", updateKabPost)
app.post("/delete-kab/:kab_id", deleteKabPost);



async function home(req, res) {
    const resultProv = await pool.query('SELECT * FROM public.prov');
    const resultKab = await pool.query('SELECT * FROM public.kab');

        const unsortedProv = resultProv.rows;
        const unsortedKab = resultKab.rows;
        
        let dataProv = unsortedProv.sort((a, b) => b.prov_id - a.prov_id);
        let dataKab = unsortedKab.sort((a, b) => b.kab_id - a.kab_id);
        
        res.render("index", { dataProv, dataKab });
};

// ADD PROVINSI PAGE ACTION
// create
async function addProvinsiPost(req, res) {
    const { nama, diresmikan, pulau } = req.body;
    var foto = "prov-photo";

    const result = await pool.query(
        `INSERT INTO public.prov(nama, diresmikan, foto, pulau) VALUES ($1, $2, $3, $4) RETURNING *`,
        [nama, diresmikan, foto, pulau]
    );
    res.redirect("/");
};
// read
function addProvinsiView(req, res) {
    res.render("add-provinsi");
};
//update
async function updateProvinsiView(req, res) {
    const { prov_id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM public.prov WHERE prov_id = $1', [prov_id]);
        res.render("update-provinsi", { prov: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
};
async function updateProvinsiPost(req, res) {
    const { prov_id } = req.params;
    const { nama, diresmikan, pulau } = req.body;
    var foto = "prov_foto";
    await pool.query(
        `UPDATE public.prov SET nama = $1, diresmikan = $2, foto = $3, pulau = $4 WHERE prov_id = $5 RETURNING *`,
        [nama, diresmikan, foto, pulau, prov_id]
    );
    res.redirect("/");
};
//delete
async function deleteProvinsiPost(req, res) {
    const { prov_id } = req.params;
    await pool.query('DELETE FROM public.prov WHERE prov_id = $1 RETURNING *', [prov_id]);
    res.redirect("/");
};

// ADD KABUPATEN PAGE ACTION
//create
async function  addKabPost(req, res) {
    const { nama, diresmikan, pulau, prov_id } = req.body;
    var foto = "prov-photo";
    console.log(prov_id);

    const result = await pool.query(
        `INSERT INTO public.kab(nama, diresmikan, foto, pulau, prov_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nama, diresmikan, foto, pulau, prov_id]
    );
    res.redirect("/");
};
//read
function addKabupatenView(req, res) {
    res.render("add-kabupaten");
};
//upddate
async function updateKabView(req, res) {
    const { kab_id } = req.params;
    const result = await pool.query('SELECT * FROM public.kab WHERE kab_id = $1', [kab_id]);
        if (result.rows.length === 0) {
            return res.status(404).send("Kabupaten tidak ditemukan");
        }
        res.render("update-kab", { kab: result.rows[0] });
};
async function updateKabPost(req, res) {
    const { kab_id } = req.params;
    const { nama, diresmikan, pulau, prov_id } = req.body;
    var foto = "kab_foto";

    await pool.query(
        `UPDATE public.kab SET nama = $1, diresmikan = $2, foto = $3, pulau = $4, prov_id = $5 WHERE kab_id = $6 RETURNING *`,
        [nama, diresmikan, foto, pulau, prov_id, kab_id]
    );
    res.redirect("/");

};
//delete
async function deleteKabPost(req, res) {
    const { kab_id } = req.params;
    await pool.query('DELETE FROM public.kab WHERE kab_id = $1 RETURNING *', [kab_id]);
    res.redirect("/");
}

//DETAILS
app.get("/prov-details/:prov_id", async function provDetails(req, res) {
    const { prov_id } = req.params;
    const result = await pool.query('SELECT * FROM public.prov WHERE prov_id = $1', [prov_id]);
    res.render("detail-provinsi", { prov: result.rows[0] });
});
app.get("/kab-details/:kab_id", async function provDetails(req, res) {
    const { kab_id } = req.params;
    const result = await pool.query('SELECT * FROM public.kab WHERE prov_id = $1', [kab_id]);
    res.render("detail-kabupaten", { kab: result.rows[0] });
});

app.listen(port, () => {
    console.log(`server berjalan pada port: ${port}`);
});
