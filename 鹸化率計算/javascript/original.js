let count;
let add_button, remove_button;

const oilRecommendations = {
    "特徴を選択": ["オイル1", "オイル2", "オイル3"],
    "洗浄力高め": ["ココナッツ油", "パーム核油", "グレープシード油"],
    "泡立ち豊か": ["ひまし油", "パーム核油", "ココナッツ油"],
    "保湿力高め": ["アボカド油", "シアバター", "ｽｲｰﾄｱｰﾓﾝﾄﾞｵｲﾙ"],
    "硬め": ["牛脂", "パーム油", "シアバター"],
    "低刺激": ["ホホバオイル", "ローズヒップオイル", "ひまわり油"],
    "酸化しづらい": ["ホホバオイル", "ラード(豚油)", "ローズヒップオイル"],
    "和風美容": ["椿油", "米ぬか油", "ホホバオイル"],
    "マイルドな洗浄力": ["オリーブ油", "アボカド油", "ｽｲｰﾄｱｰﾓﾝﾄﾞｵｲﾙ"],
    "さっぱりした洗いあがり": ["グレープシード油", "ヒマワリ油", "ライスブランオイル"],
    "べたつかない": ["ホホバオイル", "ライスブランオイル", "ｽｲｰﾄｱｰﾓﾝﾄﾞｵｲﾙ"]
};

const optionSuggestions = {
    "洗浄力高め": [
        { name: "クレイ", amount: 5, purpose: "洗浄力UP" },
        { name: "炭パウダー", amount: 3, purpose: "毛穴ケア" },
        { name: "ビール", amount: 20, purpose: "泡立ち改善" }
    ],
    "泡立ち豊か": [
        { name: "ひまし油", amount: 10, purpose: "泡持ちUP" },
        { name: "ハチミツ", amount: 5, purpose: "泡のクリーミーさUP" },
        { name: "卵白", amount: 30, purpose: "泡立ちUP" }
    ],
    "保湿力高め": [
        { name: "シルクパウダー", amount: 3, purpose: "肌の滑らかさUP" },
        { name: "アボカドバター", amount: 10, purpose: "保湿力UP" },
        { name: "ヨーグルト", amount: 15, purpose: "肌の柔らかさUP" }
    ],
    "硬め": [
        { name: "カカオバター", amount: 10, purpose: "石鹸の硬さUP" },
        { name: "塩", amount: 5, purpose: "固さ＋泡立ちUP" },
        { name: "シアバター", amount: 8, purpose: "保湿＋硬さUP" }
    ],
    "低刺激": [
        { name: "オートミール", amount: 10, purpose: "肌荒れ防止" },
        { name: "カレンデュラオイル", amount: 5, purpose: "肌の鎮静化" },
        { name: "アロエエキス", amount: 7, purpose: "肌を落ち着かせる" }
    ],
    "酸化しづらい": [
        { name: "ビタミンE", amount: 2, purpose: "酸化防止" },
        { name: "ローズマリーエキス", amount: 3, purpose: "抗酸化作用" },
        { name: "ホホバオイル", amount: 10, purpose: "酸化しづらいオイル" }
    ],
    "和風美容": [
        { name: "米ぬかパウダー", amount: 5, purpose: "美白・保湿" },
        { name: "緑茶エキス", amount: 3, purpose: "抗酸化作用" },
        { name: "椿油", amount: 8, purpose: "和風保湿オイル" }
    ],
    "マイルドな洗浄力": [
        { name: "ミルク", amount: 20, purpose: "肌に優しい洗浄" },
        { name: "はちみつ", amount: 5, purpose: "保湿＋抗菌" },
        { name: "ヨーグルト", amount: 15, purpose: "肌を柔らかくする" }
    ],
    "さっぱりした洗いあがり": [
        { name: "竹炭", amount: 3, purpose: "皮脂吸着" },
        { name: "レモン果汁", amount: 5, purpose: "肌の引き締め" },
        { name: "メントール", amount: 2, purpose: "清涼感UP" }
    ],
    "べたつかない": [
        { name: "コーンスターチ", amount: 5, purpose: "肌さらさら効果" },
        { name: "シルクパウダー", amount: 3, purpose: "肌の滑らかさUP" },
        { name: "ライスブランエキス", amount: 5, purpose: "軽い保湿＋べたつき防止" }
    ]
};

const ratioArray = {
    1: [1.0],
    2: [0.6, 0.4],
    3: [0.5, 0.3, 0.2],
};

const calc_soda = (oils, total, ratios, discount, alkali_rate) => {
    let alkali = 0;

    oils.forEach((oil, i) => {
        let sap_value = Object.values(window.OilArray).find(oil => oil.name == oils[i]).sap_value_potash;
        const amount = ratios[i] * total;
        alkali += Math.floor(sap_value / 56.1 * 400) / 10000 * amount;
    });

    const result = Math.round(alkali * discount / alkali_rate * 10) / 10;
    return result;
};

const calc_alkali = (oils, total, ratios) => {
    let discount = Number(document.getElementById("sap_ratio_val").value);
    if(!discount || discount <= 0) {
        alert("鹸化率を正しく入力して下さい");
        return;
    } else {
        discount *= 0.01;
    }
    let alkali_rate = Number(document.getElementById("alkali_ratio_val").value);
    if(!alkali_rate || alkali_rate <= 0) {
        alert("アルカリの純度を正しく入力して下さい");
        return;
    } else {
        alkali_rate *= 0.01;
    }

    // 固形せっけん固定
    const alkali = calc_soda(oils, total, ratios, discount, alkali_rate);

    return alkali;
};

const calc_result = () => {
    const name = document.getElementById("recipe_name").value;

    let oils = [];
    for(let i = 0; i < count; i++){
        const select = document.getElementById(`select${i+1}`);
        if(select.value == "特徴を選択") {
            alert("オイルを選択してください");
            return;
        }
        const radios = document.getElementsByName(`feature${i+1}_oils`);
        for(let radio of radios) {
            if(radio.checked) {
                oils.push(radio.value);
            }
        }
    }
    const total = Number(document.getElementById("oil_sum_val").value);
    if(!total || total <= 0) {
        alert("油脂の合計量を正しく入力して下さい");
        return;
    }
    const ratios = ratioArray[count];

    const alkali = calc_alkali(oils, total, ratios);

};

const suggestOptions = (features) => {
    let recommendedOptions = new Set();

    features.forEach(feature => {
        if(optionSuggestions[feature]) {
            optionSuggestions[feature].forEach(option => recommendedOptions.add(option));
        }
    });

    let shuffled = Array.from(recommendedOptions).sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 3);
};

const display_options = () => {
    let features = [];
    for(let i = 0; i < count; i++){
        const select = document.getElementById(`select${i+1}`);
        if(select.value == "特徴を選択") {
            alert("特徴を選択してください");
            return;
        } else {
            features.push(select.value);
        }
    }

    const suggested = suggestOptions(features);

    const options_container = document.getElementById("options-container");
    options_container.innerHTML = "";
    suggested.forEach(option => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option.name;
        checkbox.name = "options";
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(`${option.name} ${option.amount}g (${option.purpose})`));
        options_container.appendChild(label);
    });
};

const add_feature = () => {
    count++;
    const container = document.createElement("div");
    container.id = `characteristic-container${count}`;
    container.classList.add("characteristic-containers");
    const label = document.createElement("p");
    label.classList.add("select_labels");
    label.textContent = `・${count}番目に重視する特徴`;
    const select = document.createElement("select");
    select.name = `select${count}`;
    select.id = `select${count}`;
    select.classList.add("characteristic_selects");
    Object.keys(oilRecommendations).forEach(feature => {
        const option = document.createElement("option");
        option.value = feature;
        option.textContent = feature;
        select.appendChild(option);
    });
    container.appendChild(label);
    container.appendChild(select);
    for(let i = 1; i <= 3; i++){
        const oil_label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `feature${count}_oils`;
        input.value = `オイル${i}`;
        input.id = `feature${count}_${i}`;
        input.classList.add("oils");
        input.disabled = true;
        oil_label.appendChild(input);
        oil_label.appendChild(document.createTextNode(`オイル${i}`));
        container.appendChild(oil_label);
    }
    document.getElementById("oil-container").append(container);

    handleEvent(count);
};

const remove_feature = () => {
    const element = document.getElementById(`characteristic-container${count}`);
    if(element) {
        element.parentNode.removeChild(element);
    }
    count--;
};

const handleEvent = (index) => {
    const select_text = document.getElementById(`select${index}`);
    select_text.addEventListener("change", () => {
        const selectedValue = select_text.value;
        const oils = oilRecommendations[selectedValue];

        for(let i = 0; i < 3; i++){
            const radio = document.getElementById(`feature${index}_${i+1}`);
            if(i == 0) radio.checked = true;
            radio.disabled = false;
            radio.value = oils[i];
            if(radio.nextSibling) {
                radio.nextSibling.textContent = oils[i];
            }
        }
    });
};

onload = () => {
    sessionStorage.removeItem("prev_name");

    count = 1;
    handleEvent(1);

    add_button = document.getElementById("add_button");
    add_button.addEventListener("click", () => {
        if(count < 3) {
            add_feature();
            remove_button.disabled = false;
            if(count == 3) add_button.disabled = true;
        }
    });
    remove_button = document.getElementById("remove_button");
    remove_button.addEventListener("click", () => {
        if(count > 1) {
            remove_feature();
            add_button.disabled = false;
            if(count == 1) remove_button.disabled = true;
        }
    });
};

$(function() {
    $('.hamburger').click(function() {
        $('.menu').toggleClass('open');

        $(this).toggleClass('active');
    });
});