const event_categories = [
    {id: "BANPEL", name: "BERITA ACARA NEGOSIASI PELATIHAN"},
    {id: "BANAKOM", name: "BERITA ACARA NEGOSIASI AKOMODASI"},
    {id: "PERMINTAANPEL", name: "PERMINTAAN PENGADAAN PELATIHAN"},
    {id: "PERMINTAANAKOM", name: "PERMINTAAN PENGADAAN AKOMODASI"},
    {id: "UNDANGAN", name: "UNDANGAN"},
    {id: "SPKPEL", name: "SURAT PERINTAH KERJA PELATIHAN"},
    {id: "SPKAKOM", name: "SURAT PERINTAH KERJA AKOMODASI"},
    {id: "PEMBAYARANPEL", name: "BERKAS PEMBAYARAN PELATIHAN"},
    {id: "PEMBAYARANAKOM", name: "BERKAS PEMBAYARAN AKOMODASI"},
    {id: "DOKUMENTASI", name: "DOKUMENTASI"},
]

const IHTMandatoryCategories = [
    event_categories[0],
    event_categories[1],
    event_categories[2],
    event_categories[3],
    event_categories[4],
    event_categories[5],
    event_categories[6],
    event_categories[7],
    event_categories[8],
    event_categories[9],
]

const PTMandatoryCategories = [
    event_categories[0],
    event_categories[2],
    event_categories[4],
    event_categories[5],
    event_categories[7],
    event_categories[9],
]

export {IHTMandatoryCategories, PTMandatoryCategories}