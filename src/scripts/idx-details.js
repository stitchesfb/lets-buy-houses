/*
 * Property detail pages on IDX Broker (letsbuyhouses.idxbroker.com/idx/details/...).
 *
 * Loaded on every IDX page through the dynamic wrapper (src/pages/idx-wrapper.astro),
 * served from a fixed URL (/idx/details.js) so updates don't need IDX to re-fetch the
 * wrapper. It only acts on listing detail pages and never on the printable flyer.
 *
 * It rearranges IDX's own page rather than replacing it: IDX's Favorites button,
 * Print Flyer link, contact form (lead goes to IDX with the listing attached), field
 * panels, MLS badge and Local Logic neighborhood section are moved into the new layout,
 * so they keep working. New pieces: the photo grid / swipe gallery, the facts row,
 * Highlights, the Request a Tour tab, Jackie's contact card and the Share button.
 * If anything it relies on is missing, it stops and leaves IDX's page as it was.
 *
 * window.LBH_AGENT (Jackie's details) is prepended by src/pages/idx/details.js.ts.
 */
(function () {
  'use strict';

  var AGENT = window.LBH_AGENT || {};
  var FIRST = AGENT.firstName || 'Jacquelyn';
  var TOUR_SENT = 'Your tour request was sent. ' + FIRST + ' will follow up to confirm your tour time.';

  function onReady(fn) {
    // Run after IDX's own jQuery ready handlers (form binding, favorites, swiper).
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { setTimeout(fn, 0); });
    } else {
      setTimeout(fn, 0);
    }
  }

  onReady(function () {
    var main = document.getElementById('IDX-main');
    if (!main || !main.classList.contains('IDX-category-details')) return;
    if (/[?&]printable\b/.test(location.search)) return;
    if (document.getElementById('lbh-details')) return;
    try {
      build(main);
    } catch (err) {
      // Put every moved IDX element back where IDX had it and drop the new layout.
      for (var i = moved.length - 1; i >= 0; i--) {
        var m = moved[i];
        if (m[1]) m[1].insertBefore(m[0], m[2] && m[2].parentNode === m[1] ? m[2] : null);
      }
      var partial = document.getElementById('lbh-details');
      if (partial) partial.parentNode.removeChild(partial);
      main.classList.remove('lbh-details');
      if (window.console) console.warn('[letsbuyhouses] detail layout skipped:', err);
    }
  });

  /* ---------- helpers ---------- */

  // IDX elements moved into the new layout, with where they came from.
  var moved = [];
  function adopt(node) {
    if (node && node.parentNode) moved.push([node, node.parentNode, node.nextSibling]);
    return node;
  }
  function active() { return !!document.querySelector('#IDX-main.lbh-details'); }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function text(el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v === true ? '' : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  }

  function icon(name) {
    var paths = {
      heart: 'M12 21s-7.5-4.6-9.3-9.2C1.4 8.4 3.6 5 7 5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8C19.5 16.4 12 21 12 21z',
      print: 'M7 8V3h10v5M6 17H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2M7 14h10v7H7z',
      share: 'M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7',
      camera: 'M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zm8 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
      mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
      chevL: 'M15 18l-6-6 6-6',
      chevR: 'M9 6l6 6-6 6',
      back: 'M19 12H5m6-6-6 6 6 6',
      check: 'M5 12.5l4.5 4.5L19 7',
    };
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'lbh-icon');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', paths[name]);
    svg.appendChild(p);
    return svg;
  }

  function formValue(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? String(el.value || '').trim() : '';
  }

  /* ---------- build ---------- */

  function build(main) {
    var topNav = $('#IDX-detailsTopNav');
    var header = $('#IDX-detailsHeader');
    var wrapper = $('#IDX-detailsWrapper');
    var contactBox = $('#IDX-detailsContact #IDX-detailscontactContainer');
    var form = contactBox && $('form.IDX-contactForm', contactBox);
    var basic = $('#IDX-detailsBasicInfo');
    if (!header || !wrapper || !form || !basic) throw new Error('expected IDX detail parts are missing');

    /* Listing data, from IDX's own form fields and Basic Information panel */
    var listing = {
      id: formValue(form, 'listingID'),
      street: formValue(form, 'address'),
      city: formValue(form, 'cityName'),
      // IDX's form spells the state out; its address line uses the postal abbreviation.
      state: text($('#IDX-detailsAddressRegion span:nth-child(2)')) || formValue(form, 'state'),
      zip: formValue(form, 'zipcode'),
    };
    var info = {};
    $$('.IDX-field', basic).forEach(function (f) {
      var label = text($('.IDX-label', f)).toLowerCase();
      if (label) info[label] = text($('.IDX-text', f));
    });
    function field(id) { return text($('#IDX-field-' + id + ' .IDX-text')); }
    listing.price = info.price || '';
    listing.status = info.status || field('mlsStatus');
    listing.region = [listing.city, [listing.state, listing.zip].filter(Boolean).join(' ')].filter(Boolean).join(', ');
    listing.full = [listing.street, listing.region].filter(Boolean).join(', ');
    if (!listing.street) throw new Error('listing address missing');

    /* Photos (IDX's own swiper slides, without its loop duplicates) */
    var photos = [];
    $$('#IDX-primaryPhoto .swiper-slide:not(.swiper-slide-duplicate) img').forEach(function (img) {
      var src = (img.getAttribute('data-src') || img.getAttribute('src') || '').trim();
      if (src && photos.indexOf(src) === -1) photos.push(src);
    });
    if (!photos.length) {
      var still = $('#IDX-primaryPhoto img');
      if (still && still.getAttribute('src')) photos.push(still.getAttribute('src').trim());
    }
    var galleryLink = $('#IDX-detailsPhotoGalleryLink');
    var galleryUrl = galleryLink ? galleryLink.href : null;
    var photoTotal = parseInt(text(galleryLink), 10) || photos.length;

    /* The MLS "Listed by" credit, verbatim. IDX keeps it in a hidden template
       (.IDX-mlsSelectorRulesCourtesy) and copies it under the main photo with its own
       script, which may not have run yet; read the template first. */
    var credit = text($('.IDX-mlsSelectorRulesCourtesy .IDX-selectorText'));
    if (!/^Listed by:/.test(credit)) {
      credit = '';
      var walker = document.createTreeWalker($('#IDX-primaryPhoto') || wrapper, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        if (/^\s*Listed by:/.test(walker.currentNode.textContent)) { credit = walker.currentNode.textContent.replace(/\s+/g, ' ').trim(); break; }
      }
    }
    var creditMatch = credit.match(/^Listed by:\s*(.+?)\s+from\s+(.+)$/);

    var root = h('div', { id: 'lbh-details' });

    /* Top bar: back to search + Favorites, Print Flyer, Share */
    var actions = h('div', { class: 'lbh-actions' });
    var fav = $('#IDX-saveProperty, #IDX-removeProperty');
    var print = $('#IDX-printable');
    if (fav) actions.appendChild(adopt(fav));
    if (print) { actions.appendChild(adopt(print)); print.insertBefore(icon('print'), print.firstChild); }
    actions.appendChild(shareControl(listing));
    var back = $('#IDX-detailsTopNewSearch');
    var topbar = h('div', { class: 'lbh-topbar' }, [
      back ? h('a', { class: 'lbh-back', href: back.getAttribute('href') || '/idx/search' }, [icon('back'), 'New search']) : h('span'),
      actions,
    ]);
    root.appendChild(topbar);

    /* Gallery */
    root.appendChild(gallery(photos, photoTotal, galleryUrl, listing));
    /* "Listed by": keep IDX's own placement. IDX's MLS rules write the credit into
       #IDX-primaryPhoto (its photo area), so that element moves into the new gallery,
       directly under the photos, with its old carousel hidden. If IDX's line hasn't
       appeared by the time the page has loaded, show the same text verbatim instead. */
    var primary = $('#IDX-primaryPhoto');
    var creditBox = h('div', { class: 'lbh-credit-area' });
    var fallback = credit ? h('p', { class: 'lbh-credit', text: credit, hidden: true }) : null;
    if (primary) creditBox.appendChild(adopt(primary));
    if (fallback) creditBox.appendChild(fallback);
    root.lastChild.appendChild(creditBox);
    // IDX's open house banner (it sat on the old carousel) goes on the photos and still links to
    // the Open Houses panel. IDX may add it after load, so watch its photo container for it.
    var mediaBox = $('.lbh-media', root);
    function placeOpenHouse() {
      var oh = primary && primary.querySelector('#IDX-detailsSlidesOpenHouses');
      if (oh) { mediaBox.appendChild(oh); oh.classList.add('lbh-oh'); }
    }
    placeOpenHouse();
    if (primary && window.MutationObserver) new MutationObserver(placeOpenHouse).observe(primary, { childList: true, subtree: true });
    window.addEventListener('load', placeOpenHouse);
    function hasIdxCredit() {
      if (!primary) return false;
      for (var n = primary.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3 && /Listed by:/.test(n.textContent)) return true;
        if (n.nodeType === 1 && !n.matches('.swiper-container, #IDX-primaryPhotoStatic') && /Listed by:/.test(n.textContent)) return true;
      }
      return false;
    }
    function checkCredit() { if (fallback) fallback.hidden = hasIdxCredit(); }
    if (fallback) {
      fallback.hidden = true;
      window.addEventListener('load', function () { setTimeout(checkCredit, 1500); });
      if (document.readyState === 'complete') setTimeout(checkCredit, 1500);
      if (primary && window.MutationObserver) new MutationObserver(checkCredit).observe(primary, { childList: true });
    }

    /* Layout: facts | sidebar | details */
    var layout = h('div', { class: 'lbh-layout' });
    layout.appendChild(facts(listing, info, field));

    var aside = h('aside', { class: 'lbh-aside', 'aria-label': 'Tour and contact' });
    aside.appendChild(tourPanel(form, contactBox, listing));
    aside.appendChild(agentCard(listing));
    layout.appendChild(aside);

    var body = h('div', { class: 'lbh-body' });
    body.appendChild(overview(adopt($('#IDX-detailsDescription')), info, field, listing, creditMatch, credit));
    body.appendChild(features());
    var more = $('#IDX-detailsFields');
    if (more) body.appendChild(h('section', { class: 'lbh-section lbh-more', 'aria-labelledby': 'lbh-more-h' }, [
      h('h2', { id: 'lbh-more-h', class: 'lbh-h2', text: 'Property details & neighborhood' }), adopt(more),
    ]));
    // Open houses first, then anything else IDX adds to its main column, so nothing native is lost.
    var openHouses = $('#IDX-openHouses');
    if (openHouses) body.insertBefore(h('section', { class: 'lbh-section lbh-more lbh-openhouses', 'aria-label': 'Open houses' }, [adopt(openHouses)]), body.firstChild);
    var mainCol = $('#IDX-detailsMain');
    var leftovers = mainCol ? Array.prototype.filter.call(mainCol.children, function (c) {
      return ['IDX-detailsSlidesActions', 'IDX-detailsShareThis'].indexOf(c.id) === -1 && c.tagName !== 'SCRIPT' && c.tagName !== 'STYLE';
    }) : [];
    var moreSection = $('.lbh-more:not(.lbh-openhouses)', body);
    leftovers.forEach(function (c) { (moreSection || body).appendChild(adopt(c)); });
    var similar = $('#IDX-detailsSimilar');
    if (similar) body.appendChild(adopt(similar));
    layout.appendChild(body);
    root.appendChild(layout);

    (topNav || header).parentNode.insertBefore(root, topNav || header);

    // IDX's AI Redesign launcher is a fixed widget; keep it if it was placed in the hidden area.
    function rescueWidgets() {
      var ai = $('#ai-redesign-widget-idx');
      if (ai && wrapper.contains(ai)) root.appendChild(ai);
    }
    rescueWidgets();
    window.addEventListener('load', rescueWidgets);

    main.classList.add('lbh-details');
  }

  /* ---------- gallery ---------- */

  function gallery(photos, total, galleryUrl, listing) {
    var alt = function (i) { return 'Photo ' + (i + 1) + ' of ' + total + ', ' + listing.full; };
    var section = h('section', { class: 'lbh-gallery', 'aria-label': 'Photos of ' + listing.full });
    var media = h('div', { class: 'lbh-media' });
    section.appendChild(media);

    // Desktop: one large photo with three smaller ones beside it.
    var grid = h('div', { class: 'lbh-grid lbh-grid--' + Math.min(photos.length, 4) });
    photos.slice(0, 4).forEach(function (src, i) {
      grid.appendChild(h('a', { class: 'lbh-tile lbh-tile--' + (i + 1), href: galleryUrl || src }, [
        h('img', { src: src, alt: alt(i), loading: i === 0 ? 'eager' : 'lazy', decoding: 'async' }),
      ]));
    });
    media.appendChild(grid);

    // Phones: swipeable strip of every photo with a visible count.
    var track = h('div', { class: 'lbh-track', tabindex: '0', 'aria-label': 'Photo gallery, swipe for more' });
    photos.forEach(function (src, i) {
      track.appendChild(h('figure', { class: 'lbh-slide' }, [
        h('img', { src: src, alt: alt(i), loading: i < 2 ? 'eager' : 'lazy', decoding: 'async' }),
      ]));
    });
    var count = h('span', { class: 'lbh-count', 'aria-live': 'polite', text: '1 / ' + total });
    track.addEventListener('scroll', function () {
      var i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      count.textContent = Math.min(i + 1, photos.length) + ' / ' + total;
    }, { passive: true });
    var prev = h('button', { type: 'button', class: 'lbh-swipe lbh-swipe--prev', 'aria-label': 'Previous photo', onclick: function () { track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }); } }, [icon('chevL')]);
    var next = h('button', { type: 'button', class: 'lbh-swipe lbh-swipe--next', 'aria-label': 'Next photo', onclick: function () { track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }); } }, [icon('chevR')]);
    media.appendChild(h('div', { class: 'lbh-swipe-wrap' }, [track, prev, next, count]));

    // Full gallery (IDX's photo gallery page) and virtual tour, when IDX offers one.
    var buttons = h('div', { class: 'lbh-gallery-actions' });
    if (galleryUrl) buttons.appendChild(h('a', { class: 'lbh-pill', href: galleryUrl }, [icon('camera'), 'View all ' + total + ' photos']));
    var vt = $('.IDX-detailsVirtualTourAction');
    if (vt) { buttons.appendChild(adopt(vt)); vt.classList.add('lbh-pill'); }
    media.appendChild(buttons);
    return section;
  }

  /* ---------- facts row ---------- */

  function facts(listing, info, field) {
    var acres = info.acres || field('lotSizeArea');
    var sqft = info.sqft || field('livingArea');
    var stats = [
      ['Beds', info.bedrooms],
      ['Baths', info['total baths'] || field('bathroomsTotalDecimal')],
      ['Sq Ft', sqft && /^\d+$/.test(sqft) ? Number(sqft).toLocaleString('en-US') : sqft],
      ['Acres', acres],
    ].filter(function (s) { return s[1]; });
    var status = (listing.status || '').toLowerCase();
    var tone = /pending|under contract|contingent/.test(status) ? 'pending' : /coming/.test(status) ? 'soon' : /active/.test(status) ? 'active' : 'other';
    return h('section', { class: 'lbh-facts', 'aria-label': 'Price and size' }, [
      h('h1', { class: 'lbh-address' }, [listing.street, h('span', { text: listing.region })]),
      h('div', { class: 'lbh-facts-row' }, [
        h('p', { class: 'lbh-price', text: listing.price }),
        h('dl', { class: 'lbh-stats' }, stats.map(function (s) {
          return h('div', null, [h('dd', { text: s[1] }), h('dt', { text: s[0] })]);
        })),
      ]),
      listing.status && h('p', { class: 'lbh-status lbh-status--' + tone }, [
        h('span', { class: 'lbh-dot', 'aria-hidden': 'true' }),
        'Status: ' + listing.status + (listing.id ? ' · MLS #' + listing.id : ''),
      ]),
    ]);
  }

  /* ---------- description + highlights ---------- */

  function overview(description, info, field, listing, creditMatch, credit) {
    var rows = [
      ['Property type', [info['property type'], info['property sub type']].filter(Boolean).join(' · ')],
      ['Lot / acreage', info.acres || field('lotSizeArea')],
      ['Year built', info['year built'] || field('yearBuilt')],
      ['County', info.county || field('countyName')],
      ['Subdivision', info.subdivision || field('subdivision')],
      ['Listing ID', listing.id],
    ].filter(function (r) { return r[1]; });

    var listedBy = h('div', { class: 'lbh-listedby' }, [
      h('p', { class: 'lbh-label', text: 'Listed by' }),
      creditMatch ? h('p', null, [creditMatch[1], h('br'), creditMatch[2]]) : h('p', { text: credit.replace(/^Listed by:\s*/, '') }),
    ]);
    var badge = adopt($('#IDX-detailsCourtesy'));

    var highlights = h('div', { class: 'lbh-col' }, [
      h('h2', { class: 'lbh-h3' }, ['Highlights']),
      credit ? listedBy : null,
      h('dl', { class: 'lbh-rows' }, rows.map(function (r) { return h('div', null, [h('dt', { text: r[0] }), h('dd', { text: r[1] })]); })),
      badge,
    ]);
    var desc = h('div', { class: 'lbh-col' }, [h('h2', { class: 'lbh-h3', text: 'House description' }), description]);
    return h('section', { class: 'lbh-section lbh-overview' }, [desc, highlights]);
  }

  /* ---------- interior / exterior features ---------- */

  function features() {
    var panels = $$('#IDX-fieldsWrapper > .IDX-panel');
    function pick(re) {
      for (var i = 0; i < panels.length; i++) {
        if (re.test(text($('.IDX-panel-title', panels[i])))) return panels[i];
      }
      return null;
    }
    var cols = [['Interior features', pick(/^interior/i)], ['Exterior features', pick(/^(exterior|external)/i)]]
      .filter(function (c) { return c[1]; })
      .map(function (c) {
        var bodyEl = adopt($('.IDX-panel-body', c[1]));
        var col = h('div', { class: 'lbh-col' }, [h('h2', { class: 'lbh-h3', text: c[0] }), bodyEl]);
        c[1].classList.add('lbh-moved');
        return col;
      });
    return cols.length ? h('section', { class: 'lbh-section lbh-features' }, cols) : h('div');
  }

  /* ---------- Request a Tour / Request Info ---------- */

  function tourPanel(form, contactBox, listing) {
    var mode = 'tour';
    var submittedMode = null;
    var message = form.querySelector('[name="message"]');
    var messageGroup = message && (message.closest('.IDX-form-group, .IDX-formGroup, [id$="message-group"]') || message.parentNode);
    var submit = form.querySelector('[type="submit"]');
    var response = form.querySelector('.IDX-formResponse');

    // Dates: today and the next 13 days.
    var dates = h('div', { class: 'lbh-dates', role: 'radiogroup', 'aria-label': 'Preferred date' });
    var today = new Date();
    for (var i = 0; i < 14; i++) {
      var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      var id = 'lbh-date-' + i;
      var input = h('input', { type: 'radio', name: 'lbh-date', id: id, value: d.toDateString(), class: 'lbh-sr' });
      input.dataset.long = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      dates.appendChild(input);
      dates.appendChild(h('label', { for: id, class: 'lbh-date' }, [
        h('span', { text: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }) }),
        h('strong', { text: String(d.getDate()) }),
        h('span', { text: d.toLocaleDateString('en-US', { month: 'short' }) }),
      ]));
    }
    var scroll = function (dir) { dates.scrollBy({ left: dir * dates.clientWidth * 0.8, behavior: 'smooth' }); };

    var time = h('select', { id: 'lbh-time', class: 'lbh-select' }, [h('option', { value: '', text: 'Choose a time' })]);
    for (var t = 9 * 60; t <= 18 * 60; t += 30) {
      var hr = Math.floor(t / 60), mn = t % 60;
      var label = ((hr + 11) % 12 + 1) + ':' + (mn ? '30' : '00') + ' ' + (hr < 12 ? 'AM' : 'PM');
      time.appendChild(h('option', { value: label, text: label }));
    }
    time.appendChild(h('option', { value: 'Any time works', text: 'Any time works' }));

    var notes = h('textarea', { id: 'lbh-notes', class: 'lbh-textarea', rows: '3', placeholder: 'Anything ' + FIRST + ' should know?' });
    var tourError = h('p', { class: 'lbh-error', role: 'alert', hidden: true });

    // Until a date is picked, the tour tab is just the date strip; time, notes, the
    // contact fields and the submit button appear after the visitor chooses a day.
    var hint = h('p', { class: 'lbh-hint', id: 'lbh-date-hint', text: 'Pick a day to request a tour. You’ll choose a time next.' });
    var announce = h('p', { class: 'lbh-sr', 'aria-live': 'polite' });
    var datePicker = h('fieldset', { class: 'lbh-fieldset', 'aria-describedby': 'lbh-date-hint' }, [
      h('legend', { class: 'lbh-label', text: 'Preferred date' }),
      h('div', { class: 'lbh-dates-wrap' }, [
        h('button', { type: 'button', class: 'lbh-scroll', 'aria-label': 'Earlier dates', onclick: function () { scroll(-1); } }, [icon('chevL')]),
        dates,
        h('button', { type: 'button', class: 'lbh-scroll', 'aria-label': 'Later dates', onclick: function () { scroll(1); } }, [icon('chevR')]),
      ]),
      hint,
    ]);
    var tourDetails = h('div', { class: 'lbh-tour-details', id: 'lbh-tour-details' }, [
      h('label', { class: 'lbh-label', for: 'lbh-time', text: 'Preferred time' }),
      time,
      h('label', { class: 'lbh-label', for: 'lbh-notes', text: 'Notes (optional)' }),
      notes,
      tourError,
    ]);
    var picker = h('div', { class: 'lbh-picker' }, [datePicker, tourDetails, announce]);
    function chosenDate() { return dates.querySelector('input:checked'); }

    // Picking (or changing) the date: clear only the time; notes and contact details stay.
    dates.addEventListener('change', function () {
      var d = chosenDate();
      time.value = '';
      tourError.hidden = true;
      announce.textContent = d ? d.dataset.long + ' selected. Choose a preferred time below.' : '';
      setMode('tour');
    });

    var tabTour = h('button', { type: 'button', role: 'tab', id: 'lbh-tab-tour', 'aria-controls': 'lbh-tourpanel', class: 'lbh-tab', text: 'Request a Tour' });
    var tabInfo = h('button', { type: 'button', role: 'tab', id: 'lbh-tab-info', 'aria-controls': 'lbh-tourpanel', class: 'lbh-tab', text: 'Request Info' });
    var submitLabel = submit ? submit.textContent.trim() : '';

    function setMode(m) {
      mode = m;
      tabTour.setAttribute('aria-selected', String(m === 'tour'));
      tabInfo.setAttribute('aria-selected', String(m === 'info'));
      tabTour.tabIndex = m === 'tour' ? 0 : -1;
      tabInfo.tabIndex = m === 'info' ? 0 : -1;
      panel.setAttribute('aria-labelledby', m === 'tour' ? 'lbh-tab-tour' : 'lbh-tab-info');
      var revealed = m === 'info' || !!chosenDate();
      picker.hidden = m !== 'tour';
      hint.hidden = !!chosenDate();
      tourDetails.hidden = m !== 'tour' || !chosenDate();
      contactBox.hidden = !revealed;
      if (messageGroup) messageGroup.hidden = m === 'tour';
      if (submit) submit.textContent = m === 'tour' ? 'Request a Tour' : (submitLabel || 'Send Message');
      if (message && m === 'info' && !message.value) message.placeholder = 'I’d like more information about ' + listing.street + '.';
      tourError.hidden = true;
    }
    [tabTour, tabInfo].forEach(function (tab) {
      tab.addEventListener('click', function () { setMode(tab === tabTour ? 'tour' : 'info'); });
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var other = tab === tabTour ? tabInfo : tabTour;
          other.focus(); other.click();
        }
      });
    });

    // Compose the tour request into IDX's own message field just before IDX submits
    // the form. Capture phase on document runs before IDX's jQuery submit handler.
    document.addEventListener('submit', function (e) {
      if (e.target !== form || !active()) return;
      submittedMode = mode;
      if (mode !== 'tour') return;
      var date = dates.querySelector('input:checked');
      if (!date || !time.value) {
        e.preventDefault();
        e.stopPropagation();
        tourError.textContent = !date ? 'Please choose a preferred date.' : 'Please choose a preferred time.';
        tourError.hidden = false;
        (!date ? dates : time).focus();
        return;
      }
      tourError.hidden = true;
      if (message) {
        message.value = [
          'Tour request',
          'Property: ' + listing.full,
          listing.id ? 'MLS #: ' + listing.id : '',
          listing.price ? 'List price: ' + listing.price : '',
          'Preferred date: ' + date.dataset.long,
          'Preferred time: ' + time.value,
          notes.value.trim() ? '\nNotes: ' + notes.value.trim() : '',
        ].filter(Boolean).join('\n');
      }
    }, true);

    // IDX writes <p class="IDX-successMessage"> into the form response on success.
    if (response && window.MutationObserver) {
      new MutationObserver(function () {
        var ok = response.querySelector('.IDX-successMessage');
        if (!ok || ok.dataset.lbh || !active()) return;
        ok.dataset.lbh = '1';
        ok.setAttribute('role', 'status');
        if (submittedMode === 'tour') {
          ok.textContent = TOUR_SENT;
          notes.value = '';
          time.value = '';
        }
      }).observe(response, { childList: true, subtree: true });
    }

    var header = $('#IDX-listingHeader', contactBox);
    if (header) header.hidden = true;
    var panel = h('div', { id: 'lbh-tourpanel', role: 'tabpanel' }, [picker, adopt(contactBox)]);
    var section = h('section', { class: 'lbh-card lbh-tour', 'aria-label': 'Request a tour or more information' }, [
      h('div', { class: 'lbh-tabs', role: 'tablist', 'aria-label': 'Request type' }, [tabTour, tabInfo]),
      panel,
    ]);
    setMode('tour');
    return section;
  }

  /* ---------- Jackie's contact card ---------- */

  function agentCard(listing) {
    var subject = listing.full + (listing.id ? ' (MLS #' + listing.id + ')' : '');
    return h('section', { class: 'lbh-card lbh-agent', 'aria-labelledby': 'lbh-agent-name' }, [
      h('p', { class: 'lbh-eyebrow', text: 'Your contact for this home' }),
      h('div', { class: 'lbh-agent-row' }, [
        h('img', { src: AGENT.headshot, alt: AGENT.name, width: '96', height: '96', loading: 'lazy', decoding: 'async' }),
        h('div', null, [
          h('h2', { id: 'lbh-agent-name', class: 'lbh-agent-name', text: AGENT.name }),
          AGENT.title ? h('p', { class: 'lbh-agent-title', text: AGENT.title }) : null,
          h('p', { class: 'lbh-agent-brokerage', text: AGENT.brokerage }),
        ]),
      ]),
      h('address', { class: 'lbh-agent-address' }, [AGENT.street, h('br'), AGENT.cityLine]),
      h('div', { class: 'lbh-agent-actions' }, [
        h('a', { class: 'lbh-btn', href: AGENT.phoneHref }, [icon('phone'), 'Call ' + AGENT.phone]),
        h('a', { class: 'lbh-btn lbh-btn--outline', href: 'mailto:' + AGENT.email + '?subject=' + encodeURIComponent(subject) }, [icon('mail'), 'Email']),
      ]),
      AGENT.license ? h('p', { class: 'lbh-agent-license', text: 'NJ License #' + AGENT.license }) : null,
    ]);
  }

  /* ---------- Share ---------- */

  function shareUrl() {
    // IDX's canonical URL for this listing on Jackie's branded IDX site.
    var canonical = $('link[rel="canonical"]');
    var href = canonical && canonical.href;
    if (href && /\/idx\/details\//.test(href)) return href;
    return location.origin + location.pathname;
  }

  function shareControl(listing) {
    var url = shareUrl();
    var status = h('span', { class: 'lbh-share-status', 'aria-live': 'polite' });
    var field = h('input', { class: 'lbh-share-url', type: 'text', readonly: true, value: url, 'aria-label': 'Link to this home' });
    var copy = h('button', { type: 'button', class: 'lbh-btn lbh-btn--small', text: 'Copy link' });
    var pop = h('div', { class: 'lbh-share-pop', role: 'dialog', 'aria-label': 'Share this home', hidden: true }, [
      h('p', { class: 'lbh-label', text: 'Link to this home' }), field, h('div', { class: 'lbh-share-row' }, [copy, status]),
    ]);
    var button = h('button', { type: 'button', class: 'lbh-share', 'aria-haspopup': 'dialog', 'aria-expanded': 'false' }, [icon('share'), 'Share']);

    function close() { pop.hidden = true; button.setAttribute('aria-expanded', 'false'); }
    function open() {
      pop.hidden = false; button.setAttribute('aria-expanded', 'true'); status.textContent = '';
      field.focus(); field.select();
    }
    button.addEventListener('click', function () {
      var data = { title: listing.full, text: listing.full + (listing.price ? ' · ' + listing.price : ''), url: url };
      if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
        navigator.share(data).catch(function (err) { if (!err || err.name !== 'AbortError') open(); });
      } else if (pop.hidden) {
        open();
      } else {
        close();
      }
    });
    copy.addEventListener('click', function () {
      function done() { status.textContent = 'Link copied'; }
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(done, function () { field.select(); document.execCommand('copy') && done(); });
      } else {
        field.select(); if (document.execCommand('copy')) done();
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) { close(); button.focus(); } });
    document.addEventListener('click', function (e) { if (!pop.hidden && !wrap.contains(e.target)) close(); });
    var wrap = h('div', { class: 'lbh-share-wrap' }, [button, pop]);
    wrap.dataset.url = url;
    return wrap;
  }
})();
