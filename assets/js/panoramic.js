THREE.Cache.clear();
THREE.Cache.enabled = false;

AFRAME.registerComponent('move-bird', {
    init: function () {
        console.log("Move Bird")
        this.el.addEventListener('click', (e) => {
            var id = this.el.id;
            window.open('pages/panorama/' + id + '.html', '_self')
        })
    }
})


AFRAME.registerComponent('move2', {
    init: function () {
        this.el.addEventListener('click', (e) => {
            window.open('pages/panorama/panorama8.html', '_self');
        })
    }
})

AFRAME.registerComponent('move', {
    schema: {
        pages: { type: 'string', default: '' }
    },
    init: function () {
        this.el.addEventListener('click', (e) => {
            var id = this.el.id;
            var pages = this.data.pages;
            if (pages == 'panorama8')
                window.open('panorama/panorama8.html', '_self');
            else if (pages == 'index') {
                window.open('../outside.html', '_self');
            }
            else {
                window.open(id + '.html', '_self');
            }
        })
    }
})

AFRAME.registerComponent('menu', {
    init: function () {
        this.el.addEventListener('click', (e) => {
            var id = this.el.id;
            if (id == "birdView")
                window.open('../../index.html', '_self');
            else if (id == "visibility") {
                var source = this.el.getAttribute('src');
                var element = this.el;
                if (source == "#visible") {
                    element.setAttribute('src', '#invisible');
                    setVisibility(false, "btnMove");
                } else if (source == "#invisible") {
                    element.setAttribute('src', '#visible');
                    setVisibility(true, "btnMove");
                }
            }

        })
    }
})
AFRAME.registerComponent('booth', {
    init: function () {
        this.el.addEventListener('click', (e) => {
            var id = this.el.id;
            window.open('../booths/' + id + '.html', '_self')
        })
    }
})

function showDailyVoucher() {
    try{
        $('#myModal').modal('show');
    }catch (err){

    }
}

AFRAME.registerComponent('loaded', {
    init: function () {
        let loadingElement = document.getElementById("loading");
        loadingElement.style.visibility = "hidden"
        showDailyVoucher();
        console.log("Load Complete")
    }
});

function removeClass() {
    var html = document.getElementsByTagName("html");
    console.log(html)
    html.classList.remove("a-fullscreen");

}


function setVisibility(visibility, classButton) {
    elements = document.getElementsByClassName(classButton);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.setAttribute("visible", String(visibility));
    }
}

function loadingComplete(loadParam) {
    var loadingElement = document.getElementById("loading");
    loadingElement.style.visibility = "hidden"
    console.log("Load " + loadParam + " Complete")
}

function backToHall(panorama) {
    window.open('../panorama/' + panorama + '.html', '_self');
}

try {
    let iframe = $('iframe');
    let allModal = $('.modal').map(function () {
        $(this).on('hide.bs.modal', function (e) {
            resetIframe();
        });
    });

    $('.nav-link').map(function () {
        $(this).on('hide.bs.tab', function (e) {
            resetIframe();
        })
    })

    function resetIframe() {
        iframe.map(function () {
            $(this).attr('src', $(this).attr('src'));
        });
    }
} catch (e) {
    console.log(e)
}

function AddPoint(id_brand) {
        let email = window.localStorage.getItem('email');
        // let url = "https://yp9xxu67k0.execute-api.ap-southeast-1.amazonaws.com/Prod/points/change";
        let url = "https://bmu5dbe26i.execute-api.ap-southeast-1.amazonaws.com/prod/points/change";
        let data = JSON.stringify({
            "email": email,
            "action": "+",
            "id_brand": id_brand!=null?id_brand:0,
            "point": "20"
        });
        jQuery.ajax({
            url: url,
            headers: {},
            crossDomain: true,
            method: 'POST',
            data: data
        })
        .done(function (respone) {
            if (respone.status === true) {
                console.log('poin added : '+respone);
            } else {
                console.log('poin cant added : '+respone);
            }

        })
        .fail(function (jqXHR, textStatus, errorThrown, err) {
            console.error(err);
            console.log('Something Wrong : ',jqXHR, textStatus, errorThrown)
        });
}


function addPointVisitBooth(booth_string, flashprice=false) {
    
    let email = window.localStorage.getItem('email');
    
    if(getCookie(booth_string) == "" || getCookie(booth_string) == null)
    {
            let url = "https://bmu5dbe26i.execute-api.ap-southeast-1.amazonaws.com/prod/points/change";
            
            let data = JSON.stringify({
                    "email": email,
                    "action": "+",
                    "id_brand": "Visit "+booth_string,
                    "point": "1"
                });
                
            if(flashprice) {
                let data = JSON.stringify({
                    "email": email,
                    "action": "+",
                    "id_brand": "Visit "+booth_string,
                    "point": "5"
                });
            } 
            
            console.log(data, email, flashprice);
            
            jQuery.ajax({
                url: url,
                headers: {},
                crossDomain: true,
                method: 'POST',
                data: data
            })
            .done(function (respone) {
                if (respone.status === true) {
                    setCookie(booth_string,'just visit',0)
                    console.log('poin added visit '+booth_string+': '+JSON.stringify(respone));
                } else {
                    console.log('poin cant added coz visit'+booth_string+': '+JSON.stringify(respone));
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown, err) {
                console.error(err);
                console.log('Something Wrong : ',jqXHR, textStatus, errorThrown)
            });
    }else {
        console.log('You Just Visit This Booth '+booth_string)
    }
            
}

function addPointFlashPrice(msg, point=5) {
    
    let email = window.localStorage.getItem('email');
    
    if(getCookie(msg) == "" || getCookie(msg) == null)
    {
            let url = "https://bmu5dbe26i.execute-api.ap-southeast-1.amazonaws.com/prod/points/change";
            
            let data = JSON.stringify({
                    "email": email,
                    "action": "+",
                    "id_brand": "Flash Price "+msg,
                    "point": point
                });
            
            console.log(data, email, msg, point);
            
            jQuery.ajax({
                url: url,
                headers: {},
                crossDomain: true,
                method: 'POST',
                data: data
            })
            .done(function (respone) {
                if (respone.status === true) {
                    setCookie(msg,'just flashprice',0)
                    console.log('flashprice '+msg+': '+JSON.stringify(respone));
                } else {
                    console.log('response false flashprice'+msg+': '+JSON.stringify(respone));
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown, err) {
                console.error(err);
                console.log('Something Wrong : ',jqXHR, textStatus, errorThrown)
            });
    }else {
        console.log('You Just Draw Flashprice '+msg)
    }
            
}

function updateDailyLogin(){
    
    let email = window.localStorage.getItem('email');
    
    let url = "https://bmu5dbe26i.execute-api.ap-southeast-1.amazonaws.com/prod/users/dailylogin";
        let data = JSON.stringify({
            "email": email,
        });
        jQuery.ajax({
            url: url,
            headers: {},
            crossDomain: true,
            method: 'POST',
            data: data
        })
        .done(function (respone) {
            if (respone.status === true) {
                console.log('poin added : '+respone);
            } else {
                console.log('poin cant added : '+respone);
            }

        })
        .fail(function (jqXHR, textStatus, errorThrown, err) {
            console.error(err);
            console.log('Something Wrong : ',jqXHR, textStatus, errorThrown)
        });
    
}

/* globals AFRAME */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME' +
      ' was available.');
  }
  
  /**
   * Hyper Link component for A-Frame.
   */
  AFRAME.registerComponent('href', {
    schema: {
      default: ''
    },
  
    boundClickHandler: undefined,
  
    clickHandler: function hrefClickHandler() {
      var url = this.data;
      var target = this.el.getAttribute('target');
      console.log('link to ' + url);
      if (url && url[0] === '#') { // in-page anchor
        var ele = document.querySelector(url);
        var cams = document.querySelectorAll('a-camera');
        if (ele && cams) {
          var targetPosition = ele.getAttribute('position');
          console.log('focus camera to position:' +
            JSON.stringify(targetPosition));
          cams[0].setAttribute('position', targetPosition);
          window.location.hash = url;
        } else {
          console.log('#id or a-camera is not defined');
        }
      } else { // normal hyper link
        if (target) {
          var animation = '';
          var exitAnimation = null;
          console.log('target to ' + target);
          if (target.indexOf('#') >= 0) {
            var li = target.split('#');
            target = li[0];
            animation = li[1];
            console.log('target to ' + target + ' & animate ' + animation);
          }
          switch(target) {
          case '_blank':
            if (animation) {
              exitAnimation = document.getElementById(animation);
              exitAnimation.addEventListener('animationend',
                function animationendHandler() {
                  exitAnimation.removeEventListener('animationend',
                    animationendHandler);
                  window.open(url);
                });
              this.el.emit('href');
            } else {
              window.open(url);
            }
            break;
          case 'window':
          default:
            if (animation) {
              exitAnimation = document.getElementById(animation);
              exitAnimation.addEventListener('animationend',
                function animationendHandler() {
                  exitAnimation.removeEventListener('animationend',
                    animationendHandler);
                  window.location.href = url;
                });
              this.el.emit('href');
            } else {
              window.location.href = url;
            }
            break;
          }
        } else {
          window.location.href = url;
        }
      }
    },
  
    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function() {
      this.boundClickHandler = this.clickHandler.bind(this);
      this.el.addEventListener('click', this.boundClickHandler);
    },
  
    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function() {
      this.el.removeEventListener('click', this.boundClickHandler);
    }
  });

// var raycasterEl = AFRAME.scenes[0].querySelector('[raycaster]');
// raycasterEl.components.raycaster.refreshObjects();
// console.log(raycasterEl);