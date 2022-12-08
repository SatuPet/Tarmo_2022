// Side menu boolean as global so it can be accessed from anywhere
let sideMenuOpen = false;

// Open aside
document.getElementById("info-button").addEventListener("click", function () {
  document.getElementById('aside-window').classList.toggle('aside-open');


  // Info text change to sulje
  let buttonTexts = getAsideOpenButtonTexts(localStorage.getItem('languageSettings'));
  if (!sideMenuOpen) {
    this.innerText = buttonTexts[1];
    sideMenuOpen = true;
  } else {
    this.innerText = buttonTexts[0];
    sideMenuOpen = false;
  }

  // Open info content with timing
  let infoContent = document.getElementById('info-content');

  if (!infoContent.classList.contains('info-hidden')) {
    infoContent.classList.toggle('info-hidden');
  } else {
    setTimeout(function () {
      infoContent.classList.toggle('info-hidden');
    }, 1000);
  }

  // Open control buttons panel with timing
  let controls = document.getElementById('control-buttons');

  if (!controls.classList.contains('controls-hidden')) {
    controls.classList.toggle('controls-hidden');
  } else {
    setTimeout(function () {
      controls.classList.toggle('controls-hidden');
    }, 1000)
  }

});

//Gives correct languages for aside closing button
function getAsideOpenButtonTexts(languageSettings) {
  let buttonClosedText = "Sulje";
  let buttonOpenText = "Info";
  switch (languageSettings) {
    case 'en':
      buttonClosedText = "Close";
      buttonOpenText = "Info";
      break;

    case 'swe':
      buttonClosedText = "Stänga";
      buttonOpenText = "Info";
      break;

    default:
      buttonClosedText = "Sulje";
      buttonOpenText = "Info";
      break;
  }
  return [buttonOpenText, buttonClosedText]
}

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btns = document.querySelectorAll(".image-button");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btns.forEach(btn => {
  btn.onclick = function () {
    modal.style.display = "block";
    document.querySelector(".modal-image").src = btn.dataset.imageSource;
  }
});

// change text sizes
function changeTextSize(size) {
  document.querySelectorAll('#text').forEach(text => text.style.fontSize = size)
}


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//NAVI JUTUT

document.addEventListener('click', e => {
  const isDropdownButton = e.target.matches('.linkki');
  if (!isDropdownButton && e.target.closest('.droppi') != null) return;

  let activeDropdown;
  let activeButton = e.target.closest('.linkki');
  if (isDropdownButton) {
    activeDropdown = e.target.closest('.droppi');
    console.log(activeDropdown.classList);
    // toi on se divi
    //activeDropdown.classList.add('active');
    activeDropdown.classList.toggle('active');
  }

  document.querySelectorAll('.droppi.active').forEach(droppi => {
    if (droppi === activeDropdown) return;
    droppi.classList.remove('active');
  });

});

//document.getElementById('aside-window').classList.toggle('aside-open');

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    //let activeDropdown = e.target.closest('.droppi');
    document.querySelectorAll('.droppi.active').forEach(droppi => {
      droppi.classList.remove('active');
    });
    modal.style.display = "none";
    console.log(document.getElementById('aside-window').classList.contains('aside-open'));
    console.log(modal.style.display === "");
    if (modal.style.display === "") {
      document.getElementById('aside-window').classList.remove('aside-open')
    }
  }
});

const hederi = document.querySelector('header');
const kissa = document.querySelector('#kissa');
const kissa2 = document.querySelector('.kissa2');
let active;
kissa.addEventListener('click', e => {
  if (active) {
    hederi.classList.remove('mobiili');
    document.querySelectorAll('.droppi').forEach(droppi => {
      droppi.style.display = "none";
    });
    active = false;
    return;
  }
  if (!active) {
    hederi.classList.toggle('mobiili');
    kissa2.classList.remove('hide');
    document.querySelectorAll('.droppi').forEach(droppi => {
      droppi.style.display = "flex";
    });
    active = true;
    return;
  }
});

//change language

// hide all languages
const hideAllLanguageElements = () => {
  document.querySelectorAll('p[lang="en"], a[lang="en"], div[lang="en"], button[lang="en"], button[lang="en"], h2[lang="en"]').
    forEach(text => text.style.display = 'none');
  document.querySelectorAll('p[lang="fi"], a[lang="fi"], div[lang="fi"], button[lang="fi"], button[lang="fi"], h2[lang="fi"]').
    forEach(text => text.style.display = 'none');
  document.querySelectorAll('p[lang="swe"], a[lang="swe"], div[lang="swe"], button[lang="swe"], button[lang="swe"], h2[lang="swe"]').
    forEach(text => text.style.display = 'none');
}

// show selected language
const showLanguageElements = (language) => {
  document.querySelectorAll(`p[lang="${language}"], a[lang="${language}"], div[lang="${language}"], button[lang="${language}"], button[lang="${language}"], h2[lang="${language}"]`).
    forEach(text => text.style.display = 'block');
  document.querySelectorAll('img')
    .forEach(image => {
      let altText = image.getAttribute(`data-${language}-alt`)
      image.alt = altText
    })

  // Changes the aside button language
  let closedState = sideMenuOpen ? 1 : 0;
  let buttonText = getAsideOpenButtonTexts(language)[closedState];
  document.getElementById('info-button').innerHTML = buttonText;

}
// save languege to localStorage and show it
const setLanguage = (language) => {
  localStorage.setItem('languageSettings', language);
  hideAllLanguageElements();
  showLanguageElements(language);
};

// localStorage choose first finnish language then something else
const languageInit = () => {
  const languageSettings = localStorage.getItem('languageSettings');
  if (languageSettings === null) {
    localStorage.setItem('languageSettings', 'fi');
    hideAllLanguageElements();
    showLanguageElements('fi');
  }
  else {
    hideAllLanguageElements();
    showLanguageElements(languageSettings);
  }
}
languageInit();






/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

(function () {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;
  var data = window.APP_DATA;

  // Grab elements from DOM.
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList');
  var sceneElements = document.querySelectorAll('#sceneList .scene');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    var setMode = function () {
      if (mql.matches) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
      }
    };
    var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addListener(setMode);
  } else {
    document.body.classList.add('desktop');
  }

  // Detect whether we are on a touch device.
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function () {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // Use tooltip fallback mode on IE < 11.
  if (bowser.msie && parseFloat(bowser.version) < 11) {
    document.body.classList.add('tooltip-fallback');
  }

  // Viewer options.
  var viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode
    }
  };

  // Initialize viewer.
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  // Create scenes.
  var scenes = data.scenes.map(function (data) {
    var urlPrefix = "tiles";
    var source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" });
    var geometry = new Marzipano.CubeGeometry(data.levels);

    var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

    var scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });

    // Create link hotspots.
    data.linkHotspots.forEach(function (hotspot) {
      var element = createLinkHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    // Create info hotspots.
    data.infoHotspots.forEach(function (hotspot) {
      var element = createInfoHotspotElement(hotspot);
      scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view
    };
  });

  // Set up autorotate, if enabled.
  var autorotate = Marzipano.autorotate({
    yawSpeed: 0.03,
    targetPitch: 0,
    targetFov: Math.PI / 2
  });
  if (data.settings.autorotateEnabled) {
    autorotateToggleElement.classList.add('enabled');
  }

  // Set handler for autorotate toggle.
  autorotateToggleElement.addEventListener('click', toggleAutorotate);

  // Set up fullscreen mode, if supported.
  if (screenfull.enabled && data.settings.fullscreenButton) {
    document.body.classList.add('fullscreen-enabled');
    fullscreenToggleElement.addEventListener('click', function () {
      screenfull.toggle();
    });
    screenfull.on('change', function () {
      if (screenfull.isFullscreen) {
        fullscreenToggleElement.classList.add('enabled');
      } else {
        fullscreenToggleElement.classList.remove('enabled');
      }
    });
  } else {
    document.body.classList.add('fullscreen-disabled');
  }

  // Set handler for scene list toggle.
  sceneListToggleElement.addEventListener('click', toggleSceneList);

  // Start with the scene list open on desktop.
  if (!document.body.classList.contains('mobile')) {
    showSceneList();
  }

  // Set handler for scene switch.
  scenes.forEach(function (scene) {
    var el = document.querySelector('#sceneList .scene[data-id="' + scene.data.id + '"]');
    el.addEventListener('click', function () {
      switchScene(scene);
      // On mobile, hide scene list after selecting a scene.
      if (document.body.classList.contains('mobile')) {
        hideSceneList();
      }
    });
  });

  // DOM elements for view controls.
  var viewUpElement = document.querySelector('#viewUp');
  var viewDownElement = document.querySelector('#viewDown');
  var viewLeftElement = document.querySelector('#viewLeft');
  var viewRightElement = document.querySelector('#viewRight');
  var viewInElement = document.querySelector('#viewIn');
  var viewOutElement = document.querySelector('#viewOut');

  // Dynamic parameters for controls.
  var velocity = 0.7;
  var friction = 3;

  // Associate view controls with elements.
  var controls = viewer.controls();
  controls.registerMethod('upElement', new Marzipano.ElementPressControlMethod(viewUpElement, 'y', -velocity, friction), true);
  controls.registerMethod('downElement', new Marzipano.ElementPressControlMethod(viewDownElement, 'y', velocity, friction), true);
  controls.registerMethod('leftElement', new Marzipano.ElementPressControlMethod(viewLeftElement, 'x', -velocity, friction), true);
  controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement, 'x', velocity, friction), true);
  controls.registerMethod('inElement', new Marzipano.ElementPressControlMethod(viewInElement, 'zoom', -velocity, friction), true);
  controls.registerMethod('outElement', new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom', velocity, friction), true);

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene) {
    stopAutorotate();
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
    startAutorotate();

    updateSceneList(scene);
  }

  function updateSceneList(scene) {
    for (var i = 0; i < sceneElements.length; i++) {
      var el = sceneElements[i];
      if (el.getAttribute('data-id') === scene.data.id) {
        el.classList.add('current');
      } else {
        el.classList.remove('current');
      }
    }
  }

  function showSceneList() {
    sceneListElement.classList.add('enabled');
    sceneListToggleElement.classList.add('enabled');
  }

  function hideSceneList() {
    sceneListElement.classList.remove('enabled');
    sceneListToggleElement.classList.remove('enabled');
  }

  function toggleSceneList() {
    sceneListElement.classList.toggle('enabled');
    sceneListToggleElement.classList.toggle('enabled');
  }

  function startAutorotate() {
    if (!autorotateToggleElement.classList.contains('enabled')) {
      return;
    }
    viewer.startMovement(autorotate);
    viewer.setIdleMovement(3000, autorotate);
  }

  function stopAutorotate() {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  }

  function toggleAutorotate() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      stopAutorotate();
    } else {
      autorotateToggleElement.classList.add('enabled');
      startAutorotate();
    }
  }

  function createLinkHotspotElement(hotspot) {

    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('link-hotspot');

    // Create image element.
    var icon = document.createElement('img');
    icon.src = 'img/link.png';
    icon.classList.add('link-hotspot-icon');

    // Set rotation transform.
    var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
    for (var i = 0; i < transformProperties.length; i++) {
      var property = transformProperties[i];
      icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
    }

    // Add click event handler.
    wrapper.addEventListener('click', function () {
      switchScene(findSceneById(hotspot.target));
    });

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    // Create tooltip element.
    var tooltip = document.createElement('div');
    tooltip.classList.add('hotspot-tooltip');
    tooltip.classList.add('link-hotspot-tooltip');
    tooltip.innerHTML = findSceneDataById(hotspot.target).name;

    wrapper.appendChild(icon);
    wrapper.appendChild(tooltip);

    return wrapper;
  }

  function createInfoHotspotElement(hotspot) {

    // Create wrapper element to hold icon and tooltip.
    var wrapper = document.createElement('div');
    wrapper.classList.add('hotspot');
    wrapper.classList.add('info-hotspot');

    // Create hotspot/tooltip header.
    var header = document.createElement('div');
    header.classList.add('info-hotspot-header');

    // Create image element.
    var iconWrapper = document.createElement('div');
    iconWrapper.classList.add('info-hotspot-icon-wrapper');
    var icon = document.createElement('img');
    icon.src = 'img/info.png';
    icon.classList.add('info-hotspot-icon');
    iconWrapper.appendChild(icon);

    // Create title element.
    var titleWrapper = document.createElement('div');
    titleWrapper.classList.add('info-hotspot-title-wrapper');
    var title = document.createElement('div');
    title.classList.add('info-hotspot-title');
    title.innerHTML = hotspot.title;
    titleWrapper.appendChild(title);

    // Create close element.
    var closeWrapper = document.createElement('div');
    closeWrapper.classList.add('info-hotspot-close-wrapper');
    var closeIcon = document.createElement('img');
    closeIcon.src = 'img/close.png';
    closeIcon.classList.add('info-hotspot-close-icon');
    closeWrapper.appendChild(closeIcon);

    // Construct header element.
    header.appendChild(iconWrapper);
    header.appendChild(titleWrapper);
    header.appendChild(closeWrapper);

    // Create text element.
    var text = document.createElement('div');
    text.classList.add('info-hotspot-text');
    text.innerHTML = hotspot.text;

    // Place header and text into wrapper element.
    wrapper.appendChild(header);
    wrapper.appendChild(text);

    // Create a modal for the hotspot content to appear on mobile mode.
    var modal = document.createElement('div');
    modal.innerHTML = wrapper.innerHTML;
    modal.classList.add('info-hotspot-modal');
    document.body.appendChild(modal);

    var toggle = function () {
      wrapper.classList.toggle('visible');
      modal.classList.toggle('visible');
    };

    // Show content when hotspot is clicked.
    wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

    // Hide content when close icon is clicked.
    modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

    // Prevent touch and scroll events from reaching the parent element.
    // This prevents the view control logic from interfering with the hotspot.
    stopTouchAndScrollEventPropagation(wrapper);

    return wrapper;
  }

  // Prevent touch and scroll events from reaching the parent element.
  function stopTouchAndScrollEventPropagation(element, eventList) {
    var eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel',
      'wheel', 'mousewheel'];
    for (var i = 0; i < eventList.length; i++) {
      element.addEventListener(eventList[i], function (event) {
        event.stopPropagation();
      });
    }
  }

  function findSceneById(id) {
    for (var i = 0; i < scenes.length; i++) {
      if (scenes[i].data.id === id) {
        return scenes[i];
      }
    }
    return null;
  }

  function findSceneDataById(id) {
    for (var i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return null;
  }

  // Display the initial scene.
  switchScene(scenes[0]);

})();




















