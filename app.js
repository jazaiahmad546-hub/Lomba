// Navigasi antar halaman
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Kalender sederhana Februari 2026
const calendarBody = document.getElementById('calendar-body');
let day = 1;
for (let i = 0; i < 4; i++) {
  let row = "<tr>";
  for (let j = 0; j < 7; j++) {
    if (day <= 28) {
      row += `<td onclick="selectDate(${day})">${day}</td>`;
      day++;
    } else {
      row += "<td></td>";
    }
  }
  row += "</tr>";
  calendarBody.innerHTML += row;
}

let selectedDate = null;
let selectedMood = "";
const moodData = {};

// Pilih tanggal
function selectDate(d) {
  selectedDate = d;
  alert("Tanggal dipilih: " + d);

  // Jika ada data tersimpan, tampilkan kembali
  if (moodData[d]) {
    selectedMood = moodData[d].mood;
    document.getElementById('reason').value = moodData[d].reason;
  } else {
    selectedMood = "";
    document.getElementById('reason').value = "";
  }
}

// Pilih mood
function selectMood(m) {
  selectedMood = m;
  alert("Mood dipilih: " + m);
}

// Simpan mood
function saveMood() {
  if (!selectedDate) {
    alert("Pilih tanggal dulu!");
    return;
  }
  const reason = document.getElementById('reason').value;
  moodData[selectedDate] = { mood: selectedMood, reason: reason };
  alert("Data tersimpan untuk tanggal " + selectedDate + ": " + selectedMood + " - " + reason);
  updateChart();
}

// Update grafik mood
function updateChart() {
  const chart = document.getElementById('chart');
  chart.innerHTML = "";
  Object.keys(moodData).forEach(d => {
    let height = 50;
    if (moodData[d].mood === "Senang") height = 120;
    else if (moodData[d].mood === "Biasa") height = 80;
    else if (moodData[d].mood === "Sedih") height = 40;

    chart.innerHTML += `<div class="bar" style="height:${height}px;" title="Tanggal ${d}: ${moodData[d].reason}"></div>`;
  });
}

// Ganti akun
function changeAccount() {
  const newName = document.getElementById('newName').value;
  const newEmail = document.getElementById('newEmail').value;

  if (newName) document.getElementById('username').innerText = "Nama pengguna: " + newName;
  if (newEmail) document.getElementById('useremail').innerText = "Email: " + newEmail;

  alert("Akun berhasil diganti!");
}