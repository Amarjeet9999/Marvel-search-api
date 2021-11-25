function debouncer(func, delay) {
  let debounce;
  return function () {
    debounce && clearTimeout(debounce);
    debounce = setTimeout(() => func.apply(this, arguments), delay);
  };
}

var btn = document.getElementById("query");
btn.addEventListener("input", debouncer(searchResults, 100));

async function searchResults() {
  try {
    await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${btn.value}&ts=1&orderBy=name&limit=10&apikey=01b3b629464107fc093ef7608214cb20&hash=f29c8df07d6487c83aa556b6dbeaa751 `
    )
      .then((res) => res.json())
      .then((res) => {
        appendData(res?.data?.results);
      });
  } catch (err) {
    console.log("Error", err);
  }
}

const searchSuggestions = document.getElementById("searchSuggestions");

const appendData = (data) => {
  searchSuggestions.innerHTML = null;
  let searchDiv = document.getElementById("searchDiv");
  if (data) {
    searchDiv.style.borderRadius = "15px 15px 0 0";
  } else {
    searchDiv.style.borderRadius = "15px";
  }

  data &&
    data.forEach((el) => {
      let suggestions = document.createElement("div");
      suggestions.setAttribute("class", "suggestions");
      let first = document.createElement("div");
      let name = document.createElement("p");
      name.setAttribute("class", "name");
      name.innerHTML = el.name;
      first.append(name);
      let second = document.createElement("div");
      let gender = document.createElement("p");
      gender.setAttribute("class", "gender");
      // gender.innerHTML = el.appearance.gender;
      second.append(gender);
      suggestions.append(first, second);
      suggestions.addEventListener("click", () => {
        localStorage.setItem("hero", JSON.stringify(el));
        window.location.href = "./detailsPage.html";
        btn.value = "";
      });
      searchSuggestions.append(suggestions);
    });
};
