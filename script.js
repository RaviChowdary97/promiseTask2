var key =
  "live_r0NUVGhxyZlmxtVCrogKx0NBKINxrqzRBtbBE5OIVR8HTVUMVJLKN59xZFXjErSM";
const pro = new Promise((resolve, reject) => {
  async function api() {
    try {
      const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=50&api_key=${key}`
      );
      if (res.status === 200) {
        const data = await res.json();
        resolve(data);
      } else {
        reject("Failed to fetch data: " + res.status);
      }
    } catch (error) {
      reject("Network error or other issue: " + error.message);
    }
  }
  api();
});

pro
  .then((data) => {
    const container = document.getElementById("cat-container");
    data.forEach((cat) => {
      const catImgDiv = document.createElement("div");
      catImgDiv.classList.add("col-sm-6", "col-md-4", "mb-3");
      catImgDiv.innerHTML = `
      <div class="card">
        <img src="${cat.url}" class="card-img-top" alt="Cute cat">
      </div>
    `;
      container.appendChild(catImgDiv);
    });
  })
  .catch((error) => {
    console.error(error);
    const container = document.getElementById("cat-container");
    container.innerHTML = `<p class="text-danger">${error}</p>`;
  });
