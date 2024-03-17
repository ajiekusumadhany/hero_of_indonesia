$(document).ready(function () {
  // menggunakan ajax
  $.ajax({
    url: "https://indonesia-public-static-api.vercel.app/api/heroes",
    method: "GET",
    success: function (res) {
      console.log(res);
      // menggunakan variabel
      var data = res;
      data.forEach(function (hero, index) {
        // menggunakan jQuery + Dom
        $("#daftarHero").append(
          "<div class='namaHero' id=" +
            index +
            ">" +
            "<p>" +
            hero.name +
            "</p>" +
            "</div>"
        );
        // menggunakan jQuery Event
        $(".namaHero").click(function () {
          deskripsiHero($(this).text(), data[this.id].description);
        });

        // menggunakan fungsi
        function deskripsiHero(nama, deskripsi) {
          swal({
            title: nama,
            text: deskripsi,
          });
        }
      });
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });

  $(".hasilPencarian").hide();
  $("button").click(function () {
    // menggunakan kondisi
    if ($("input").val().length == 0) {
      return swal(
        "",
        "Mohon masukkan nama pahlawan terlebih dahulu",
        "warning"
      );
    } else {
      $(".hasilPencarian").show();
      var pahlawanName = $("input").val().toLowerCase();
      swal({
        title: "",
        text: "Mencari data . . .",
        icon: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
        button: false,
      });
    }
    $.ajax({
      url: "https://indonesia-public-static-api.vercel.app/api/heroes",
      method: "GET",
      data: { name: pahlawanName },
      success: function (res) {
        console.log(res);
        if (res.length == 0) {
          return swal(
            "Data tidak ditemukan",
            "Pastikan nama pahlawan yang dituliskan benar",
            "warning"
          );
        } else {
          var data = res[0];
          $("#nmHero").text("Nama: " + data.name);
          $("#lahirHero").text("Lahir: " + data.birth_year);
          $("#wafatHero").text("Wafat: " + data.death_year);
          $("#desHero").text("Deskripsi: " + data.description);
          swal.close();
        }
      },
      error: function (xhr, status, error) {
        console.log(error);
        swal("Terjadi kesalahan", "Gagal memuat data pahlawan", "error");
      },
    });
  });
});
