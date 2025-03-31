let currency = parseInt(localStorage.getItem('currency')) || 0;  // Mata uang dalam bentuk Credits
let ggGems = parseInt(localStorage.getItem('ggGems')) || 0;  // GG GAME GEMS
let grassCount = parseInt(localStorage.getItem('grassCount')) || 0;  // Jumlah grass
let grassGrowthRate = 0.01;  // Pertumbuhan rumput per detik
let grassGrowthTime = 5;  // Waktu dalam detik untuk tumbuh

// Memperbarui tampilan
function updateDisplay() {
  document.getElementById('currency').textContent = `Currency: ${currency} Credits`;
  document.getElementById('grassCount').textContent = `Grass: ${grassCount}`;
  document.getElementById('timer').textContent = `Next Grass Growth: ${grassGrowthTime}s`;
  document.getElementById('ggGems').textContent = `GG GAME GEMS: ${ggGems}`; // Menampilkan GG GAME GEMS
}

// Fungsi untuk menumbuhkan rumput
function growGrass() {
  setInterval(() => {
    if (grassGrowthTime > 0) {
      grassGrowthTime--;
      updateDisplay();
    } else {
      if (grassCount >= 1000) {
        grassGrowthRate = 0.5; // Jika mencapai 1000, tumbuh lebih cepat
      } else if (grassCount >= 200) {
        grassGrowthRate = 0.1; // Jika mencapai 200, tumbuh lebih cepat
      }
      grassCount += grassGrowthRate; // Menambah rumput berdasarkan growth rate
      grassGrowthTime = 5; // Reset timer setelah tumbuh
      updateDisplay();
    }
  }, 1000);
}

// Fungsi untuk membeli rumput
function buyItem(item, price) {
  if (currency >= price) {
    currency -= price;
    grassCount++;
    localStorage.setItem('currency', currency);
    localStorage.setItem('grassCount', grassCount);
    alert(`You bought 1 ${item} for ${price} credits.`);
    updateDisplay();
  } else {
    alert('Not enough credits to buy.');
  }
}

// Fungsi untuk menjual rumput
function sellItem(item, price) {
  if (grassCount > 0) {
    currency += price;
    grassCount--;
    localStorage.setItem('currency', currency);
    localStorage.setItem('grassCount', grassCount);
    alert(`You sold 1 ${item} for ${price} credits.`);
    updateDisplay();
  } else {
    alert('You have no grass to sell.');
  }
}

// Fungsi untuk menukar Credits menjadi GG GAME GEMS
function convertCreditsToGG() {
  const conversionRate = 2000;  // 2000 Credits = 1 GG GAME GEMS
  if (currency >= conversionRate) {
    const ggGemsToConvert = Math.floor(currency / conversionRate); // Hitung berapa GG yang bisa ditukar
    currency -= ggGemsToConvert * conversionRate; // Kurangi Credits yang digunakan untuk konversi
    ggGems += ggGemsToConvert; // Tambah GG GAME GEMS yang diterima
    localStorage.setItem('currency', currency);
    localStorage.setItem('ggGems', ggGems);
    alert(`You converted ${ggGemsToConvert} GG GAME GEMS!`);
    updateDisplay();
  } else {
    alert('Not enough credits to convert to GG GAME GEMS.');
  }
}

// Fungsi untuk menambahkan grass (Admin only)
function adminAddGrass() {
  const adminPassword = "admin123"; // Kata sandi admin
  const enteredPassword = prompt("Please enter the admin password to add grass:");

  if (enteredPassword === adminPassword) {
    const amountToAdd = 500;  // Jumlah grass yang ingin ditambahkan
    grassCount += amountToAdd;
    localStorage.setItem('grassCount', grassCount);
    alert(`${amountToAdd} grass has been added!`);
    updateDisplay();
  } else {
    alert('Incorrect password! You are not authorized to add grass.');
  }
}

// Mulai menumbuhkan rumput saat halaman dimuat
growGrass();

// Memperbarui tampilan awal
updateDisplay();
