const oil_infos = {
    oil1: {
        name: "アボカド油",
        description: "栄養価が高く、優れた保湿力を持つ植物オイル。肌を柔らかくし、しっとりとした仕上がりをもたらすため乾燥肌向けの石けん作りに適している。また、ビタミンや抗酸化成分を豊富に含み、肌の保護やケアにも役立つ。",
        usage: ["乾燥肌向け", "保湿効果"],
    },
    oil2: {
        name: "牛脂",
        description: "せっけんの硬さを強化し、持続する泡を作る動物性オイル。洗浄力はやや穏やかで泡の安定性が高く、昔ながらのせっけん作りに適している。",
        usage: ["泡立ち補助", "硬さ向上"],
    },
    oil3: {
        name: "くるみ油",
        description: "泡立ちをやさしく補助しながら、肌に適度な潤いを与えるオイル。軽い質感でなじみがよく、洗い上がりのしっとり感を高める。",
        usage: ["保湿効果", "泡立ち補助"],
    },
    oil4: {
        name: "グレープシード油",
        description: "軽い質感で肌に素早くなじみ、さっぱりとした洗い上がりを提供するオイル。泡立ちを補助しながら、ほどよい保湿効果も期待できる",
        usage: ["さっぱり仕上げ", "泡立ち補助"],
    },
    oil5: {
        name: "ココアバター",
        description: "高い保湿力と滑らかな質感を持ち、乾燥肌向けのせっけんに適する。固形のままでも使いやすく、クリーミーな泡立ちを提供する。",
        usage: ["保湿効果", "泡質向上"],
    },
    oil6: {
        name: "ココナッツ油",
        description: "泡立ちが非常に良く、洗浄力が強いオイル。せっけんを硬くし、さっぱりとした仕上がりに。",
        usage: ["泡立ち強化", "洗浄力向上"],
    },
    oil7: {
        name: "米ぬか油",
        description: "栄養価が高く、穏やかな泡立ちと保湿力を持つオイル。肌をしっとりと整える。",
        usage: ["保湿効果", "肌保護"]
    },
    oil8: {
        name: "シアバター",
        description: "高い保湿力を持ち、乾燥肌向けのせっけんに最適なオイル。肌を柔らかく整え、クリーミーな泡を生み出し、使用感をなめらかにする。",
        usage: ["保湿効果", "肌保護"]
    },
    oil9: {
        name: "ｽｲｰﾄｱｰﾓﾝﾄﾞｵｲﾙ",
        description: "肌への浸透性が高く、敏感肌や乾燥肌に優しいオイル。穏やかな泡立ちとしっとりした洗い上がりを提供する。",
        usage: ["保湿効果", "敏感肌向け"]
    },
    oil10: {
        name: "椿油",
        description: "日本の伝統的な美容オイルで、保湿力が高く、肌をしっとり整える。軽い泡立ちと滑らかな洗い心地を提供し、乾燥肌に適している。",
        usage: ["保湿効果", "乾燥肌向け"]
    },
    oil11: {
        name: "パーム油",
        description: "せっけんの硬さを高め、泡立ちを安定させるオイル。洗浄力を強化し、バランスの取れた泡を作る。",
        usage: ["泡立ち補助", "硬さ向上"]
    },
    oil12: {
        name: "パーム核油",
        description: "豊かな泡立ちを生み出し、洗浄力を強化するオイル。せっけんを硬くし、濃密な泡を長持ちさせる特徴を持つ。",
        usage: ["泡立ち強化", "洗浄力向上"]
    },
    oil13: {
        name: "ひまし油",
        description: "泡をクリーミーにし、しっとりとした洗い心地を提供するオイル。保湿力が高く、肌の乾燥を防ぐ効果がある。",
        usage: ["泡質向上", "保湿効果"]
    },
    oil14: {
        name: "ひまわり油",
        description: "軽い質感で肌にやさしく、適度な泡立ちと保湿効果を持つオイル。さっぱりした洗い上がりを提供する。",
        usage: ["保湿効果", "さっぱり仕上げ"]
    },
    oil15: {
        name: "紅花油",
        description: "軽い質感で肌に優しく、さっぱりとした洗い上がりを提供するオイル。泡立ちは控えめだが、保湿力があり、乾燥を防ぐ。",
        usage: ["保湿効果", "さっぱり仕上げ"]
    },
    oil16: {
        name: "ホホバオイル",
        description: "肌なじみが良く、保湿力と安定性に優れるオイル。軽い質感で、乾燥や肌荒れを防ぎながら、なめらかな洗い上がりを提供する。",
        usage: ["保湿効果", "肌保護"]
    },
    oil17: {
        name: "ローズヒップオイル",
        description: "美容効果が高く、肌の再生を促すオイル。保湿力があり、乾燥肌やエイジングケア向けのせっけんに適している。",
        usage: ["保湿効果", "美容ケア"]
    },
};

const display_infos = () => {
    sessionStorage.removeItem("prev_name");

    const oil_infos_container = document.getElementById("oil_infos-container");
    Object.values(oil_infos).forEach(oil => {
        const label = document.createElement("p");
        label.style.marginTop = "25px";
        label.textContent = `★${oil.name}`;
        const description = document.createElement("p");
        description.textContent = oil.description;
        description.classList.add("description");

        oil_infos_container.appendChild(label);
        oil_infos_container.appendChild(description);
    });
};

window.onload = () => {
    display_infos();
};

$(function() {
    $('.hamburger').click(function() {
        $('.menu').toggleClass('open');

        $(this).toggleClass('active');
    });
});