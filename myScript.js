(function() {
    var _0x1a = {};
    var sabitUcret, grtInput, fiyatEuro = 0, fiyatTL, euroKur, sabitUcretCheckbox;
    var sintine, slac, atikYag, slop, kirliBalast, katiSlac, pisSu, cop, bacaGazi;
    var fiyatEuroGoster, fiyatTLGoster, hataMesaji, hataMesaji2;

    function _initDOM() {
        grtInput = document.getElementById("grt");
        sabitUcretCheckbox = document.getElementById('sabit-ucret');
        fiyatEuroGoster = document.getElementById("fiyat-euro-box");
        fiyatTLGoster = document.getElementById("fiyat-tl-box");
        hataMesaji = document.getElementById("hata-mesaji");
        hataMesaji2 = document.getElementById("hata-mesaji2");
    }

    window.tcmbKuruGetir = function() {
        var kurInput = document.getElementById("kur");
        if (hataMesaji2) hataMesaji2.textContent = "TCMB'den kur çekiliyor...";

        fetch('/api/tcmb')
            .then(function(res) {
                if (!res.ok) throw new Error("Fonksiyon yanıt vermedi");
                return res.text();
            })
            .then(function(xmlString) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xmlString, "text/xml");
                var euroNode = xmlDoc.querySelector('Currency[Kod="EUR"]');

                if (euroNode) {
                    var forexSelling = euroNode.querySelector('ForexSelling').textContent;
                    if (forexSelling) {
                        kurInput.value = parseFloat(forexSelling);
                        if (hataMesaji2) hataMesaji2.textContent = "";
                        console.log("Resmi TCMB Euro Döviz Satış Kuru:", forexSelling);
                    }
                } else {
                    throw new Error("Euro düğümü bulunamadı");
                }
            })
            .catch(function(err) {
                console.error("Kur getirme hatası:", err);
                if (hataMesaji2) hataMesaji2.textContent = "TCMB kuru otomatik alınamadı, lütfen elle giriniz.";
            });
    };

    function handleSabitUcretChange() {
        if (sabitUcretCheckbox && grtInput) {
            grtInput.disabled = !sabitUcretCheckbox.checked;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        _initDOM();
        if (sabitUcretCheckbox) {
            sabitUcretCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    grtInput.disabled = false;
                } else {
                    grtInput.disabled = true;
                    grtInput.value = "";
                }
            });
        }
        window.tcmbKuruGetir();
        handleSabitUcretChange();
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

    function _g1() {
        var t = 0;
        if (!isNaN(parseFloat(sintine))) t += parseFloat(sintine);
        if (!isNaN(parseFloat(slac))) t += parseFloat(slac);
        if (!isNaN(parseFloat(atikYag))) t += parseFloat(atikYag);            
        if (!isNaN(parseFloat(katiSlac))) t += parseFloat(katiSlac);
        _sU();
        var m = {80:1, 140:3, 210:4, 250:5, 300:6, 350:7, 400:8, 540:10, 720:13};
        return Math.ceil(t - (m[sabitUcret] || 0));
    }

    function _g2() {
        var t = 0;            
        if (!isNaN(parseFloat(slop))) t += parseFloat(slop);
        if (!isNaN(parseFloat(kirliBalast))) t += parseFloat(kirliBalast);
        return Math.ceil(t);          
    }

    function _bG() {
        var t = 0;            
        if (!isNaN(parseFloat(bacaGazi))) t += parseFloat(bacaGazi);
        return Math.ceil(t);          
    }

    function _pS() {
        var t = 0;              
        if (!isNaN(parseFloat(pisSu))) t += parseFloat(pisSu);
        _sU();
        var m = {80:2, 140:2, 210:3, 250:4, 300:5, 350:5, 400:6, 540:10, 720:15};
        return Math.ceil(t - (m[sabitUcret] || 0));
    }

    function _cP() {
        var t = 0;          
        if (!isNaN(parseFloat(cop))) t += parseFloat(cop);
        _sU();
        var m = {80:1, 140:1, 210:2, 250:2, 300:2, 350:3, 400:3, 540:4, 720:5};
        return Math.ceil(t - (m[sabitUcret] || 0));
    }

    function _lH() {         
        if (_g1() > 0) fiyatEuro += _g1() * 35;
        if (_g2() > 0) fiyatEuro += _g2() * 1.5;
        if (_pS() > 0) fiyatEuro += _pS() * 15;
        if (_cP() > 0) fiyatEuro += _cP() * 25;
        if (_bG() > 0) fiyatEuro += _bG() * 35;
        fiyatEuro += sabitUcret;
        return _iH();
    }

    function _lMH() {
        if (_g1() > 0) fiyatEuro += _g1() * 43.75;
        if (_g2() > 0) fiyatEuro += _g2() * 1.875;
        if (_pS() > 0) fiyatEuro += _pS() * 18.75;
        if (_cP() > 0) fiyatEuro += _cP() * 31.25;
        if (_bG() > 0) fiyatEuro += _bG() * 43.75;
        fiyatEuro += sabitUcret;
        return _iH();        
    }

    function _dH() {
        if (_g1() > 0) fiyatEuro += _g1() * 45.5;
        if (_g2() > 0) fiyatEuro += _g2() * 5;
        if (_pS() > 0) fiyatEuro += _pS() * 19.5;
        if (_cP() > 0) fiyatEuro += _cP() * 32.5;
        if (_bG() > 0) fiyatEuro += _bG() * 45.5;
        fiyatEuro += sabitUcret;
        return _iH();        
    }

    function _dMH() {
        if (_g1() > 0) fiyatEuro += _g1() * 56.875;
        if (_g2() > 0) fiyatEuro += _g2() * 6.25;
        if (_pS() > 0) fiyatEuro += _pS() * 24.375;
        if (_cP() > 0) fiyatEuro += _cP() * 40.625;
        if (_bG() > 0) fiyatEuro += _bG() * 56.875;
        fiyatEuro += sabitUcret;
        return _iH();        
    }

    function _iH() {
        var r25 = document.getElementById("indirim25");
        var r50 = document.getElementById("indirim50");                    
        var mult = r25 && r25.checked ? 0.75 : (r50 && r50.checked ? 0.5 : 1);
        fiyatEuro = Math.round(fiyatEuro * mult * 100) / 100;
        return fiyatEuro;
    }

    function _sU() {
        var val = grtInput ? parseFloat(grtInput.value) : 0;
        if (!val) { sabitUcret = 0; return; }
        if (val < 1001) sabitUcret = 80;
        else if (val < 5001) sabitUcret = 140;
        else if (val < 10001) sabitUcret = 210;
        else if (val < 15001) sabitUcret = 250;
        else if (val < 20001) sabitUcret = 300;
        else if (val < 25001) sabitUcret = 350;
        else if (val < 35001) sabitUcret = 400;
        else if (val < 60001) sabitUcret = 540;
        else sabitUcret = 720;
    }

    window.hesapla = function() {
        _initDOM();
        verileriAl();

        var mI = document.getElementById("mesaiici");
        var mD = document.getElementById("mesaidisi");
        var lm = document.getElementById("liman");
        var dm = document.getElementById("demir");

        if (mI && mI.checked && lm && lm.checked) {                 
            fiyatEuroGoster.textContent = "Euro (€) : " + _lH();   
            fiyatTLGoster.textContent = "Türk Lirası (₺) : " + Math.round(fiyatEuro * euroKur * 100) / 100;
            hataMesaji.textContent = "";
        } else if (mD && mD.checked && lm && lm.checked) {
            fiyatEuroGoster.textContent = "Euro (€) : " + _lMH();  
            fiyatTLGoster.textContent = "Türk Lirası (₺) : " + Math.round(fiyatEuro * euroKur * 100) / 100;
            hataMesaji.textContent = "";
        } else if (dm && dm.checked && mI && mI.checked) {
            fiyatEuroGoster.textContent = "Euro (€) : " + _dH(); 
            fiyatTLGoster.textContent = "Türk Lirası (₺) : " + Math.round(fiyatEuro * euroKur * 100) / 100;
            hataMesaji.textContent = "";
        } else if (dm && dm.checked && mD && mD.checked) {
            fiyatEuroGoster.textContent = "Euro (€) : " + _dMH();
            fiyatTLGoster.textContent = "Türk Lirası (₺) : " + Math.round(fiyatEuro * euroKur * 100) / 100;
            hataMesaji.textContent = "";
        } else {
            hataMesaji.textContent = "Mesai ve/veya mevkii seçeneklerinden birini seçmediniz!";
        }

        hataMesaji2.textContent = euroKur === "" ? "TCMB Euro satış kurunu girmediniz!" : "";
        fiyatEuro = 0;        
    };

    window.clearFields = function() {
        _initDOM();
        ["sintine", "slac", "atikyag", "slop", "kirlibalast", "katislac", "pissu", "cop", "ek6", "grt"].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.value = "";
        });

        if (sabitUcretCheckbox) sabitUcretCheckbox.checked = false;
        if (grtInput) grtInput.disabled = true;

        document.querySelectorAll('input[type="radio"]').forEach(function(radio) { radio.checked = false; });
        var indirimsiz = document.getElementById("indirimsiz");
        if (indirimsiz) indirimsiz.checked = true;

        if (fiyatEuroGoster) fiyatEuroGoster.textContent = "Euro (€) :";
        if (fiyatTLGoster) fiyatTLGoster.textContent = "Türk Lirası (₺) :";
        if (hataMesaji) hataMesaji.textContent = "";
        if (hataMesaji2) hataMesaji2.textContent = "";
        fiyatEuro = 0;
    };

    window.changeLanguage = function() {
        var langEl = document.getElementById("language");
        if (!langEl) return;
        var lang = langEl.value;
        var labels = {
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

        var selected = labels[lang];
        if (selected) {
            Object.keys(selected).forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.textContent = selected[id];
            });
        }
    };
})();