window.addEventListener('DOMContentLoaded', () => {
  const btnAbsensi = document.querySelector('.frame-c');
  const btnProposal = document.querySelector('.frame-e');
  const btnLaporanMingguan = document.querySelector('.frame-10');
  const btnLaporanAkhir = document.querySelector('.frame-13');
  const btnLuaran = document.querySelector('.frame-16');
  const btnGmaps = document.getElementById('btnGmaps');
  const alamat = document.getElementById('alamat'); 
  const trigger = document.getElementById('popup-trigger');
  const popup = document.getElementById('photo-popup');
  const uploadInputs = document.querySelectorAll('.gallery-upload');
  console.log('Script loaded');
console.log('Upload inputs found:', document.querySelectorAll('.gallery-upload').length);
  if (btnAbsensi) {
    btnAbsensi.addEventListener('click', () => {
      window.location.href = 'absensi.html';
    });
  }

  if (btnProposal) {
    btnProposal.addEventListener('click', () => {
      window.location.href = 'ProposalKegiatan.html';
    });
  }

  if (btnLaporanMingguan) {
    btnLaporanMingguan.addEventListener('click', () => {
      window.location.href = 'LaporanMingguan.html';
    });
  }

  if (btnLaporanAkhir) {
    btnLaporanAkhir.addEventListener('click', () => {
      window.location.href = 'LaporanAkhir.html';
    });
  }

  if (btnLuaran) {
    btnLuaran.addEventListener('click', () => {
      window.location.href = 'luaran.html';
    });
  }

  if (btnGmaps) {
    btnGmaps.addEventListener('click', () => {
      const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(alamat.textContent)}`;
      window.open(gmapsUrl, '_blank');
    });
  }
   trigger.addEventListener('click', () => {
    popup.style.display = 'flex';
  });
 if (uploadInputs) {
    uploadInputs.forEach(input => {
      input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        const targetId = this.getAttribute('data-target');
        const targetImg = document.getElementById(targetId);
        
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          
          reader.onload = function(evt) {
            targetImg.src = evt.target.result;
            
            try {
              localStorage.setItem(targetId, evt.target.result);
              alert('Foto berhasil diupload!'); // Notifikasi
              console.log('Foto disimpan:', targetId); // Debug
            } catch (e) {
              console.error('Gagal menyimpan ke localStorage:', e);
              alert('Gagal menyimpan foto. Storage mungkin penuh.');
            }
          };
          
          reader.readAsDataURL(file);
        } else {
          alert('Harap pilih file gambar yang valid.');
        }
      });
    });
  } else {
    console.error('Element upload tidak ditemukan');
  }

  // Load saved images
  for (let i = 1; i <= 4; i++) {
    const imgId = `gallery-img-${i}`;
    try {
      const savedImg = localStorage.getItem(imgId);
      if (savedImg) {
        const imgElement = document.getElementById(imgId);
        if (imgElement) {
          imgElement.src = savedImg;
        }
      }
    } catch (e) {
      console.error('Gagal memuat gambar:', e);
    }
  }
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const targetId = e.target.getAttribute('data-target');
    const targetImg = document.getElementById(targetId);
    
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = function(evt) {
        // Update gambar langsung
        targetImg.src = evt.target.result;
        
        // Simpan ke localStorage
        try {
          localStorage.setItem(targetId, evt.target.result);
          showUploadSuccess(targetImg.parentElement);
        } catch (e) {
          console.error('Gagal menyimpan ke localStorage:', e);
          showUploadError(targetImg.parentElement, 'Gagal menyimpan foto. Storage mungkin penuh.');
        }
      };
      
      reader.readAsDataURL(file);
    } else {
      showUploadError(e.target.parentElement, 'Harap pilih file gambar yang valid.');
    }
  };

  // Fungsi untuk menampilkan notifikasi sukses
  const showUploadSuccess = (container) => {
    const successMsg = document.createElement('div');
    successMsg.className = 'upload-notification success';
    successMsg.textContent = 'Upload berhasil!';
    container.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 2000);
  };

  // Fungsi untuk menampilkan notifikasi error
  const showUploadError = (container, message) => {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'upload-notification error';
    errorMsg.textContent = message;
    container.appendChild(errorMsg);
    
    setTimeout(() => {
      errorMsg.remove();
    }, 2000);
  };

  // Tambahkan event listener untuk semua input upload
  document.querySelectorAll('.gallery-upload').forEach(input => {
    input.addEventListener('change', handleImageUpload);
  });

  // Load saved images dari localStorage
  for (let i = 1; i <= 4; i++) {
    const imgId = `gallery-img-${i}`;
    try {
      const savedImg = localStorage.getItem(imgId);
      if (savedImg) {
        const imgElement = document.getElementById(imgId);
        if (imgElement) {
          imgElement.src = savedImg;
        }
      }
    } catch (e) {
      console.error('Gagal memuat gambar:', e);
    }
  }
});
