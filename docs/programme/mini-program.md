<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .title-en-box {
        position: absolute;
        left: 0px;
        top: 56px;
        width: 100%;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      }
      .title-en {
        font-family: poiretone_1, poiretone_2, poiretone;
        font-size: 20px;
        line-height: 1;
        letter-spacing: 2px;
        font-weight: bold;
        text-align: center;
        writing-mode: lr-tb;
        color: rgb(0, 0, 0);
        opacity: 1;
        padding: 5px;
        text-indent: 0px;
      }
      .title-cn-box {
        position: absolute;
        left: 1px;
        top: 108px;
        width: 372px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      }
      .title-cn {
        font-family: 微软雅黑;
        font-size: 20px;
        line-height: 1;
        letter-spacing: 2px;
        font-weight: normal;
        text-align: center;
        writing-mode: lr-tb;
        color: rgb(0, 0, 0);
        opacity: 1;
        padding: 5px;
        text-indent: 0px;
      }
      .heart-1 {
        position: absolute;
        left: 10px;
        top: 18px;
        width: 35px;
        height: 35px;
        transform: rotate(0deg);
      }
      .heart-2 {
        position: absolute;
        left: 10px;
        top: 43px;
        width: 35px;
        height: 35px;
        transform: rotate(0deg);
      }
      .heart-3 {
        position: absolute;
        left: 10px;
        top: 68px;
        width: 35px;
        height: 35px;
        transform: rotate(0deg);
      }

      .line-top {
        position: absolute;
        left: 153px;
        top: 181px;
        width: 222px;
        height: 295px;
        transform: rotate(350deg);
      }
      .img-wrap {
        border-radius: 0px;
        border-width: 0px;
        border-style: solid;
        border-color: rgb(153, 153, 153);
      }
      .img-wrap img {
        opacity: 1;
        top: -0.543px;
        width: 222px;
        height: 296.078px;
      }
      .ani-wrap {
        box-shadow: rgb(153, 153, 153) 0px 0px 0px;
        border-radius: 0px;
      }
      .line-circle {
        position: absolute;
        left: 166px;
        top: 190px;
        width: 52px;
        height: 51px;
        transform: rotate(0deg);
        z-index: 1;
      }

      .main-bg {
        position: absolute;
        left: 42px;
        top: 217px;
        width: 296px;
        height: 430px;
        transform: rotate(0deg);
      }

      .circle-1-bg {
        position: absolute;
        left: 42px;
        top: 217px;
        width: 296px;
        height: 430px;
        transform: rotate(0deg);
      }
    </style>
  </head>
  <body>
    <div class="title-en-box">
      <div class="title-en">WEDDING&nbsp;INVITATION</div>
    </div>
    <div class="title-cn-box">
      <div class="title-cn"></div>
    </div>
    <img
      class="heart-1"
      src="data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACc1BMVEUAAACvdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+udE6uc0yuc02udE25h2XMqJDQrpjQrpfDmHuxeFKvdU6vdE66iWjMpo66iGevdVDGnYLw5t///v7////69/XdxbW2gV6yeVXRr5n07Ob+/v7z6uTMp4+xeFP38u7m1MjawK/9+/r7+ffOqpK1gF3r3NPVtqLJooj8+vi9jW3IoYf9/Pv17urx5+DWuKXSsp3hy7zbwbDp2M6xeVTdxLTq2tDizcCvdlDHn4Wze1fgyrzo18y2gV+4hWPp2c/t4Ni9jW7gybr8+/nizsC4hGKye1bJoonv5NzLpo25hWT48/Dgyru7iWnJo4n17un69vTUtaCwd1LAknTLpo6wdlD07Of7+PbPrZawdlHSsZvexre0flr/ds1RAAAAdHRSTlMAAAEJFh0KBiJclb3U376WXiMLWLH7/FsMR/b3EHvw8YEYrPobHrL9/rQRnaJ/hwI95Ok+tUgDJ+FaYnORmJwFCLwErZpujFJXH9iNMuqhLN4taIKJEpf4mRWO8/STDgfdXyvm5y40kMju78o2aZSvsGs3D2is0IsAAAABYktHRIhrZhZaAAAAB3RJTUUH5QoeEigXsQdE7wAAAq9JREFUWMNjYBgFo2AUjFjAyMTMwsrKwsbESL4RjOwcnFzcPLy8PHz8AoLsjOQYxcgoJCzCK1oCBWK8IuISpBvEyC4pIlWCAqRFJNlJM4eRUUZWrgQDyCvIkOQgRkUl5RIsQFlEhQRjGFXV1EuwAg1NQaLNYdTSLsEJdLSINIeRUVcdtzHqevrEmcNoYAjRUVpWVlaOYJZCmEbGRBnDKKEGUV9RWVVdU1sH1F3f0FhV3dQMNcdEhhhzGI0hUd3S2tbe0dHZ1V3a0NPb197RP2HiJLCElCkRxjCaQcK3vHZyBwi0T+meNHUamDl9BsQ92maEzWE0twApbZg5qwMKZs+ZC2X1zasAyVmYE2GMJTiayuYvgBmzcBGM1bEYHOLqVkQYYw12eNmSDixgKSSQbQgaw8hoC4mmZdiMWb4CLGlHMGcx2otAEspKbMasghgjYk/QGAc+SETNxmbM6jVgST4HwsZwQ8Jm7TQsxiyBJGpHwsY4OYNV1q9bj2nKho0NYElnJ4LGMNpAs8Kmzf2ohrRv2QrNYS6ECy9GV2hWbujeth3ZlGk7dkIzVYkbEenGHVbule7avacdbsqivetgpih7EGGMpxesaGko37dsP8SQ6QcOljfAxL08iTCG0RtRRpWWHDoMMuXI0WMVCFFvYsp1Rh9fpMKu4fgEYGlx4mQ9Uv1gQFR54+CHXGhW1J46feYskiklOszEFX/+XsjmlJ07fwzZlIBAIstixiBpJG31uy40IHGlXYmt8RgdgsWQ3YNsikYIwYyAMCc0LBx79aIcEUlKtSkUFY3NlJjYOJIaA4zxlgmYpgQkxpPYNGFkSnJLRjUkJSqVjJYSo35aekamBjRks7Jjc4ioV7AbFJeTm5fvyF3AVVhUTKYhUKMY7R0c7CloQY6CUTAKRsFwBgAUIueWESUewgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0zMFQxMDo0MDoyMyswODowMLbmxQsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMzBUMTA6NDA6MjMrMDg6MDDHu323AAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADQwMHlaadsAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANDAw6qs5hgAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNjM1NTYxNjIzFjsb2wAAAA90RVh0VGh1bWI6OlNpemUAMEJClKI+7AAAAEZ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2FwcC90bXAvaW1hZ2VsYy9pbWd2aWV3Ml85XzE2MjY2NzkwODIzMzEyODYwXzYxX1swXZOSdzAAAAAASUVORK5CYII="
    />
    <img
      class="heart-2"
      src="data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACc1BMVEUAAACvdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+udE6uc0yuc02udE25h2XMqJDQrpjQrpfDmHuxeFKvdU6vdE66iWjMpo66iGevdVDGnYLw5t///v7////69/XdxbW2gV6yeVXRr5n07Ob+/v7z6uTMp4+xeFP38u7m1MjawK/9+/r7+ffOqpK1gF3r3NPVtqLJooj8+vi9jW3IoYf9/Pv17urx5+DWuKXSsp3hy7zbwbDp2M6xeVTdxLTq2tDizcCvdlDHn4Wze1fgyrzo18y2gV+4hWPp2c/t4Ni9jW7gybr8+/nizsC4hGKye1bJoonv5NzLpo25hWT48/Dgyru7iWnJo4n17un69vTUtaCwd1LAknTLpo6wdlD07Of7+PbPrZawdlHSsZvexre0flr/ds1RAAAAdHRSTlMAAAEJFh0KBiJclb3U376WXiMLWLH7/FsMR/b3EHvw8YEYrPobHrL9/rQRnaJ/hwI95Ok+tUgDJ+FaYnORmJwFCLwErZpujFJXH9iNMuqhLN4taIKJEpf4mRWO8/STDgfdXyvm5y40kMju78o2aZSvsGs3D2is0IsAAAABYktHRIhrZhZaAAAAB3RJTUUH5QoeEigXsQdE7wAAAq9JREFUWMNjYBgFo2AUjFjAyMTMwsrKwsbESL4RjOwcnFzcPLy8PHz8AoLsjOQYxcgoJCzCK1oCBWK8IuISpBvEyC4pIlWCAqRFJNlJM4eRUUZWrgQDyCvIkOQgRkUl5RIsQFlEhQRjGFXV1EuwAg1NQaLNYdTSLsEJdLSINIeRUVcdtzHqevrEmcNoYAjRUVpWVlaOYJZCmEbGRBnDKKEGUV9RWVVdU1sH1F3f0FhV3dQMNcdEhhhzGI0hUd3S2tbe0dHZ1V3a0NPb197RP2HiJLCElCkRxjCaQcK3vHZyBwi0T+meNHUamDl9BsQ92maEzWE0twApbZg5qwMKZs+ZC2X1zasAyVmYE2GMJTiayuYvgBmzcBGM1bEYHOLqVkQYYw12eNmSDixgKSSQbQgaw8hoC4mmZdiMWb4CLGlHMGcx2otAEspKbMasghgjYk/QGAc+SETNxmbM6jVgST4HwsZwQ8Jm7TQsxiyBJGpHwsY4OYNV1q9bj2nKho0NYElnJ4LGMNpAs8Kmzf2ohrRv2QrNYS6ECy9GV2hWbujeth3ZlGk7dkIzVYkbEenGHVbule7avacdbsqivetgpih7EGGMpxesaGko37dsP8SQ6QcOljfAxL08iTCG0RtRRpWWHDoMMuXI0WMVCFFvYsp1Rh9fpMKu4fgEYGlx4mQ9Uv1gQFR54+CHXGhW1J46feYskiklOszEFX/+XsjmlJ07fwzZlIBAIstixiBpJG31uy40IHGlXYmt8RgdgsWQ3YNsikYIwYyAMCc0LBx79aIcEUlKtSkUFY3NlJjYOJIaA4zxlgmYpgQkxpPYNGFkSnJLRjUkJSqVjJYSo35aekamBjRks7Jjc4ioV7AbFJeTm5fvyF3AVVhUTKYhUKMY7R0c7CloQY6CUTAKRsFwBgAUIueWESUewgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0zMFQxMDo0MDoyMyswODowMLbmxQsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMzBUMTA6NDA6MjMrMDg6MDDHu323AAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADQwMHlaadsAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANDAw6qs5hgAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNjM1NTYxNjIzFjsb2wAAAA90RVh0VGh1bWI6OlNpemUAMEJClKI+7AAAAEZ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2FwcC90bXAvaW1hZ2VsYy9pbWd2aWV3Ml85XzE2MjY2NzkwODIzMzEyODYwXzYxX1swXZOSdzAAAAAASUVORK5CYII="
    />
    <img
      class="heart-3"
      src="data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAMAAABG8BK2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACc1BMVEUAAACvdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+vdU+udE6uc0yuc02udE25h2XMqJDQrpjQrpfDmHuxeFKvdU6vdE66iWjMpo66iGevdVDGnYLw5t///v7////69/XdxbW2gV6yeVXRr5n07Ob+/v7z6uTMp4+xeFP38u7m1MjawK/9+/r7+ffOqpK1gF3r3NPVtqLJooj8+vi9jW3IoYf9/Pv17urx5+DWuKXSsp3hy7zbwbDp2M6xeVTdxLTq2tDizcCvdlDHn4Wze1fgyrzo18y2gV+4hWPp2c/t4Ni9jW7gybr8+/nizsC4hGKye1bJoonv5NzLpo25hWT48/Dgyru7iWnJo4n17un69vTUtaCwd1LAknTLpo6wdlD07Of7+PbPrZawdlHSsZvexre0flr/ds1RAAAAdHRSTlMAAAEJFh0KBiJclb3U376WXiMLWLH7/FsMR/b3EHvw8YEYrPobHrL9/rQRnaJ/hwI95Ok+tUgDJ+FaYnORmJwFCLwErZpujFJXH9iNMuqhLN4taIKJEpf4mRWO8/STDgfdXyvm5y40kMju78o2aZSvsGs3D2is0IsAAAABYktHRIhrZhZaAAAAB3RJTUUH5QoeEigXsQdE7wAAAq9JREFUWMNjYBgFo2AUjFjAyMTMwsrKwsbESL4RjOwcnFzcPLy8PHz8AoLsjOQYxcgoJCzCK1oCBWK8IuISpBvEyC4pIlWCAqRFJNlJM4eRUUZWrgQDyCvIkOQgRkUl5RIsQFlEhQRjGFXV1EuwAg1NQaLNYdTSLsEJdLSINIeRUVcdtzHqevrEmcNoYAjRUVpWVlaOYJZCmEbGRBnDKKEGUV9RWVVdU1sH1F3f0FhV3dQMNcdEhhhzGI0hUd3S2tbe0dHZ1V3a0NPb197RP2HiJLCElCkRxjCaQcK3vHZyBwi0T+meNHUamDl9BsQ92maEzWE0twApbZg5qwMKZs+ZC2X1zasAyVmYE2GMJTiayuYvgBmzcBGM1bEYHOLqVkQYYw12eNmSDixgKSSQbQgaw8hoC4mmZdiMWb4CLGlHMGcx2otAEspKbMasghgjYk/QGAc+SETNxmbM6jVgST4HwsZwQ8Jm7TQsxiyBJGpHwsY4OYNV1q9bj2nKho0NYElnJ4LGMNpAs8Kmzf2ohrRv2QrNYS6ECy9GV2hWbujeth3ZlGk7dkIzVYkbEenGHVbule7avacdbsqivetgpih7EGGMpxesaGko37dsP8SQ6QcOljfAxL08iTCG0RtRRpWWHDoMMuXI0WMVCFFvYsp1Rh9fpMKu4fgEYGlx4mQ9Uv1gQFR54+CHXGhW1J46feYskiklOszEFX/+XsjmlJ07fwzZlIBAIstixiBpJG31uy40IHGlXYmt8RgdgsWQ3YNsikYIwYyAMCc0LBx79aIcEUlKtSkUFY3NlJjYOJIaA4zxlgmYpgQkxpPYNGFkSnJLRjUkJSqVjJYSo35aekamBjRks7Jjc4ioV7AbFJeTm5fvyF3AVVhUTKYhUKMY7R0c7CloQY6CUTAKRsFwBgAUIueWESUewgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0xMC0zMFQxMDo0MDoyMyswODowMLbmxQsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMTAtMzBUMTA6NDA6MjMrMDg6MDDHu323AAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADQwMHlaadsAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANDAw6qs5hgAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNjM1NTYxNjIzFjsb2wAAAA90RVh0VGh1bWI6OlNpemUAMEJClKI+7AAAAEZ0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2FwcC90bXAvaW1hZ2VsYy9pbWd2aWV3Ml85XzE2MjY2NzkwODIzMzEyODYwXzYxX1swXZOSdzAAAAAASUVORK5CYII="
    />
    <!-- 曲线 -->
    <div class="line-top">
      <div class="ani-wrap">
        <div class="img-wrap">
          <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-5-19-GznHtww8kX2WbebhPhYMkExYmRNZn5Fp?imageMogr2/auto-orient/thumbnail/666.00x888.26>"
            alt=""
          />
        </div>
      </div>
    </div>
    <!-- 圆顶 -->
    <div class="line-circle">
      <div>
        <div class="img-wrap">
          <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-4-29-C2cFhda4MWhab5kHFn3YSR56sdF8N7nE?imageMogr2/auto-orient/thumbnail/156.00x154.37>"
            alt=""
            style="opacity: 1; top: -0.228px; width: 52px; height: 52px"
          />
        </div>
      </div>
    </div>
    <!-- 圆形背景 -->
    <div class="circle-1-bg">
      <div
        style="
          box-shadow: rgb(153, 153, 153) 0px 0px 0px;
          border-radius: 0px;
          height: 430px;
        "
      >
        <div
          style="
            height: 430px;
            transform: none;
            -webkit-mask-box-image-source: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzcuNSA1OC44IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNy41IDU4Ljg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM3NjgzOEY7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNy41LDU4Ljh2LTQwQzM3LjUsOC40LDI5LjEsMCwxOC43LDBsMCwwQzguNCwwLjEsMCw4LjUsMCwxOC44djQwSDM3LjV6Ii8+DQo8L3N2Zz4NCg==');
          "
        >
          <div
            class="img-wrap"
            style="
              border-radius: 0px;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(153, 153, 153);
            "
          >
            <img
              src="https://h5cdn.hunbei1.com/editorCustomPic/2020-12-17-SfrsbYc2SPa2mewPwk4tSexfy4d6JJea?imageMogr2/auto-orient/crop/!440x752a0a15/quality/90|imageMogr2/thumbnail/888.00x1517.67>"
              alt=""
              style="
                opacity: 1;
                top: -37.945px;
                width: 296px;
                height: 506.057px;
              "
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 第一张照片 -->
    <div
      style="
        position: absolute;
        left: 51px;
        top: 225px;
        width: 280px;
        height: 415px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          data-link=""
          data-hash=""
          class="rotate-wrap"
          style="
            transform: none;
            -webkit-mask-box-image-source: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0i5Zu+5bGCXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzcuNSA1OC44IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNy41IDU4Ljg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM3NjgzOEY7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNy41LDU4Ljh2LTQwQzM3LjUsOC40LDI5LjEsMCwxOC43LDBsMCwwQzguNCwwLjEsMCw4LjUsMCwxOC44djQwSDM3LjV6Ii8+DQo8L3N2Zz4NCg==');
          "
        >
          <div
            class="img-wrap"
            style="
              border-radius: 0px;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(153, 153, 153);
            "
          >
            <!-- <img
              src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-B7wydEppbzbN4Ds5xfY8RXsf38GNRT8b?imageMogr2/auto-orient/thumbnail/840.00x1260.32>"
              alt=""
              style="opacity: 1; top: -2.553px; width: 280px; height: 420.08px"
            /> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 左边线 -->
    <div
      style="
        position: absolute;
        left: -10px;
        top: 602px;
        width: 133px;
        height: 129px;
        transform: rotate(188deg);
        z-index: -1;
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          data-link=""
          data-hash=""
          class="rotate-wrap"
          style="transform: none"
        >
          <div
            class="img-wrap"
            style="
              border-radius: 0px;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(153, 153, 153);
            "
          >
            <img
              src="https://h5cdn.hunbei.com/editorCustomPic/2021-5-19-dNrRfbxKhHp7DRzyHtkZTNrwz6ycNMMN?imageMogr2/auto-orient/thumbnail/399.00x389.35>"
              alt=""
              style="opacity: 1; top: -0.392px; width: 133px; height: 129.787px"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 新郎&新娘 -->
    <div
      style="
        position: absolute;
        left: 0px;
        top: 693px;
        width: 376px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 18px;
          line-height: 1;
          letter-spacing: 2px;
          font-weight: normal;
          text-align: center;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        美美&nbsp;&amp;&nbsp;满满
      </div>
    </div>
    <!-- 英文描述 -->
    <div
      style="
        position: absolute;
        left: 0px;
        top: 730px;
        width: 376px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        data-link=""
        data-hash=""
        class="text-common text-editor poiretone"
        style="
          font-family: poiretone;
          font-size: 15px;
          line-height: 1.8;
          letter-spacing: 1px;
          font-weight: bold;
          text-align: center;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        Invite&nbsp;you&nbsp;to&nbsp;share&nbsp;joy&nbsp;at&nbsp;the<br />celebration&nbsp;of&nbsp;our&nbsp;marriage.
      </div>
    </div>

    <!-- start -->
    <div
      style="
        position: absolute;
        left: 49px;
        top: 859px;
        width: 30px;
        height: 23px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div>
          <div
            class="img-wrap"
            style="
              border-radius: 0px;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(153, 153, 153);
            "
          >
            <img
              src="https://h5cdn.hunbei1.com/editorCustomPic/2020-12-17-D2TeZE8cyTtTSDZG5sNZYY6GfakdYxb5?imageMogr2/auto-orient/thumbnail/90.00x70.13>"
              alt=""
              style="opacity: 1; top: -0.188px; width: 30px; height: 23.375px"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 左逗号 -->
    <div
      style="
        position: absolute;
        left: 130px;
        top: 888px;
        width: 120px;
        height: 59px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 0px;
            border-style: solid;
            border-color: rgb(153, 153, 153);
          "
        >
          <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-4-22-bMBKhPATyDHwPG52Wm5hb3bmG7JTxech?imageMogr2/auto-orient/thumbnail/360.00x178.09>"
            alt=""
            style="opacity: 1; top: -0.181px; width: 120px; height: 59.3491px"
          />
        </div>
      </div>
    </div>
    <!-- 关于我们 -->
    <div
      style="
        position: absolute;
        left: 0px;
        top: 901px;
        width: 376px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: poiretone;
          font-size: 18px;
          line-height: 1;
          letter-spacing: 2px;
          font-weight: bold;
          text-align: center;
          writing-mode: lr-tb;
          font-style: oblique;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        STORY&nbsp;ABOUT&nbsp;US<br />
      </div>
    </div>
    <!-- 右逗号 -->
    <div
      class="ele-img animated eles"
      data-id="1621414340676"
      data-type="image"
      pid=""
      type="image"
      layername="图片169"
      signsort="1"
      copyindex="64"
      style="
        position: absolute;
        left: 288px;
        top: 958px;
        width: 30px;
        height: 23px;
        transform: rotate(180deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          data-link=""
          data-hash=""
          class="rotate-wrap"
          style="transform: none"
        >
          <div
            class="img-wrap"
            style="
              border-radius: 0px;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(153, 153, 153);
            "
          >
            <img
              src="https://h5cdn.hunbei1.com/editorCustomPic/2020-12-17-D2TeZE8cyTtTSDZG5sNZYY6GfakdYxb5?imageMogr2/auto-orient/thumbnail/90.00x70.13>"
              alt=""
              style="opacity: 1; top: -0.188px; width: 30px; height: 23.375px"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 欢迎来到我们的婚礼 -->
    <div
      style="
        position: absolute;
        left: 25px;
        top: 1016px;
        width: 350px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 15px;
          line-height: 1.7;
          letter-spacing: 2px;
          font-weight: normal;
          text-align: left;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        欢迎来到我们的婚礼
      </div>
    </div>
    <!-- 红色背景 -->
    <div
      style="
        position: absolute;
        font-family: 微软雅黑;
        font-size: 12px;
        opacity: 1;
        left: 24px;
        top: 1067px;
        width: 330px;
        height: 248px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="
          border-radius: 0px;
          border-color: rgb(153, 153, 153);
          border-style: solid;
          border-width: 0px;
          box-shadow: rgb(153, 153, 153) 0px 0px 0px;
          height: 100%;
        "
      >
        <div
          data-id="1621414971785"
          data-link=""
          data-hash=""
          class="e-shape"
          style="transform: none; border-radius: 0px; height: 100%"
        >
          <!--?xml version="1.0" encoding="utf-8"?-->
          <!-- Generator: Adobe Illustrator 19.2.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
          <svg
            version="1.2"
            baseProfile="tiny"
            id="图层_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            xml:space="preserve"
            width="100%"
            height="100%"
            preserveAspectRatio="none meet"
          >
            <path
              id="XMLID_12991_"
              fill="rgba(175, 117, 79, 1)"
              d="M100,100H0V0h100V100z"
              vector-effect="non-scaling-stroke"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <!-- 左侧照片 -->
    <div
      style="
        position: absolute;
        left: 39px;
        top: 1084px;
        width: 145px;
        height: 216px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          data-link=""
          data-hash=""
          class="rotate-wrap"
          style="transform: none"
        >
          <div
            class="img-wrap"
            style="
              border-radius: 0px;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(153, 153, 153);
            "
          >
            <!-- <img
              src="https://h5cdn.hunbei1.com/editorCustomPic/2021-1-13-6S4nZizsWWxteb4YnT4XEyKXiAMfW366?imageMogr2/auto-orient/crop/!400x598a434a181/quality/90|imageMogr2/thumbnail/435.00x650.32>"
              alt=""
              style="opacity: 1; top: -0.387px; width: 145px; height: 216.745px"
            /> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧照片 -->
    <div
      style="
        position: absolute;
        left: 195px;
        top: 1084px;
        width: 145px;
        height: 216px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          data-link=""
          data-hash=""
          class="rotate-wrap"
          style="transform: none"
        >
          <div
            class="img-wrap"
            style="
              border-radius: 0px;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(153, 153, 153);
            "
          >
            <!-- <img
              src="https://h5cdn.hunbei1.com/editorCustomPic/2021-1-13-6Fdah8xEbNmAdWDwdStCZAX8AKHisZ3z?imageMogr2/auto-orient/crop/!401x598a636a2/quality/90|imageMogr2/thumbnail/435.00x648.70>"
              alt=""
              style="opacity: 1; top: -0.117px; width: 145px; height: 216.197px"
            /> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 下延伸线 -->
    <div
      style="
        position: absolute;
        left: 151px;
        top: 1355px;
        width: 81px;
        height: 79px;
        transform: rotate(309deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          data-link=""
          data-hash=""
          class="rotate-wrap"
          style="transform: none"
        >
          <div
            class="img-wrap"
            style="
              border-radius: 0px;
              border-width: 0px;
              border-style: solid;
              border-color: rgb(153, 153, 153);
            "
          >
            <img
              src="https://h5cdn.hunbei.com/editorCustomPic/2021-5-19-dNrRfbxKhHp7DRzyHtkZTNrwz6ycNMMN?imageMogr2/auto-orient/thumbnail/243.00x237.13>"
              alt=""
              style="opacity: 1; top: -0.021px; width: 81px; height: 79.0458px"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 新娘名称 -->
    <div
      style="
        position: absolute;
        left: 23px;
        top: 1333px;
        width: 163px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        data-link=""
        data-hash=""
        class="text-common text-editor poiretone"
        style="
          font-family: poiretone;
          font-size: 14px;
          line-height: 2;
          letter-spacing: 0px;
          font-weight: bold;
          text-align: left;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        THE&nbsp;BRIDE<br />新娘丨美美<br />
      </div>
    </div>
    <!-- 新郎名称 -->
    <div
      style="
        position: absolute;
        left: 193px;
        top: 1333px;
        width: 160px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        data-link=""
        data-hash=""
        class="text-common text-editor poiretone"
        style="
          font-family: poiretone;
          font-size: 14px;
          line-height: 2;
          letter-spacing: 0px;
          font-weight: bold;
          text-align: right;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        THE&nbsp;GROOM<br />新郎丨满满<br />
      </div>
    </div>
    <!-- 新郎&新娘名称 -->
    <div
      style="
        position: absolute;
        left: 0px;
        top: 1468px;
        width: 374px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 18px;
          line-height: 1;
          letter-spacing: 2px;
          text-align: center;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        满满&amp;美美
      </div>
    </div>
    <!-- 描述内容 -->
    <div
      style="
        position: absolute;
        left: 1px;
        top: 1481px;
        width: 374px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 15px;
          line-height: 2.5;
          letter-spacing: 2px;
          font-weight: normal;
          text-align: center;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        <br />终于将故事写成了我们<br />希望这份幸福喜悦能传递给你<br />诚挚地邀请您<br />见证和分享我们的重要时刻<br /><br />
      </div>
    </div>
    <!-- 关于我们右侧en -->
    <div
      style="
        position: absolute;
        left: 331px;
        top: 1692px;
        width: auto;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: poiretone;
          font-size: 13px;
          line-height: 1;
          letter-spacing: 6px;
          font-weight: bold;
          text-align: center;
          writing-mode: vertical-rl;
          -webkit-writing-mode: vertical-rl;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        STORY&nbsp;ABOUT&nbsp;US
      </div>
    </div>
    <!-- 左侧圆球 -->
    <div
      style="
        position: absolute;
        left: 4px;
        top: 1722px;
        width: 52px;
        height: 51px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 0px;
            border-style: solid;
            border-color: rgb(153, 153, 153);
          "
        >
          <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-4-29-C2cFhda4MWhab5kHFn3YSR56sdF8N7nE?imageMogr2/auto-orient/thumbnail/156.00x154.37>"
            alt=""
            style="opacity: 1; top: -0.228px; width: 52px; height: 51.4566px"
          />
        </div>
      </div>
    </div>
    <!-- 球链接线 -->
    <div
      style="
        position: absolute;
        left: 20px;
        top: 1759px;
        width: 116px;
        height: 113px;
        transform: rotate(264deg);
        z-index: -1;
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 0px;
            border-style: solid;
            border-color: rgb(153, 153, 153);
          "
        >
          <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-5-19-dNrRfbxKhHp7DRzyHtkZTNrwz6ycNMMN?imageMogr2/auto-orient/thumbnail/348.00x339.59>"
            alt=""
            style="opacity: 1; top: -0.098px; width: 116px; height: 113.208px"
          />
        </div>
      </div>
    </div>
    <!-- 左上图 -->
    <div
      style="
        position: absolute;
        left: -1px;
        top: 1858px;
        width: 305px;
        height: 233px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="
          box-shadow: rgb(153, 153, 153) 0px 0px 0px;
          border-radius: 0px;
          height: 100%;
          width: 100%;
        "
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 7px;
            border-style: solid;
            border-color: rgb(175, 117, 79);
            height: 100%;
            width: 100%;
          "
        >
          <!-- <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-HFnspWDDhQTEEZQxtDQh5CaKz4nJbGkt?imageMogr2/auto-orient/thumbnail/985.75x657.00>"
            alt=""
            style="opacity: 1; left: -18.791px; height: 100%; width: 100%"
          /> -->
        </div>
      </div>
    </div>
    <!--右下图 -->
    <div
      style="
        position: absolute;
        left: 195px;
        top: 2046px;
        width: 166px;
        height: 245px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="
          box-shadow: rgb(153, 153, 153) 0px 0px 0px;
          border-radius: 0px;
          width: 100%;
          height: 100%;
        "
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 7px;
            border-style: solid;
            border-color: rgb(175, 117, 79);
            width: 100%;
            height: 100%;
          "
        >
          <!-- <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-MstWFFGBQteWptid5BTRNWNz6XrY4J5f?imageMogr2/auto-orient/thumbnail/498.00x747.19>"
            alt=""
            style="opacity: 1; top: -9.031px; width: 166px; height: 249.066px"
          /> -->
        </div>
      </div>
    </div>
    <!-- 1 -->
    <!-- 左侧逗号 -->
    <div
      style="
        position: absolute;
        left: 8px;
        top: 2165px;
        width: 48px;
        height: 37px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 0px;
            border-style: solid;
            border-color: rgb(153, 153, 153);
          "
        >
          <img
            src="https://h5cdn.hunbei1.com/editorCustomPic/2020-12-17-D2TeZE8cyTtTSDZG5sNZYY6GfakdYxb5?imageMogr2/auto-orient/thumbnail/144.00x112.20>"
            alt=""
            style="opacity: 1; top: -0.2px; width: 48px; height: 37.4px"
          />
        </div>
      </div>
    </div>
    <!-- 钟于 -->
    <div
      style="
        position: absolute;
        left: 1px;
        top: 2204px;
        width: 193px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 19px;
          line-height: 1;
          letter-spacing: 0px;
          text-align: center;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        1/钟于
      </div>
    </div>
    <!-- 2012年 -->
    <div
      style="
        position: absolute;
        left: 20px;
        top: 2259px;
        width: 156px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 12px;
          line-height: 2.5;
          letter-spacing: 0px;
          text-align: left;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        2012年，我们，不期而遇<br />“你好，很高兴认识你”<br />从你叫什么名字，从我叫什么名字开始，<br />后来有了一切<br /><br />
      </div>
    </div>
    <!-- 右侧线 -->
    <div
      style="
        position: absolute;
        left: 253px;
        top: 2210px;
        width: 215px;
        height: 286px;
        transform: rotate(186deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 0px;
            border-style: solid;
            border-color: rgb(153, 153, 153);
          "
        >
          <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-5-19-GznHtww8kX2WbebhPhYMkExYmRNZn5Fp?imageMogr2/auto-orient/thumbnail/645.00x860.25>"
            alt=""
            style="opacity: 1; top: -0.375px; width: 215px; height: 286.743px"
          />
        </div>
      </div>
    </div>
    <!-- 右1 -->
    <div
      style="
        position: absolute;
        left: 183px;
        top: 2465px;
        width: 178px;
        height: 139px;
        transform: rotate(0deg);
      "
    >
      <div
        class="img-wrap"
        style="
          border-radius: 0px;
          border-width: 6px;
          border-style: solid;
          border-color: rgb(175, 117, 79);
          width: 100%;
          height: 100%;
        "
      >
        <!-- <img
          src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-df3NZ53Zn8zYEzEQzkNmbt4J8xksnXmj?imageMogr2/auto-orient/thumbnail/571.64x381.00>"
          alt=""
          style="opacity: 1; left: -12.274px; width: 100%; height: 100%"
        /> -->
      </div>
    </div>
    <!-- 左2 -->
    <div
      style="
        position: absolute;
        left: 20px;
        top: 2464px;
        width: 143px;
        height: 213px;
        transform: rotate(0deg);
      "
    >
      <div
        class="img-wrap"
        style="
          border-radius: 0px;
          border-width: 6px;
          border-style: solid;
          border-color: rgb(175, 117, 79);
          width: 100%;
          height: 100%;
        "
      >
        <!-- <img
          src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-tEC5CNExKC4aKjx3sEMTztMsa2jj2Sir?imageMogr2/auto-orient/thumbnail/429.00x643.66>"
          alt=""
          style="opacity: 1; top: -0.777px; width: 143px; height: 214.546px"
        /> -->
      </div>
    </div>

    <!-- 左线 -->
    <div
      style="
        position: absolute;
        left: -191px;
        top: 2673px;
        width: 283px;
        height: 376px;
        transform: rotate(0deg);
        z-index: -1;
      "
    >
      <div
        class="img-wrap"
        style="
          border-radius: 0px;
          border-width: 0px;
          border-style: solid;
          border-color: rgb(153, 153, 153);
        "
      >
        <img
          src="https://h5cdn.hunbei.com/editorCustomPic/2021-5-19-GznHtww8kX2WbebhPhYMkExYmRNZn5Fp?imageMogr2/auto-orient/thumbnail/849.00x1132.33>"
          alt=""
          style="opacity: 1; top: -0.721px; width: 283px; height: 377.451px"
        />
      </div>
    </div>
    <!-- 左边关于我们 -->
    <div
      style="
        position: absolute;
        left: 16px;
        top: 2738px;
        width: auto;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: poiretone;
          font-size: 13px;
          line-height: 1;
          letter-spacing: 6px;
          font-weight: bold;
          text-align: center;
          writing-mode: vertical-rl;
          -webkit-writing-mode: vertical-rl;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        STORY&nbsp;ABOUT&nbsp;US
      </div>
    </div>
    <!-- 右逗号 -->
    <div
      style="
        position: absolute;
        left: 298px;
        top: 2652px;
        width: 48px;
        height: 37px;
        transform: rotate(178deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 0px;
            border-style: solid;
            border-color: rgb(153, 153, 153);
          "
        >
          <img
            src="https://h5cdn.hunbei1.com/editorCustomPic/2020-12-17-D2TeZE8cyTtTSDZG5sNZYY6GfakdYxb5?imageMogr2/auto-orient/thumbnail/144.00x112.20>"
            alt=""
            style="opacity: 1; top: -0.2px; width: 48px; height: 37.4px"
          />
        </div>
      </div>
    </div>
    <!-- 忠于 -->
    <div
      style="
        position: absolute;
        left: -1px;
        top: 2681px;
        width: 376px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 19px;
          line-height: 1;
          letter-spacing: 0px;
          text-align: right;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        2/忠于&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /><br />
      </div>
    </div>
    <!-- 忠于描述 -->
    <div
      style="
        position: absolute;
        left: 61px;
        top: 2743px;
        width: 292px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 12px;
          line-height: 2.5;
          letter-spacing: 2px;
          text-align: right;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        一句话是这样讲的：<br />我在等世上唯一契合的灵魂<br />可我一直不明白，我要怎样感觉到<br />与我唯一契合的灵魂在哪里<br />直到我遇见了你<br />我们确定，ta就是对的人<br /><br />
      </div>
    </div>
    <!-- 中图 -->
    <div
      style="
        position: absolute;
        left: 47px;
        top: 2993px;
        width: 299px;
        height: 198px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="
          box-shadow: rgb(153, 153, 153) 0px 0px 0px;
          border-radius: 0px;
          width: 100%;
          height: 100%;
        "
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 6px;
            border-style: solid;
            border-color: rgb(175, 117, 79);
            width: 100%;
            height: 100%;
          "
        >
          <!-- <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-kJFzGnhBDQaQBpn7ez3maSWWNPNkxPFy?imageMogr2/auto-orient/thumbnail/897.00x597.85>"
            alt=""
            style="opacity: 1; top: -0.642px; width: 299px; height: 199.282px"
          /> -->
        </div>
      </div>
    </div>

    <!-- 3左逗号 -->
    <div
      style="
        position: absolute;
        left: 81px;
        top: 3224px;
        width: 48px;
        height: 37px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="box-shadow: rgb(153, 153, 153) 0px 0px 0px; border-radius: 0px"
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 0px;
            border-style: solid;
            border-color: rgb(153, 153, 153);
          "
        >
          <img
            src="https://h5cdn.hunbei1.com/editorCustomPic/2020-12-17-D2TeZE8cyTtTSDZG5sNZYY6GfakdYxb5?imageMogr2/auto-orient/thumbnail/144.00x112.20>"
            alt=""
            style="opacity: 1; top: -0.2px; width: 48px; height: 37.4px"
          />
        </div>
      </div>
    </div>
    <!-- 衷于  -->
    <div
      style="
        position: absolute;
        left: 1px;
        top: 3261px;
        width: 373px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 19px;
          line-height: 1;
          letter-spacing: 0px;
          text-align: center;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        3/衷于<br />
      </div>
    </div>
    <!--  衷于描述 -->
    <div
      style="
        position: absolute;
        left: 0px;
        top: 3314px;
        width: 375px;
        height: auto;
        transform: rotate(0deg);
        border-radius: 0px;
        border-color: rgb(153, 153, 153);
        border-style: solid;
        border-width: 0px;
      "
    >
      <div
        style="
          font-family: 微软雅黑;
          font-size: 12px;
          line-height: 3;
          letter-spacing: 2px;
          text-align: center;
          writing-mode: lr-tb;
          color: rgb(0, 0, 0);
          opacity: 1;
          padding: 5px;
          text-indent: 0px;
        "
      >
        我们看到了最好的对方<br />也成为了最好的自己<br />你跟我说婚后会有一地鸡毛的状态<br />但我相信，在生活中的一地鸡毛里<br />有所爱，才会让人觉得未来可期<br /><br /><br />
      </div>
    </div>
    <!-- 左一 -->
    <div
      style="
        position: absolute;
        left: 4px;
        top: 3540px;
        width: 110px;
        height: 155px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="
          box-shadow: rgb(153, 153, 153) 0px 0px 0px;
          border-radius: 0px;
          width: 100%;
          height: 100%;
        "
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 4px;
            border-style: solid;
            border-color: rgb(175, 117, 79);
            width: 100%;
            height: 100%;
          "
        >
          <!-- <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-tEC5CNExKC4aKjx3sEMTztMsa2jj2Sir?imageMogr2/auto-orient/thumbnail/330.00x495.12>"
            alt=""
            style="opacity: 1; top: -5.021px; width: 100%; height: 100%"
          /> -->
        </div>
      </div>
    </div>
    <!-- 中 -->
    <div
      style="
        position: absolute;
        left: 129px;
        top: 3540px;
        width: 110px;
        height: 155px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="
          box-shadow: rgb(153, 153, 153) 0px 0px 0px;
          border-radius: 0px;
          width: 100%;
          height: 100%;
        "
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 4px;
            border-style: solid;
            border-color: rgb(175, 117, 79);
            width: 100%;
            height: 100%;
          "
        >
          <!-- <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-B7wydEppbzbN4Ds5xfY8RXsf38GNRT8b?imageMogr2/auto-orient/thumbnail/330.00x495.12>"
            alt=""
            style="opacity: 1; top: -5.021px; width: 100%; height: 100%"
          /> -->
        </div>
      </div>
    </div>
    <!-- 右 -->
    <div
      style="
        position: absolute;
        left: 257px;
        top: 3540px;
        width: 110px;
        height: 155px;
        transform: rotate(0deg);
      "
    >
      <div
        class="ani-wrap"
        style="
          box-shadow: rgb(153, 153, 153) 0px 0px 0px;
          border-radius: 0px;
          width: 100%;
          height: 100%;
        "
      >
        <div
          class="img-wrap"
          style="
            border-radius: 0px;
            border-width: 4px;
            border-style: solid;
            border-color: rgb(175, 117, 79);
            width: 100%;
            height: 100%;
          "
        >
          <!-- <img
            src="https://h5cdn.hunbei.com/editorCustomPic/2021-10-11-AjzC6rsRp4HzzBhkr4TpMaewRHnGCf24?imageMogr2/auto-orient/crop/!1067x1473a133a383/quality/90|imageMogr2/thumbnail/336.83x465.00>"
            alt=""
            style="opacity: 1; left: -1.139px; width: 100%; height: 100%"
          /> -->
        </div>
      </div>
    </div>
