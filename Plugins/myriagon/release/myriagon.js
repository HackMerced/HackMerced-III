"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var myriagon = function () {
  function myriagon(file_location, auto_location) {
    _classCallCheck(this, myriagon);

    var that = this; // transfer access
    var input = "";

    this.location = file_location;
    this.universities = [];
    this.input = input = document.getElementById(auto_location);
    this.myr_id = "myr" + document.querySelectorAll('.myr-container').length;

    this.readFile(function (universities_list) {
      that.universities = universities_list;
    });

    this.input.oninput = function () {
      that.showAutocomplete(input.value);
    };

    this.offClick();
  }

  _createClass(myriagon, [{
    key: "offClick",
    value: function offClick() {
      var that = this;

      // if use clicks away
      document.addEventListener("click", function (e) {
        var level = 0;
        for (var el = e.target; el; el = el.parentNode) {
          if (el.id === 'x') {
            return;
          }
          level++;
        }
        that.hide();
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      // hides the container
      if (this.container) {
        this.container.setAttribute("style", "display:none");
      }
    }
  }, {
    key: "show",
    value: function show() {
      // shows the container and aligns it

      var bounding = this.input.getBoundingClientRect();
      var offset = {
        top: bounding.bottom - document.body.getBoundingClientRect().top + this.input.offsetHeight,
        left: bounding.left,
        width: this.input.offsetWidth
      };

      if (this.container) {
        this.container.setAttribute("style", "width:" + offset.width + "px;left:" + offset.left + "px;top:" + offset.top + "px;position:absolute;display:block");
      }
    }
  }, {
    key: "showAutocomplete",
    value: function showAutocomplete(value) {
      var that = this;

      if (value) {
        value = value.toLowerCase();

        if (!document.getElementById(this.myr_id)) {
          this.generateContainer();
        }

        this.show();

        // clear data
        this.container.innerHTML = "";

        // find closest four

        var documents = [];
        var lastIndex = 0;
        for (var i = 0; i <= 4; i++) {
          for (var x = lastIndex; x < this.universities.length; x++) {
            var match_index = this.universities[x].toLowerCase().indexOf(value);

            if (match_index !== -1) {
              lastIndex = x + 1;
              var text = this.universities[x].split("");

              var otext = "";
              for (var g = 0; g < text.length; g++) {
                if (text && text[g]) {

                  if (parseFloat(g) === match_index) {
                    otext += "<span class='myr-matched'>";
                  }

                  otext += text[g];

                  if (parseFloat(g) === match_index + value.length) {
                    otext += "</span>";
                  }
                }
              }

              var myr_item = document.createElement("div");
              myr_item.setAttribute("class", "myr-item");
              myr_item.innerHTML = "<span class='myr-item-query'>" + otext + "</span>";

              myr_item.onclick = function (e) {
                that.input.value = this.innerText;
              };

              this.container.appendChild(myr_item);
              break;
            }
          }
        }
      } else {
        this.hide();
      }
    }
  }, {
    key: "generateContainer",
    value: function generateContainer() {
      var html = document.createElement("div");
      html.setAttribute("id", this.myr_id);
      html.setAttribute("class", "myr-container");

      this.container = html;
      document.body.appendChild(html);
    }
  }, {
    key: "readFile",
    value: function readFile(resolve) {
      var file = new XMLHttpRequest();
      file.open("GET", this.location, false);
      file.onreadystatechange = function () {
        if (file.readyState === 4 && (file.status === 200 || file.status === 0)) {
          var csvData = file.responseText;
          csvData = csvData.split(",");
          csvData.splice(0, 2); // delete first two rows
          resolve(csvData);
        }
      };
      file.send(null);
    }
  }]);

  return myriagon;
}();
