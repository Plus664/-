let input_form_container, input_form, input_form_button;
let cover;

const recipes = {
    oil1: {
        category: "さっぱり洗浄",
        description: "泡立ちが良く、しっかり洗浄できる石鹸。脂性肌やスポーツ後の使用におすすめ。",
        oils: [
            { name: "ココナッツ油",     percentage: 40 },
            { name: "パーム核油",       percentage: 30 },
            { name: "グレープシード油", percentage: 20 },
            { name: "ひまし油",         percentage: 10 },
        ],
        saponification_rate: 0.92,
        alkali_purity: 0.98,
        water_ratio: 0.35,
    },
    oil2: {
        category: "しっとり保湿",
        description: "肌に優しく、しっとりとした仕上がり。乾燥肌や冬の使用に最適。",
        oils: [
            { name: "シアバター",    percentage: 25 },
            { name: "ｽｲｰﾄｱｰﾓﾝﾄﾞｵｲﾙ", percentage: 25 },
            { name: "アボガド油",    percentage: 30 },
            { name: "ココナッツ油",  percentage: 20 },
        ],
        saponification_rate: 0.93,
        alkali_purity: 0.97,
        water_ratio: 0.36,
    },
    oil3: {
        category: "もっちり泡立ち",
        description: "泡立ちが豊かでクリーミーな石鹸。マイルドな洗浄力で敏感肌にも◎。",
        oils: [
            { name: "ひまし油",     percentage: 30 },
            { name: "パーム核油",   percentage: 30 },
            { name: "ココナッツ油", percentage: 20 },
            { name: "ホホバオイル", percentage: 20 },
        ],
        saponification_rate: 0.91,
        alkali_purity: 0.98,
        water_ratio: 0.34,
    },
    oil4: {
        category: "硬め長持ち",
        description: "硬く溶けにくい石鹸。しっかりしたフォームで長く使える。",
        oils: [
            { name: "牛脂",         percentage: 40 },
            { name: "パーム油",     percentage: 30 },
            { name: "シアバター",   percentage: 20 },
            { name: "ココナッツ油", percentage: 10 },
        ],
        saponification_rate: 0.94,
        alkali_purity: 0.99,
        water_ratio: 0.33,
    },
    oil5: {
        category: "敏感肌向け",
        description: "低刺激で肌に優しい成分を使用。敏感肌の人や赤ちゃんにもおすすめ。",
        oils: [
            { name: "ｽｲｰﾄｱｰﾓﾝﾄﾞｵｲﾙ", percentage: 30 },
            { name: "ホホバオイル",  percentage: 25 },
            { name: "シアバター",    percentage: 25 },
            { name: "ひまわり油",    percentage: 20 },
        ],
        saponification_rate: 0.90,
        alkali_purity: 0.97,
        water_ratio: 0.37,
    },
    oil6: {
        category: "和風美容",
        description: "椿油や米ぬか油を配合した美容石鹸。日本古来のスキンケアを取り入れた処方。",
        oils: [
            { name: "椿油",               percentage: 40 },
            { name: "米ぬか油",           percentage: 30 },
            { name: "ホホバオイル",       percentage: 20 },
            { name: "ローズヒップオイル", percentage: 10 },
        ],
        saponification_rate: 0.92,
        alkali_purity: 0.98,
        water_ratio: 0.35,
    },
    oil7: {
        category: "冬向け・超保湿",
        description: "保湿力抜群！乾燥しがちな冬の肌をしっかりケア。",
        oils: [
            { name: "シアバター",   percentage: 30 },
            { name: "ココアバター", percentage: 30 },
            { name: "アボガド油",   percentage: 20 },
            { name: "米ぬか油",     percentage: 20 },
        ],
        saponification_rate: 0.93,
        alkali_purity: 0.98,
        water_ratio: 0.36,
    },
    oil8: {
        category: "美容ケア",
        description: "美容成分を豊富に含んだ石鹸。肌のハリ・ツヤUPを目指す人向け。",
        oils: [
            { name: "ローズヒップオイル", percentage: 35 },
            { name: "ホホバオイル",       percentage: 30 },
            { name: "グレープシード油",   percentage: 20 },
            { name: "アボガド油",         percentage: 15 },
        ],
        saponification_rate: 0.91,
        alkali_purity: 0.97,
        water_ratio: 0.34,
    },
};

const calc_soda = (sap_values, amounts, discount, alkali_rate) => {
    let alkali = 0;
    sap_values.forEach((val, i) => {
        alkali += Math.floor(val / 56.1 * 400) / 10000 * amounts[i];
    });

    let result = Math.round(alkali * discount / alkali_rate * 10) / 10;
    return result;
};

const calc_alkali = (recipe, sap_values, amounts) => {
    const discount = Number(recipe.saponification_rate);
    const alkali_rate = Number(recipe.alkali_purity);

// 固形せっけん固定
    const result = calc_soda(sap_values, amounts, discount, alkali_rate);
    return result;
};

const calc_water = (recipe, total, alkali) => {
    const water = Math.round(total * Number(recipe.water_ratio) * 10) / 10;
    return water;
};

const get_oil_names = (recipe, amounts) => {
    let oil_names = [];
    for(let i = 0; i < recipe.oils.length; i++){
        oil_names.push("・ " + recipe.oils[i].name + " " + amounts[i] + "g");
    }
    while(oil_names.length < 10){
        oil_names.push("・  0g");
    }

    return oil_names;
};

const get_features = (recipe) => {
    let skin = 0;
    let clean = 0;
    let foam = 0;
    let hard = 0;
    let collapse = 0;
    let stability = 0;

    for(let i = 0; i < recipe.oils.length; i++){
        const oil_name = recipe.oils[i].name;
        const oil_data = Object.values(window.OilArray).find(oil => oil.name == oil_name);
        if(oil_data) {
            skin      += Number(oil_data.skin)      * (Number(recipe.oils[i].percentage) / 100);
            clean     += Number(oil_data.clean)     * (Number(recipe.oils[i].percentage) / 100);
            foam      += Number(oil_data.foam)      * (Number(recipe.oils[i].percentage) / 100);
            hard      += Number(oil_data.hard)      * (Number(recipe.oils[i].percentage) / 100);
            collapse  += Number(oil_data.collapse)  * (Number(recipe.oils[i].percentage) / 100);
            stability += Number(oil_data.stability) * (Number(recipe.oils[i].percentage) / 100);
        }
    }

    skin      = Math.round(skin * 10) / 10;
    clean     = Math.round(clean * 10) / 10;
    foam      = Math.round(foam * 10) / 10;
    hard      = Math.round(hard * 10) / 10;
    collapse  = Math.round(collapse * 10) / 10;
    stability = Math.round(stability * 10) / 10;

    if(Number.isNaN(skin) == true){
        skin = 0;
        clean = 0;
        foam = 0;
        hard = 0;
        collapse = 0;
        stability = 0;
    }

    const skText = "・ 肌適性: " + skin;
    const clText = "・ 洗浄力: " + clean;
    const foText = "・ 起泡力: " + foam;
    const haText = "・ 硬さ: " + hard;
    const coText = "・ 崩れにくさ: " + collapse;
    const stText = "・ 安定性: " + stability;
    return [skText, clText, foText, haText, coText, stText];
};

const calc_result = (recipe, total) => {
    let sap_values = [];
    let amounts = [];
    for(let i = 0; i < recipe.oils.length; i++){
        const oil_name = recipe.oils[i].name;
        const oil_data = Object.values(window.OilArray).find(oil => oil.name == oil_name);

        if(oil_data) {
            sap_values.push(oil_data.sap_value_potash);
        
            const amount = total * (Number(recipe.oils[i].percentage) / 100);
            amounts.push(amount);
        } else {
            alert("エラー: データが見つかりません");
            return;
            window.location.reload();
        }
    }

    const alkali = calc_alkali(recipe, sap_values, amounts); // 固形せっけん
    const water = calc_water(recipe, total, alkali);
    const name = recipe.category;
    const type = "soda";
    const oil_names = get_oil_names(recipe, amounts);
    const features = get_features(recipe);
    const memo = recipe.description;

    sessionStorage.clear();
    sessionStorage.setItem("scene", "result");
    sessionStorage.setItem("name", name.toString());
    sessionStorage.setItem("type", type.toString());
    sessionStorage.setItem("alkali", "★アルカリ: " + alkali + "g");
    sessionStorage.setItem("oilAmountSum", "★油脂の合計量: " + total + "g");
    sessionStorage.setItem("oilNames", oil_names.toString());
    sessionStorage.setItem("waterAmount", "★水の量: " + water + "g");
    sessionStorage.setItem("additionalInfos", features.toString());
    sessionStorage.setItem("memo", memo.toString());
    sessionStorage.setItem("img", "");

    location.href = "../html/result.html";
};

const display_recipes = () => {
    const recipe_container = document.getElementById("recipe-container");

    Object.values(recipes).forEach((recipe) => {
        const button = document.createElement("input");
        button.type = "button";
        button.value = recipe.category;
        button.classList.add("button");
        button.addEventListener("click", () => {
            cover.style.display = "block";
            input_form_container.style.display = "block";

            input_form_button.addEventListener("click", () => {
                const total = Number(input_form.value) || 500;
                calc_result(recipe, total);
            });
        });

        recipe_container.appendChild(button);
    });
};

window.onload = () => {
    input_form_container = document.getElementById("input_form-container");
    input_form = document.getElementById("input_form");
    input_form_button = document.getElementById("input_form_button");
    cover = document.getElementById("cover");
    cover.addEventListener("click", () => {
        cover.style.display = "none";
        input_form_container.style.display = "none";
    });

    display_recipes();
};

$(function() {
    $('.hamburger').click(function() {
        $('.menu').toggleClass('open');

        $(this).toggleClass('active');
    });
});