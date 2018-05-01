(function () { /* global converter HTMLSpanElement localStorage */
  function createElement (tag, options) {
    var el = document.createElement(tag)
    if (options) {
      if (typeof options === 'string') {
        el.innerHTML = options
      } else {
        if (options.inner) el.innerHTML = options.inner
        if (options.class) el.className = options.class
        if (options.on) {
          for (var key in options.on) {
            el.addEventListener(key, options.on, false)
          }
        }
      }
    }
    return el
  }

  var activeType = localStorage.getItem('active-type') || 'Length'
  var app = {
    get activeType () { return activeType },
    set activeType (type) {
      localStorage.setItem(
        'active-type',
        app.nodes.activeType.innerText = activeType = type
      )

      app.nodes.unitPickerA.list.innerText = ''
      app.nodes.unitPickerB.list.innerText = ''
      app.unitA = undefined
      app.unitB = undefined
      for (var unit in converter.conversions[type]) {
        if (!app.unitA) {
          app.unitA = unit
        } else if (!app.unitB) {
          app.unitB = unit
        }
        const selectorA = createElement('span', unit)
        const selectorB = createElement('span', unit)
        app.nodes.unitPickerA.list.appendChild(selectorA)
        app.nodes.unitPickerB.list.appendChild(selectorB)
        app.nodes.inputA.value = 1
        app.nodes.inputB.value = 0
        if (unit === app.unitA) {
          selectorA.className = 'active'
          app.nodes.unitPickerA.active = selectorA
        } else if (unit === app.unitB) {
          selectorB.className = 'active'
          app.nodes.unitPickerB.active = selectorB
        }
      }
      app.update('A')
    },
    update: function (AorB) {
      var isA = AorB === 'A'
      var val = parseFloat(app.nodes['input' + AorB].value)
      if (val === Infinity || isNaN(val)) {
        app.nodes['input' + AorB].value = val = 0
      }
      app.nodes[isA ? 'inputB' : 'inputA'].value = converter(
        app.activeType,
        app[isA ? 'unitA' : 'unitB'],
        app[isA ? 'unitB' : 'unitA'],
        val
      )
    },
    nodes: {
      typeSelector: document.querySelector('.converter .type-selector'),
      activeType: document.querySelector('.converter .active-type'),
      inputA: document.querySelector('.converter .unitA input'),
      inputB: document.querySelector('.converter .unitB input'),
      equals: document.querySelector('.converter span.equals'),
      unitPickerA: {
        list: document.querySelector('.unitA .unit-picker')
      },
      unitPickerB: {
        list: document.querySelector('.unitB .unit-picker')
      }
    }
  }

  for (var type in converter.conversions) {
    var selector = createElement('span', type)
    app.nodes.typeSelector.appendChild(selector)
    if (type === activeType) {
      (app.nodes.activeSelector = selector).className = 'active'
    }
  }
  app.activeType = activeType

  app.nodes.typeSelector.addEventListener('click', function (e) {
    if (
      e.target instanceof HTMLSpanElement &&
      app.nodes.activeSelector !== e.target
    ) {
      app.activeType = e.target.innerText
      if (app.nodes.activeSelector) {
        app.nodes.activeSelector.className = ''
      }
      (app.nodes.activeSelector = e.target).className = 'active'
      if (window.innerWidth < 561) {
        app.nodes.typeSelector.style.display = 'none'
        setTimeout(function () {
          app.nodes.typeSelector.style.display = ''
        }, 500)
      }
    }
  })

  function setUnit (AorB, val, noUpdate) {
    var picker = 'unitPicker' + AorB
    var unit = 'unit' + AorB
    app[unit] = val
    if (app.nodes[picker].active) {
      app.nodes[picker].active.className = ''
    }
    for (var i = 0; i < app.nodes[picker].list.children.length; i++) {
      var selector = app.nodes[picker].list.children[i]
      if (selector.innerText === val) {
        selector.className = 'active'
        app.nodes[picker].active = selector
        break
      }
    }
    if (!noUpdate) app.update(AorB)
  }

  app.nodes.unitPickerA.list.addEventListener('click', function (e) {
    if (
      e.target instanceof HTMLSpanElement &&
      app.nodes.unitPickerA.active !== e.target
    ) setUnit('A', e.target.innerText)
  })

  app.nodes.unitPickerB.list.addEventListener('click', function (e) {
    if (
      e.target instanceof HTMLSpanElement &&
      app.nodes.unitPickerB.active !== e.target
    ) setUnit('B', e.target.innerText)
  })

  app.nodes.inputA.addEventListener('input', function () { app.update('A') })
  app.nodes.inputB.addEventListener('input', function () { app.update('B') })

  app.nodes.equals.addEventListener('click', function (e) {
    var unitA = app.unitA
    var unitB = app.unitB
    setUnit('A', unitB)
    setUnit('B', unitA)
    app.update('A')
  })
})()
