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
      app.update(true)
    },
    update: function (updateA) {
      var val
      if (updateA) {
        val = parseFloat(app.nodes.inputA.value)
        if (val === Infinity || isNaN(val)) app.nodes.inputA.value = val = 0
        app.nodes.inputB.value = converter(
          app.activeType,
          app.unitA,
          app.unitB,
          val
        )
      } else {
        val = parseFloat(app.nodes.inputA.value)
        if (val === Infinity || isNaN(val)) app.nodes.inputA.value = val = 0
        app.nodes.inputA.value = converter(
          app.activeType,
          app.unitB,
          app.unitA,
          val
        )
      }
    },
    nodes: {
      typeSelector: document.querySelector('.converter .type-selector'),
      activeType: document.querySelector('.converter .active-type'),
      inputA: document.querySelector('.unitA input'),
      inputB: document.querySelector('.unitB input'),
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
    }
  })

  app.nodes.unitPickerA.list.addEventListener('click', function (e) {
    if (
      e.target instanceof HTMLSpanElement &&
      app.nodes.unitPickerA.active !== e.target
    ) {
      app.unitA = e.target.innerText
      if (app.nodes.unitPickerA.active) {
        app.nodes.unitPickerA.active.className = ''
      }
      app.nodes.unitPickerA.active = e.target
      app.nodes.unitPickerA.active.className = 'active'
      app.update(true)
    }
  })

  app.nodes.unitPickerB.list.addEventListener('click', function (e) {
    if (
      e.target instanceof HTMLSpanElement &&
      app.nodes.unitPickerB.active !== e.target
    ) {
      app.unitB = e.target.innerText
      if (app.nodes.unitPickerB.active) {
        app.nodes.unitPickerB.active.className = ''
      }
      app.nodes.unitPickerB.active = e.target
      app.nodes.unitPickerB.active.className = 'active'
      app.update(true)
    }
  })

  app.nodes.inputA.addEventListener('input', function () { app.update(true) })
  app.nodes.inputB.addEventListener('input', function () { app.update() })
})()
