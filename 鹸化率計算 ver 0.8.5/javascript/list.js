let preserved_recipes = [];        // 保存したレシピの配列
let request;
let db;

// 保存したレシピ一覧をボタンで表示
const display_list = () => {
    if(!db) {
        alert("IndexedDBが使えません");
        return;
    }

    const transaction = db.transaction("recipes", "readonly");
    const store = transaction.objectStore("recipes");
    const request = store.getAll();

    request.onsuccess = function(e) {
        preserved_recipes = e.target.result;
        preserved_recipes.sort((a, b) => b.id - a.id);
        preserved_recipes.forEach((recipe) => display_buttons(recipe.id));
    };

    request.onerror = function() {
        alert("レシピの取得に失敗しました");
        return;
    }
};

// 保存したレシピの表示
function display_pres(id){
    // sessionStorageで保存、resultのページで表示
    sessionStorage.clear();

    sessionStorage.setItem("scene", "preserve");

    sessionStorage.setItem("id", id);

    const recipe = preserved_recipes.find(recipe => recipe.id == id);
    if(!recipe) {
        alert("レシピが見つかりません");
        return;
    }

    sessionStorage.setItem("name", recipe.recipe_name);

    sessionStorage.setItem("type", recipe.type == "★タイプ: 固形せっけん" ? "soda" : "potash");

    sessionStorage.setItem("alkali", recipe.alkali);

    sessionStorage.setItem("oilAmountSum", recipe.oil_amount_sum);

    const oil_names = [recipe.oil1, recipe.oil2, recipe.oil3, recipe.oil4, recipe.oil5, recipe.oil6, recipe.oil7, recipe.oil8, recipe.oil9, recipe.oil10];
    sessionStorage.setItem("oilNames", oil_names.toString());

    sessionStorage.setItem("waterAmount", recipe.water_amount);

    sessionStorage.setItem("alcoholAmount", recipe.alcohol);

    const additional_infos = [recipe.skin, 
                              recipe.clean, 
                              recipe.foam, 
                              recipe.hard, 
                              recipe.collapse,
                              recipe.stability];
    sessionStorage.setItem("additionalInfos", additional_infos.toString());

    sessionStorage.setItem("memo", recipe.memo.toString());

    location.href = "../html/result.html";
};

// 保存したレシピを削除
function remove_pres(id){
    if(!db) {
        alert("IndexedDBが利用できません");
        return;
    }

    const transaction = db.transaction(["recipes", "images"], "readwrite");
    const recipeStore = transaction.objectStore("recipes");
    const imageStore = transaction.objectStore("images");

    const deleteRecipeRequest = recipeStore.delete(id);
    deleteRecipeRequest.onsuccess = function() {
        const deleteImageRequest = imageStore.delete(id);
        deleteImageRequest.onsuccess = function() {
            alert("レシピを削除しました");
            window.location.reload();
        };
    };

    deleteRecipeRequest.onerror = function() {
        alert("レシピの削除に失敗しました");
    };
};

// ボタンを生成＆表示
const display_buttons = (id) => {
    const recipe = preserved_recipes.find(r => r.id == id);
    if(!recipe) return;

    // レシピ表示＆削除用のボタンのwrapper
    const button_wrapper = document.createElement("div");
    const index = preserved_recipes.indexOf(recipe);
    button_wrapper.style.display = "flex";
    button_wrapper.style.position = "absolute";
    button_wrapper.style.top = `${index * 54}px`;
    button_wrapper.style.left = "50%";
    button_wrapper.style.transform = "translateX(-50%)";
    button_wrapper.style.width = "280px";
    button_wrapper.style.height = "50px";

    // レシピを表示するボタン生成
    const button = document.createElement("input");
    button.type = "button";
    button.value = recipe.recipe_name;
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.width = "300px";
    button.style.height = "50px";
    button.style.fontSize = "26px";
    button.style.backgroundColor = "rgb(252, 252, 252)";
    button.style.border = "none";
    button.addEventListener('mousedown', () => display_pres(recipe.id));

    // レシピ削除用のボタン生成
    const remove_button = document.createElement("input");
    remove_button.type = "button";
    remove_button.value = "🗑";
    remove_button.style.display = "flex";
    remove_button.style.fontSize = "26px";
    remove_button.style.width = "50px";
    remove_button.style.height = "50px";
    remove_button.style.backgroundColor = "rgb(252, 252, 252)";
    remove_button.style.border = "none";
    remove_button.addEventListener('mousedown', () => remove_pres(recipe.id));

    // ボタンを表示
    button_wrapper.appendChild(button);
    button_wrapper.appendChild(remove_button);
    const list_container = document.getElementById("list-container");
    list_container.appendChild(button_wrapper);
};

// ハンバーガーメニューの実装
$(function() {
    $('.hamburger').click(function() {
        $('.menu').toggleClass('open');

        $(this).toggleClass('active');
    });
});

window.onload = () => {
    request = indexedDB.open("SoapRecipeDB", 2);

    request.onupgradeneeded = function(e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains("recipes")) {
            db.createObjectStore("recipes", { keyPath: "id", autoIncrement: true });
        }
        if (!db.objectStoreNames.contains("images")) {
            db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = function(e) {
        db = e.target.result;
        display_list();
    };
};