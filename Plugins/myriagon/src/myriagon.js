class myriagon{
  constructor(file_location, auto_location){
    let that = this; // transfer access
    let input = "";

    this.location = file_location;
    this.universities = [];
    this.input = input = document.getElementById(auto_location) ;
    this.myr_id = "myr" + document.querySelectorAll('.myr-container').length;

    this.readFile(function(universities_list){
      that.universities = universities_list;
    });

    this.input.oninput = function(){
      that.showAutocomplete(input.value)
    }

    this.offClick();
  }

  offClick(){
    let that = this;

    // if use clicks away
    document.addEventListener("click", function (e) {
      let level = 0;
      for (let el = e.target; el; el = el.parentNode) {
        if (el.id === 'x') {
          return;
        }
        level++;
      }
      that.hide();
    });
  }

  hide(){
    // hides the container
    if(this.container){
      this.container.setAttribute("style", "display:none");
    }
  }

  show(){
    // shows the container and aligns it

    let bounding = this.input.getBoundingClientRect();
    let offset = {
      top: (bounding.bottom - document.body.getBoundingClientRect().top) + this.input.offsetHeight,
      left: bounding.left,
      width: this.input.offsetWidth,
    }

    if(this.container){
      this.container.setAttribute("style", `width:${offset.width}px;left:${offset.left}px;top:${offset.top}px;position:absolute;display:block`);
    }
  }

  showAutocomplete(value){
    let that = this;

    if(value){
      value = value.toLowerCase();

      if(!document.getElementById(this.myr_id)){
        this.generateContainer();
      }

      this.show();

      // clear data
      this.container.innerHTML = "";

      // find closest four

      let documents = []
      let lastIndex = 0;
      for(let i = 0; i <= 4; i++){
        for(let x = lastIndex; x < this.universities.length; x++){
          let match_index = this.universities[x].toLowerCase().indexOf(value);

          if(match_index !== -1){
            lastIndex = (x + 1);
            let text = this.universities[x].split("");

            let otext = ""
            for(let g = 0; g < text.length; g++){
              if(text && text[g]){

                if(parseFloat(g) === match_index ){
                  otext += "<span class='myr-matched'>";
                }

                otext += text[g];

                if(parseFloat(g) === (match_index + value.length) ){
                  otext += "</span>";
                }
              }

            }


            let myr_item = document.createElement("div");
                myr_item.setAttribute("class", "myr-item");
                myr_item.innerHTML = "<span class='myr-item-query'>" +
                                      otext +
                                     "</span>"

                myr_item.onclick = function(e){
                  that.input.value = this.innerText;
                }

            this.container.appendChild(myr_item);
            break;
          }
        }
      }
    } else {
      this.hide();
    }

  }

  generateContainer(){
    let html = document.createElement("div");
        html.setAttribute("id", this.myr_id);
        html.setAttribute("class", "myr-container");

    this.container = html;
    document.body.appendChild(html);
  }

  readFile(resolve){
    let file = new XMLHttpRequest();
    file.open("GET", this.location, false);
    file.onreadystatechange = function (){
      if(file.readyState === 4 && (file.status === 200 || file.status === 0)){
          let csvData = file.responseText;
              csvData = csvData.split(",");
              csvData.splice(0, 2); // delete first two rows
          resolve(csvData);

      }
    }
    file.send(null);
  }

}
