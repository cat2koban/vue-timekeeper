var app = new Vue({
  el: '#app',
  data: {
    min:    0,
    sec:    0,
    toggle: false,
    pflg: false,
    sflg: true,
    status: "STANDBY",
    intervalID: "",
    firstBell: "10:00",
    secondBell: "15:00",
    thirdBell: "20:00"
  },
  mounted() {
    if (this.toggle) {
      this.intervalID = setInterval(() => {
        this.updateTime();
      }, 1000)
    }
  },
  methods: {
    updateTime() {
      if (this.sec == 59) {
        this.min = this.min +1;
        this.sec = 0;
      } else {
        this.sec = this.sec + 1;
      }
    },
    start: function() {
      this.status = "";
      this.toggle = true;
      this.pflg = false;
      this.sflg = false;
      this.$mount();
    },
    standby: function() {
      this.status = "STANDBY";
      this.sec = 0;
      this.min = 0;
      this.toggle = false;
      this.sflg = true;
      this.pflg = false;
      this.clear();
      this.$mount();
    },
    pause: function() {
      this.status = "PAUSE";
      this.toggle = false;
      this.pflg = true;
      this.sflg = false;
      this.clear();
    },
    clear: function() {
      clearInterval(this.intervalID);
    }
  },
  computed: {
    time() {
      let formatted = {
        min: this.min,
        sec: this.sec
      };

      if (this.min < 10) {
        formatted.min = `0${this.min}`;
      }

      if (this.sec < 10) {
        formatted.sec = `0${this.sec}`;
      }

      return `${formatted.min}:${formatted.sec}`;
    }
  }
})
