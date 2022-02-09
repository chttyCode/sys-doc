# 小程序
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        width: 100vw;
        height: 100vh;
        background-repeat: no-repeat;
        background-size: contain;
        background-color: #2d5ea6;
        background-position: bottom;
      }
      .border-box {
        position: absolute;
        top: 7vh;
        left: 14vw;
        right: 14vw;
        height: 40vh;
        border: 2px solid #809ec9;
        padding: 10px;
      }
      .content {
        width: 100%;
        height: 100%;
        background-color: #809ec9;
      }

      .title {
        padding: 3vh 10%;
        color: #fff;
        text-align: center;
      }
      .title-cn {
        width: 100%;
        height: 4vh;
        line-height: 4vh;
        overflow: hidden;
      }
      .text {
        float: left;
        width: 19%;
        text-align: center;
        border-left: 1px solid #fff;
        border-right: 1px solid #fff;
        font-size: 30px;
      }
      .title-en {
        display: flex;
        width: 100%;
        color: #f2a2bf;
        clear: both;
        height: 3vh;
        line-height: 3vh;
        justify-content: space-around;
        background-color: #f9d0e0;
        margin-top: 1vh;
      }
      .no-left {
        border-left: none;
      }
      .no-right {
        border-right: none;
      }
      .name-box {
        margin-top: 3.5vh;
        height: 8vh;
        line-height: 8vh;
        text-align: center;
        border-top: 2px solid #85a2cb;
        border-bottom: 2px solid #85a2cb;
        font-size: 18px;
      }
      .and {
        color: #f2a2bf;
        padding-left: 5px;
        padding-right: 5px;
      }
      .bride-title {
        color: #f2a2bf;
        font-size: 12px;
      }
      .invitaion {
        height: 7vh;
        line-height: 7vh;
      }
      .time,
      .addr {
        height: 3vh;
        line-height: 3vh;
      }
      .start {
        position: absolute;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAnCAYAAACSamGGAAAAAXNSR0IArs4c6QAAAu1JREFUWEfNmMlrVEEQh7+f+4a7KG4gHkRRRNxFFD16EQUPiqIIHvI3CQYUDwpGPYgIngSNwe3gQcQFkUhc45q4oSWlPWGczLx+815Pkrq8w+uq/rqquruqRWIxs9mS3qY0q5TGzGwSsA84I+lbKtupIbcBq4Cbku6MOEgzmwgcBMYB34HTkr6mAE3mSTPbCqyugkrmzSSQZjYeOAT4tyI/gFMpcjMV5BZgTZ3QJvFmaUgzGwscrvFiUm+mgNwErM3YIJ2S7pbZQKUgzWw0cASYkAHhuXlSku/4QlIWcgOwPsfMpbxZGNLMXPdoxIvVuVnYm2Ug1wEbc3ixMuSGpHtNjB8YmglpZqOA6cAsYA4wDZgCTAb8nm5mkQb4DdQH9AMfgPdAL/Ba0q9GC/g7iZn55POAuSF8DjI1wBRZfBEdL0i+AB/DYryS6pHUKzNzoD0BqojxVup8AjoqnhyJoP8Apb6BnDIzz7O9I8SjHnIH9Nz9P/EDqIfec3S4xDfU+QrgIMiwidyjwwU6CLAuZAD148VB/fgZKvHjyD04qFBueM6FfmWoQP2svNCoko8d5t4SOOiMFrozE7BhuKuBQu/SKtB3wMVYL5TrWmsRqN8oDhhtfXNBhs20C1iSMOxPJV3OY68ZyAOJc7NfUntqyDbAq6KUclySV+6ZksuTZjYT2B8zVuD/WUlvYnp5IVcAO2LGCvy/IulxTC8vZOWNJ2av2f+3JXXFlPJC7gYWxowV+P9M0qWYXl5If0LxSj0m3sM8Ajw9VsYGewUu6URsXBTSzMYAxyI7+wFwS9LnyoShJfF2d1kEor26LKs3Ng/k/HB/19N/AnRJ8gqmroSTwfvzpQ2GnJP0MmsheSA9bNtrjHQD3qJGj48qz3q36U8yi2tsXZX0sCzkTmB5MPIKuC6pJ5ZHGZ71rnQz4BFyuS/pWllI73v89bYTeC7J++fSYmYLAH94/SmpoyzkIuCFpN+lyWoMhKcaD3931uPAHyMvAT+nigz5AAAAAElFTkSuQmCC");
        background-size: contain;
      }
      .start-1 {
        width: 20px;
        height: 20px;
        animation: start 2s ease-in infinite;
        background-size: contain;
        top: 3vh;
        right: 11vw;
      }
      .start-2 {
        width: 10px;
        height: 10px;
        animation: start 3s ease-in-out 1s infinite;
        background-size: contain;
        top: 21vh;
        right: 1vw;
      }
      @keyframes start {
        10% {
          opacity: 0;
        }
        90% {
          opacity: 1;
        }
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="border-box">
        <div class="content">
          <div class="title">
            <div class="title-cn">
              <!-- <span class="text no-left">婚</span>
              <span class="text">礼</span>
              <span class="text">邀</span>
              <span class="text">请</span>
              <span class="text no-right">函</span> -->
              <span class="text no-left">一</span>
              <span class="text">二</span>
              <span class="text">三</span>
              <span class="text">四</span>
              <span class="text no-right">五</span>
            </div>

            <div class="title-en">
              <span>WEDDING</span> <span>INVITATION</span>
            </div>

            <div class="name-box">
              <span class="bride-title">一二</span>
              <span class="bride">一二三</span>
              <span class="and">&</span>
              <span class="brideroom">一二三</span>
              <span class="bride-title">一二</span>
              <!-- <span class="bride-title">新郎</span>
              <span class="bride">孔德松</span>
              <span class="and">&</span>
              <span class="brideroom">李舒颖</span>
              <span class="bride-title">新娘</span> -->
            </div>

            <!-- <div class="invitaion">诚邀您参加我们的婚礼</div>
            <div class="time">2022.03.26 18:58</div>
            <div class="addr">新晶丽酒店三楼美轮美奂厅</div> -->
          </div>
        </div>
      </div>
      <div class="start start-1"></div>
      <div class="start start-2"></div>
    </div>
  </body>
</html>
