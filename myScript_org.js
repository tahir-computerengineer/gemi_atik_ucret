var sabitUcret;
var grtInput = document.getElementById("grt");
var fiyatEuro = 0;
var fiyatTL;
var euroKur;
var sabitUcretCheckbox = document.getElementById('sabit-ucret');                
var sintine, slac, atikYag, slop, kirliBalast, katiSlac, pisSu, cop, bacaGazi;
var fiyatEuroGoster = document.getElementById("fiyat-euro-box");
var fiyatTLGoster = document.getElementById("fiyat-tl-box");  
var hataMesaji = document.getElementById("hata-mesaji");
var hataMesaji2 = document.getElementById("hata-mesaji2");



function tcmbKuruGetir() {
    var kurInput = document.getElementById("kur");
    if (hataMesaji2) hataMesaji2.textContent = "TCMB'den kur çekiliyor...";

    fetch('/.netlify/functions/tcmb')
        .then(response => {
            if (!response.ok) throw new Error("Fonksiyon yanıt vermedi");
            return response.text();
        })
        .then(xmlString => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            const euroNode = xmlDoc.querySelector('Currency[Kod="EUR"]');

            if (euroNode) {
                const forexSelling = euroNode.querySelector('ForexSelling').textContent;
                if (forexSelling) {
                    kurInput.value = parseFloat(forexSelling);
                    if (hataMesaji2) hataMesaji2.textContent = "";
                    console.log("Resmi TCMB Euro Döviz Satış Kuru:", forexSelling);
                }
            } else {
                throw new Error("Euro düğümü bulunamadı");
            }
        })
        .catch(err => {
            console.error("Kur getirme hatası:", err);
            if (hataMesaji2) hataMesaji2.textContent = "TCMB kuru otomatik alınamadı, lütfen elle giriniz.";
        });
}


// Sayfa yüklendiğinde kuru otomatik çek
document.addEventListener('DOMContentLoaded', tcmbKuruGetir);

function handleSabitUcretChange() {
    if (sabitUcretCheckbox.checked) {
        grtInput.disabled = false;
    } else {
        grtInput.disabled = true;
    }
}

window.onload = function() {
    handleSabitUcretChange();
    tcmbKuruGetir();
};

sabitUcretCheckbox.addEventListener('change', function() {
    if (this.checked) {
        grtInput.disabled = false;
    } else {
        grtInput.disabled = true;
        grtInput.value = "";
    }
});

function verileriAl() {
    sintine = document.getElementById("sintine").value;
    slac = document.getElementById("slac").value;
    atikYag = document.getElementById("atikyag").value;
    slop = document.getElementById("slop").value;
    kirliBalast = document.getElementById("kirlibalast").value;
    katiSlac = document.getElementById("katislac").value;
    pisSu = document.getElementById("pissu").value;
    cop = document.getElementById("cop").value;
    bacaGazi = document.getElementById("ek6").value;   
    euroKur = document.getElementById("kur").value;                                  
}        

function grup1Toplam(){
    var total = 0;         
    if(!isNaN(parseFloat(sintine))) total += parseFloat(sintine);
    if(!isNaN(parseFloat(slac))) total += parseFloat(slac);
    if(!isNaN(parseFloat(atikYag))) total += parseFloat(atikYag);            
    if(!isNaN(parseFloat(katiSlac))) total += parseFloat(katiSlac);

    sabitUcretHesapla();

    if(sabitUcret == 80) return Math.ceil(total-1);
    else if(sabitUcret == 140) return Math.ceil(total-3);
    else if(sabitUcret == 210) return Math.ceil(total-4);
    else if(sabitUcret == 250) return Math.ceil(total-5);
    else if(sabitUcret == 300) return Math.ceil(total-6);
    else if(sabitUcret == 350) return Math.ceil(total-7);
    else if(sabitUcret == 400) return Math.ceil(total-8);
    else if(sabitUcret == 540) return Math.ceil(total-10);
    else if(sabitUcret == 720) return Math.ceil(total-13);
    else return Math.ceil(total);
}

function grup2Toplam(){
    var total = 0;            
    if(!isNaN(parseFloat(slop))) total += parseFloat(slop);
    if(!isNaN(parseFloat(kirliBalast))) total += parseFloat(kirliBalast);
    return Math.ceil(total);          
}

function bacaGaziToplam(){
    var total = 0;            
    if(!isNaN(parseFloat(bacaGazi))) total += parseFloat(bacaGazi);
    return Math.ceil(total);          
}

function pisSuToplam(){
    var total = 0;             
    if(!isNaN(parseFloat(pisSu))) total += parseFloat(pisSu);
    
    sabitUcretHesapla();

    if(sabitUcret==80) return Math.ceil(total-2);
    else if(sabitUcret==140) return Math.ceil(total-2);
    else if(sabitUcret==210) return Math.ceil(total-3);
    else if(sabitUcret==250) return Math.ceil(total-4);
    else if(sabitUcret==300) return Math.ceil(total-5);
    else if(sabitUcret==350) return Math.ceil(total-5);
    else if(sabitUcret==400) return Math.ceil(total-6);
    else if(sabitUcret==540) return Math.ceil(total-10);
    else if(sabitUcret==720) return Math.ceil(total-15);
    else return Math.ceil(total);
}

function copToplam(){
    var total = 0;         
    if(!isNaN(parseFloat(cop))) total += parseFloat(cop);

    sabitUcretHesapla();
    
    if(sabitUcret==80) return Math.ceil(total-1);
    else if(sabitUcret==140) return Math.ceil(total-1);
    else if(sabitUcret==210) return Math.ceil(total-2);
    else if(sabitUcret==250) return Math.ceil(total-2);
    else if(sabitUcret==300) return Math.ceil(total-2);
    else if(sabitUcret==350) return Math.ceil(total-3);
    else if(sabitUcret==400) return Math.ceil(total-3);
    else if(sabitUcret==540) return Math.ceil(total-4);
    else if(sabitUcret==720) return Math.ceil(total-5);
    else return Math.ceil(total);
}

function limanHesapla(){         
    if(grup1Toplam() > 0) fiyatEuro += grup1Toplam() * 35;
    if(grup2Toplam() > 0) fiyatEuro += grup2Toplam() * 1.5;
    if(pisSuToplam() > 0) fiyatEuro += pisSuToplam() * 15;
    if(copToplam() > 0) fiyatEuro += copToplam() * 25;
    if(bacaGaziToplam() > 0) fiyatEuro += bacaGaziToplam() * 35;

    fiyatEuro += sabitUcret;
    return indirimHesapla();
}

function limanMesailiHesapla(){
    if(grup1Toplam() > 0) fiyatEuro += grup1Toplam() * 43.75;
    if(grup2Toplam() > 0) fiyatEuro += grup2Toplam() * 1.875;
    if(pisSuToplam() > 0) fiyatEuro += pisSuToplam() * 18.75;
    if(copToplam() > 0) fiyatEuro += copToplam() * 31.25;
    if(bacaGaziToplam() > 0) fiyatEuro += bacaGaziToplam() * 43.75;

    fiyatEuro += sabitUcret;
    return indirimHesapla();        
}

function demirHesapla(){
    if(grup1Toplam() > 0) fiyatEuro += grup1Toplam() * 45.5;
    if(grup2Toplam() > 0) fiyatEuro += grup2Toplam() * 5;
    if(pisSuToplam() > 0) fiyatEuro += pisSuToplam() * 19.5;
    if(copToplam() > 0) fiyatEuro += copToplam() * 32.5;
    if(bacaGaziToplam() > 0) fiyatEuro += bacaGaziToplam() * 45.5;

    fiyatEuro += sabitUcret;
    return indirimHesapla();        
}

function demirMesailiHesapla(){
    if(grup1Toplam() > 0) fiyatEuro += grup1Toplam() * 56.875;
    if(grup2Toplam() > 0) fiyatEuro += grup2Toplam() * 6.25;
    if(pisSuToplam() > 0) fiyatEuro += pisSuToplam() * 24.375;
    if(copToplam() > 0) fiyatEuro += copToplam() * 40.625;
    if(bacaGaziToplam() > 0) fiyatEuro += bacaGaziToplam() * 56.875;

    fiyatEuro += sabitUcret;
    return indirimHesapla();        
}

function indirimHesapla(){
    var yuzde25RadioButton = document.getElementById("indirim25");
    var yuzde50RadioButton = document.getElementById("indirim50");                    

    if(yuzde25RadioButton.checked) {
        fiyatEuro = Math.round(fiyatEuro * 0.75 * 100) / 100; 
        return fiyatEuro;
    } else if(yuzde50RadioButton.checked) {
        fiyatEuro = Math.round(fiyatEuro * 0.5 * 100) / 100; 
        return fiyatEuro;
    } else {					
        fiyatEuro = Math.round(fiyatEuro * 100) / 100;
        return fiyatEuro;
    }
}

function sabitUcretHesapla() {
    if(grtInput.value == 0 || grtInput.value == "") {
        sabitUcret = 0;
    } else if(grtInput.value < 1001) {
        sabitUcret = 80;  
    } else if(grtInput.value < 5001) {
        sabitUcret = 140;
    } else if(grtInput.value < 10001) {
        sabitUcret = 210;
    } else if(grtInput.value < 15001) {
        sabitUcret = 250;
    } else if(grtInput.value < 20001) {
        sabitUcret = 300;
    } else if(grtInput.value < 25001) {
        sabitUcret = 350;
    } else if(grtInput.value < 35001) {
        sabitUcret = 400;
    } else if(grtInput.value < 60001) {
        sabitUcret = 540;
    } else {
        sabitUcret = 720; 
    }
}  

function hesapla(){
    verileriAl();

    var mesaiIciRadioButton = document.getElementById("mesaiici");
    var mesaiDisiRadioButton = document.getElementById("mesaidisi");
    var limandaRadioButton = document.getElementById("liman");
    var demirdeRadioButton = document.getElementById("demir");

    if (mesaiIciRadioButton.checked && limandaRadioButton.checked) {					
        fiyatEuroGoster.textContent = "Euro (€) : " + limanHesapla();    
        fiyatTLGoster.textContent = "Türk Lirası (₺) : " + Math.round(fiyatEuro * euroKur * 100) / 100;
        hataMesaji.textContent = "";

    } else if (mesaiDisiRadioButton.checked && limandaRadioButton.checked) {
        fiyatEuroGoster.textContent = "Euro (€) : " + limanMesailiHesapla();  
        fiyatTLGoster.textContent = "Türk Lirası (₺) : " + Math.round(fiyatEuro * euroKur * 100) / 100;
        hataMesaji.textContent = "";

    } else if (demirdeRadioButton.checked && mesaiIciRadioButton.checked ) {
        fiyatEuroGoster.textContent = "Euro (€) : " + demirHesapla(); 
        fiyatTLGoster.textContent = "Türk Lirası (₺) : " + Math.round(fiyatEuro * euroKur * 100) / 100;
        hataMesaji.textContent = "";

    } else if (demirdeRadioButton.checked && mesaiDisiRadioButton.checked) {
        fiyatEuroGoster.textContent = "Euro (€) : " + demirMesailiHesapla();
        fiyatTLGoster.textContent = "Türk Lirası (₺) : " + Math.round(fiyatEuro * euroKur * 100) / 100;
        hataMesaji.textContent = "";
    } else {
        hataMesaji.textContent = "Mesai ve/veya mevkii seçeneklerinden birini seçmediniz!";
    }

    if(euroKur === "") {
        hataMesaji2.textContent = "TCMB Euro satış kurunu girmediniz!";
    } else {
        hataMesaji2.textContent = "";
    }

    fiyatEuro = 0;        
}

function clearFields() {
    const ids = ["sintine", "slac", "atikyag", "slop", "kirlibalast", "katislac", "pissu", "cop", "ek6", "grt"];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    sabitUcretCheckbox.checked = false;
    grtInput.disabled = true;

    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.getElementById("indirimsiz").checked = true;

    fiyatEuroGoster.textContent = "Euro (€) :";
    fiyatTLGoster.textContent = "Türk Lirası (₺) :";
    hataMesaji.textContent = "";
    hataMesaji2.textContent = "";
    fiyatEuro = 0;
}

// Dil Değiştirme Fonksiyonu
function changeLanguage() {
    const lang = document.getElementById("language").value;
    const labels = {
        tr: {
            "ana-baslik": "GEMİ ATIK ÜCRETİ HESAPLAMA",
            "kur-label": "TCMB Euro Satış Kuru:",
            "sabit-ucret-label": "Gemi sabit ücrete tabi ise işaretleyiniz",
            "grt-label": "Groston:",
            "mesaiici-label": "Mesai İçi",
            "mesaidisi-label": "Mesai Dışı",
            "liman-label": "Limanda",
            "demir-label": "Demirde",
            "indirimsiz-label": "İndirimsiz",
            "indirim25-label": "%25 indirim",
            "indirim50-label": "%50 indirim",
            "sintine-label": "Sintine:",
            "slac-label": "Slaç:",
            "atikyag-label": "Atık Yağ:",
            "slop-label": "Slop:",
            "kirlibalast-label": "Kirli Balast:",
            "katislac-label": "Katı Slaç:",
            "pissu-label": "Pis Su:",
            "cop-label": "Çöp:",
            "ek6-label": "Egzoz Gazı:"
        },
        en: {
            "ana-baslik": "SHIP WASTE FEE CALCULATOR",
            "kur-label": "CBRT Euro Selling Rate:",
            "sabit-ucret-label": "Check if vessel is subject to fixed fee",
            "grt-label": "Gross Tonnage:",
            "mesaiici-label": "Working Hours",
            "mesaidisi-label": "Overtime",
            "liman-label": "At Berth",
            "demir-label": "At Anchor",
            "indirimsiz-label": "No Discount",
            "indirim25-label": "25% Discount",
            "indirim50-label": "50% Discount",
            "sintine-label": "Bilge:",
            "slac-label": "Sludge:",
            "atikyag-label": "Waste Oil:",
            "slop-label": "Slop:",
            "kirlibalast-label": "Dirty Ballast:",
            "katislac-label": "Solid Sludge:",
            "pissu-label": "Sewage:",
            "cop-label": "Garbage:",
            "ek6-label": "Exhaust Gas:"
        }
    };

    const selected = labels[lang];
    Object.keys(selected).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = selected[id];
    });
}